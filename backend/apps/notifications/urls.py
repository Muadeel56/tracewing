from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='notifications_test'),
    path('', views.list_notifications, name='list_notifications'),
    path('mark-read/<int:notification_id>/', views.mark_as_read, name='mark_as_read'),
    path('mark-all-read/', views.mark_all_as_read, name='mark_all_as_read'),
    path('create/', views.create_notification, name='create_notification'),
]
