from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Payslip
from apps.employees.models import Employee
from decimal import Decimal

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Payroll app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Payroll'],
    summary='List Payroll Records',
    description='Get payroll records for the authenticated user or all users (admin)',
    responses={
        200: OpenApiResponse(
            description='List of payroll records'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_payroll(request):
    """Get payroll records"""
    try:
        if request.user.is_staff:
            # Admin can see all payroll records
            payroll_records = Payslip.objects.select_related('employee__user', 'payroll_period').all()
        else:
            # Regular users see only their own records
            try:
                employee = Employee.objects.get(user=request.user)
                payroll_records = Payslip.objects.filter(employee=employee).select_related('payroll_period')
            except Employee.DoesNotExist:
                return Response({
                    'payroll_records': [],
                    'count': 0
                }, status=status.HTTP_200_OK)
        
        payroll_data = []
        for record in payroll_records:
            payroll_data.append({
                'id': record.id,
                'employee_name': record.employee.user.get_full_name() or record.employee.user.username,
                'employee_id': record.employee.employee_id,
                'payroll_period': record.payroll_period.name,
                'pay_period_start': record.payroll_period.start_date,
                'pay_period_end': record.payroll_period.end_date,
                'gross_salary': float(record.gross_salary),
                'total_deductions': float(record.total_deductions),
                'net_salary': float(record.net_salary),
                'working_days': record.working_days,
                'present_days': record.present_days,
                'overtime_hours': float(record.overtime_hours),
                'overtime_amount': float(record.overtime_amount),
                'status': record.status,
                'payment_date': record.payment_date,
                'created_at': record.created_at
            })
        
        return Response({
            'payroll_records': payroll_data,
            'count': len(payroll_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Payroll'],
    summary='Get Payroll Summary',
    description='Get payroll summary for the authenticated user',
    responses={
        200: OpenApiResponse(
            description='Payroll summary data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payroll_summary(request):
    """Get payroll summary for user"""
    try:
        try:
            employee = Employee.objects.get(user=request.user)
        except Employee.DoesNotExist:
            return Response({
                'error': 'Employee record not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Get current month payroll
        from datetime import date
        current_month = date.today().replace(day=1)
        
        current_payroll = Payslip.objects.filter(
            employee=employee,
            payroll_period__start_date__gte=current_month,
            status='paid'
        ).first()
        
        # Get total earnings this year
        current_year = date.today().year
        yearly_payrolls = Payslip.objects.filter(
            employee=employee,
            payroll_period__start_date__year=current_year,
            status='paid'
        )
        
        total_yearly_earnings = sum(p.net_salary for p in yearly_payrolls)
        
        summary = {
            'employee_name': employee.user.get_full_name() or employee.user.username,
            'employee_id': employee.employee_id,
            'current_month_salary': float(current_payroll.net_salary) if current_payroll else 0.0,
            'total_yearly_earnings': float(total_yearly_earnings),
            'payroll_records_count': yearly_payrolls.count(),
            'last_payroll_date': current_payroll.payroll_period.end_date if current_payroll else None
        }
        
        return Response(summary, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
