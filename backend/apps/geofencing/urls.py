from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_view, name='geofencing_test'),
    path('', views.list_geofences, name='list_geofences'),
    path('create/', views.create_geofence, name='create_geofence'),
    path('check-location/', views.check_location, name='check_location'),
]
