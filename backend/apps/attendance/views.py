from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import AttendanceRecord
from django.contrib.auth.models import User
from datetime import datetime, date

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Attendance app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Attendance'],
    summary='List Attendance Records',
    description='Get attendance records for the authenticated user or all users (admin)',
    responses={
        200: OpenApiResponse(
            description='List of attendance records'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_attendance(request):
    """Get attendance records"""
    try:
        if request.user.is_staff:
            # Admin can see all attendance records
            attendance_records = AttendanceRecord.objects.select_related('employee__user').all()
        else:
            # Regular users see only their own records
            attendance_records = AttendanceRecord.objects.filter(
                employee__user=request.user
            ).select_related('employee__user')
        
        attendance_data = []
        for record in attendance_records:
            attendance_data.append({
                'id': record.id,
                'employee_name': record.employee.user.get_full_name() or record.employee.user.username,
                'employee_id': record.employee.employee_id,
                'date': record.date,
                'check_in_time': record.check_in_time,
                'check_out_time': record.check_out_time,
                'status': record.status,
                'hours_worked': float(record.hours_worked) if record.hours_worked else None,
                'overtime_hours': float(record.overtime_hours) if record.overtime_hours else 0.0,
                'notes': record.notes
            })
        
        return Response({
            'attendance_records': attendance_data,
            'count': len(attendance_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Attendance'],
    summary='Check In',
    description='Record employee check-in with location data',
    request={
        'type': 'object',
        'properties': {
            'notes': {'type': 'string'}
        }
    },
    responses={
        201: OpenApiResponse(
            description='Check-in recorded successfully'
        ),
        400: OpenApiResponse(
            description='Invalid request data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_in(request):
    """Record employee check-in"""
    try:
        from apps.employees.models import Employee
        
        # Get or create employee record
        employee, created = Employee.objects.get_or_create(
            user=request.user,
            defaults={
                'employee_id': f'EMP{request.user.id:04d}',
                'position': 'Employee',
                'hire_date': date.today()
            }
        )
        
        # Check if already checked in today
        today = date.today()
        existing_checkin = AttendanceRecord.objects.filter(
            employee=employee,
            date=today,
            check_in_time__isnull=False
        ).first()
        
        if existing_checkin:
            return Response({
                'error': 'Already checked in today'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create attendance record
        attendance = AttendanceRecord.objects.create(
            employee=employee,
            date=today,
            check_in_time=datetime.now(),
            notes=request.data.get('notes', ''),
            status='present'
        )
        
        return Response({
            'message': 'Check-in recorded successfully',
            'attendance_id': attendance.id,
            'check_in_time': attendance.check_in_time,
            'date': attendance.date
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Attendance'],
    summary='Check Out',
    description='Record employee check-out',
    responses={
        200: OpenApiResponse(
            description='Check-out recorded successfully'
        ),
        400: OpenApiResponse(
            description='No check-in found for today'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_out(request):
    """Record employee check-out"""
    try:
        from apps.employees.models import Employee
        
        # Get employee record
        try:
            employee = Employee.objects.get(user=request.user)
        except Employee.DoesNotExist:
            return Response({
                'error': 'Employee record not found'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find today's attendance record
        today = date.today()
        attendance = AttendanceRecord.objects.filter(
            employee=employee,
            date=today,
            check_in_time__isnull=False,
            check_out_time__isnull=True
        ).first()
        
        if not attendance:
            return Response({
                'error': 'No check-in found for today'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Update check-out time
        attendance.check_out_time = datetime.now()
        attendance.save()
        
        return Response({
            'message': 'Check-out recorded successfully',
            'attendance_id': attendance.id,
            'check_out_time': attendance.check_out_time,
            'date': attendance.date,
            'hours_worked': float(attendance.hours_worked) if attendance.hours_worked else None
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
