from django.contrib import admin
from .models import Department, Employee

# Register your models here.

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at']
    search_fields = ['name']
    list_filter = ['created_at']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'get_full_name', 'department', 'position', 'employment_type', 'status', 'hire_date']
    list_filter = ['department', 'employment_type', 'status', 'hire_date']
    search_fields = ['employee_id', 'user__first_name', 'user__last_name', 'user__email', 'position']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'employee_id', 'department', 'position')
        }),
        ('Employment Details', {
            'fields': ('employment_type', 'status', 'hire_date', 'salary')
        }),
        ('Contact Information', {
            'fields': ('phone', 'address')
        }),
        ('Emergency Contact', {
            'fields': ('emergency_contact', 'emergency_phone')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

    def get_full_name(self, obj):
        return obj.user.get_full_name()
    get_full_name.short_description = 'Full Name'
