from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='employees_test'),
    path('', views.list_employees, name='list_employees'),
]
