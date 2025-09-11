from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Employee, Department

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Employees app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Employees'],
    summary='List Employees',
    description='Get a list of all employees in the system',
    responses={
        200: {
            'type': 'object',
            'properties': {
                'employees': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'id': {'type': 'integer'},
                            'employee_id': {'type': 'string'},
                            'name': {'type': 'string'},
                            'department': {'type': 'string'},
                            'position': {'type': 'string'},
                            'status': {'type': 'string'}
                        }
                    }
                }
            }
        }
    }
)
@api_view(['GET'])
def list_employees(request):
    """Get list of all employees"""
    try:
        employees = Employee.objects.select_related('user', 'department').all()
        employee_data = []
        
        for employee in employees:
            employee_data.append({
                'id': employee.id,
                'employee_id': employee.employee_id,
                'name': employee.user.get_full_name() or employee.user.username,
                'department': employee.department.name if employee.department else None,
                'position': employee.position,
                'status': employee.status,
                'employment_type': employee.employment_type,
                'hire_date': employee.hire_date
            })
        
        return Response({
            'employees': employee_data,
            'count': len(employee_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
