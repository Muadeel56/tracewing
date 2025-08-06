from django.db import models
from django.contrib.auth.models import User
from apps.employees.models import Employee
from decimal import Decimal

# Create your models here.

class PayrollPeriod(models.Model):
    PERIOD_TYPE_CHOICES = [
        ('monthly', 'Monthly'),
        ('bi_weekly', 'Bi-weekly'),
        ('weekly', 'Weekly'),
    ]

    name = models.CharField(max_length=100)
    period_type = models.CharField(max_length=20, choices=PERIOD_TYPE_CHOICES, default='monthly')
    start_date = models.DateField()
    end_date = models.DateField()
    payment_date = models.DateField()
    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.start_date} to {self.end_date})"

    class Meta:
        ordering = ['-start_date']

class SalaryComponent(models.Model):
    COMPONENT_TYPE_CHOICES = [
        ('basic', 'Basic Salary'),
        ('allowance', 'Allowance'),
        ('bonus', 'Bonus'),
        ('overtime', 'Overtime'),
        ('deduction', 'Deduction'),
        ('tax', 'Tax'),
        ('insurance', 'Insurance'),
    ]

    name = models.CharField(max_length=100)
    component_type = models.CharField(max_length=20, choices=COMPONENT_TYPE_CHOICES)
    is_taxable = models.BooleanField(default=True)
    is_mandatory = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.component_type})"

    class Meta:
        ordering = ['component_type', 'name']

class EmployeeSalaryStructure(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    salary_component = models.ForeignKey(SalaryComponent, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_percentage = models.BooleanField(default=False, help_text="If true, amount is a percentage of basic salary")
    effective_from = models.DateField()
    effective_to = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_calculated_amount(self, basic_salary=None):
        """Calculate the actual amount based on percentage or fixed amount"""
        if self.is_percentage and basic_salary:
            return (self.amount / 100) * basic_salary
        return self.amount

    def __str__(self):
        return f"{self.employee.user.get_full_name()} - {self.salary_component.name}"

    class Meta:
        ordering = ['employee', 'salary_component']

class Payslip(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('processed', 'Processed'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    payroll_period = models.ForeignKey(PayrollPeriod, on_delete=models.CASCADE)
    gross_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    working_days = models.IntegerField(default=0)
    present_days = models.IntegerField(default=0)
    overtime_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    overtime_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    payment_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_salary(self):
        """Calculate gross, deductions, and net salary"""
        basic_salary = Decimal('0')
        gross_salary = Decimal('0')
        total_deductions = Decimal('0')

        # Get active salary structure for this employee
        salary_structure = EmployeeSalaryStructure.objects.filter(
            employee=self.employee,
            is_active=True,
            effective_from__lte=self.payroll_period.end_date
        ).filter(
            models.Q(effective_to__isnull=True) | 
            models.Q(effective_to__gte=self.payroll_period.start_date)
        )

        # First pass: calculate basic salary
        for structure in salary_structure:
            if structure.salary_component.component_type == 'basic':
                basic_salary = structure.get_calculated_amount()
                break

        # Second pass: calculate all components
        for structure in salary_structure:
            amount = structure.get_calculated_amount(basic_salary)
            
            if structure.salary_component.component_type in ['basic', 'allowance', 'bonus']:
                gross_salary += amount
            elif structure.salary_component.component_type in ['deduction', 'tax', 'insurance']:
                total_deductions += amount

        # Add overtime
        gross_salary += self.overtime_amount

        self.gross_salary = gross_salary
        self.total_deductions = total_deductions
        self.net_salary = gross_salary - total_deductions

    def save(self, *args, **kwargs):
        self.calculate_salary()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.user.get_full_name()} - {self.payroll_period.name}"

    class Meta:
        ordering = ['-payroll_period__start_date', 'employee']
        unique_together = ['employee', 'payroll_period']

class PayslipComponent(models.Model):
    payslip = models.ForeignKey(Payslip, on_delete=models.CASCADE, related_name='components')
    salary_component = models.ForeignKey(SalaryComponent, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_taxable = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.payslip} - {self.salary_component.name}: {self.amount}"

    class Meta:
        unique_together = ['payslip', 'salary_component']
