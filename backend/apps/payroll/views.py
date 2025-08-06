from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Payroll app is working!',
        'status': 'success'
    })
