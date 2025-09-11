from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='payroll_test'),
    path('', views.list_payroll, name='list_payroll'),
    path('summary/', views.payroll_summary, name='payroll_summary'),
]
