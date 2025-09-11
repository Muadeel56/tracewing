from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='attendance_test'),
    path('', views.list_attendance, name='list_attendance'),
    path('check-in/', views.check_in, name='check_in'),
    path('check-out/', views.check_out, name='check_out'),
]
