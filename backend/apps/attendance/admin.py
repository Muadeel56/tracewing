from django.contrib import admin
from .models import AttendanceRecord, LeaveType, LeaveRequest

# Register your models here.

@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ['employee', 'date', 'check_in_time', 'check_out_time', 'hours_worked', 'status']
    list_filter = ['status', 'date', 'employee__department']
    search_fields = ['employee__user__first_name', 'employee__user__last_name', 'employee__employee_id']
    date_hierarchy = 'date'
    readonly_fields = ['hours_worked', 'overtime_hours', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('employee', 'date', 'status')
        }),
        ('Time Tracking', {
            'fields': ('check_in_time', 'check_out_time', 'hours_worked', 'overtime_hours')
        }),
        ('Additional Information', {
            'fields': ('notes',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(LeaveType)
class LeaveTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'days_allowed', 'is_paid', 'created_at']
    list_filter = ['is_paid']
    search_fields = ['name']

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ['employee', 'leave_type', 'start_date', 'end_date', 'days_requested', 'status']
    list_filter = ['status', 'leave_type', 'start_date']
    search_fields = ['employee__user__first_name', 'employee__user__last_name', 'reason']
    readonly_fields = ['days_requested', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Leave Information', {
            'fields': ('employee', 'leave_type', 'start_date', 'end_date', 'days_requested', 'reason')
        }),
        ('Approval', {
            'fields': ('status', 'approved_by', 'approved_at', 'rejection_reason')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
