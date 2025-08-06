from django.db import models
from django.contrib.auth.models import User
from apps.employees.models import Employee
import math

# Create your models here.

class GeofenceLocation(models.Model):
    LOCATION_TYPE_CHOICES = [
        ('office', 'Office'),
        ('branch', 'Branch'),
        ('site', 'Site'),
        ('client', 'Client Location'),
    ]

    name = models.CharField(max_length=100)
    location_type = models.CharField(max_length=20, choices=LOCATION_TYPE_CHOICES, default='office')
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)
    radius = models.IntegerField(default=100, help_text="Radius in meters")
    address = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.location_type})"

    def is_within_geofence(self, latitude, longitude):
        """
        Check if given coordinates are within the geofence radius
        Using Haversine formula for distance calculation
        """
        R = 6371000  # Earth's radius in meters
        
        lat1_rad = math.radians(float(self.latitude))
        lat2_rad = math.radians(float(latitude))
        delta_lat = math.radians(float(latitude) - float(self.latitude))
        delta_lon = math.radians(float(longitude) - float(self.longitude))
        
        a = (math.sin(delta_lat/2) * math.sin(delta_lat/2) + 
             math.cos(lat1_rad) * math.cos(lat2_rad) * 
             math.sin(delta_lon/2) * math.sin(delta_lon/2))
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        distance = R * c
        
        return distance <= self.radius

    class Meta:
        ordering = ['name']

class EmployeeLocationLog(models.Model):
    ACTION_CHOICES = [
        ('check_in', 'Check In'),
        ('check_out', 'Check Out'),
        ('location_update', 'Location Update'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    geofence_location = models.ForeignKey(GeofenceLocation, on_delete=models.CASCADE, null=True, blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    is_within_geofence = models.BooleanField(default=False)
    distance_from_geofence = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Check if location is within any active geofence
        if not self.geofence_location:
            # Find the closest geofence location
            closest_location = None
            min_distance = float('inf')
            
            for location in GeofenceLocation.objects.filter(is_active=True):
                if location.is_within_geofence(self.latitude, self.longitude):
                    self.geofence_location = location
                    self.is_within_geofence = True
                    self.distance_from_geofence = 0
                    break
                else:
                    # Calculate distance for the closest location
                    # (simplified distance calculation for finding closest)
                    distance = abs(float(location.latitude) - float(self.latitude)) + abs(float(location.longitude) - float(self.longitude))
                    if distance < min_distance:
                        min_distance = distance
                        closest_location = location
            
            if not self.is_within_geofence and closest_location:
                self.geofence_location = closest_location
                # Calculate actual distance (this is a simplified version)
                self.distance_from_geofence = min_distance * 111000  # Rough conversion to meters
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.user.get_full_name()} - {self.action} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
