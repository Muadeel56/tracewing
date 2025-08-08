from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance
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
    location = models.PointField(help_text="Geographic location (longitude, latitude)")
    radius = models.IntegerField(default=100, help_text="Radius in meters")
    address = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Backward compatibility properties
    @property
    def latitude(self):
        return self.location.y if self.location else None
    
    @property
    def longitude(self):
        return self.location.x if self.location else None

    def __str__(self):
        return f"{self.name} ({self.location_type})"

    def is_within_geofence(self, latitude, longitude):
        """
        Check if given coordinates are within the geofence radius
        Using PostGIS spatial functions for accurate calculation
        """
        if not self.location:
            return False
            
        point = Point(float(longitude), float(latitude))
        distance = self.location.distance(point) * 111000  # Convert degrees to meters (approximate)
        return distance <= self.radius
    
    def is_point_within_geofence(self, point):
        """
        Check if a PostGIS Point is within the geofence radius
        """
        if not self.location or not point:
            return False
            
        distance = self.location.distance(point) * 111000  # Convert degrees to meters (approximate)
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
    location = models.PointField(help_text="Employee's geographic location (longitude, latitude)")
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    is_within_geofence = models.BooleanField(default=False)
    distance_from_geofence = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)
    
    # Backward compatibility properties
    @property
    def latitude(self):
        return self.location.y if self.location else None
    
    @property
    def longitude(self):
        return self.location.x if self.location else None

    def save(self, *args, **kwargs):
        # Check if location is within any active geofence
        if not self.geofence_location and self.location:
            # Find the closest geofence location using PostGIS
            closest_location = None
            min_distance = float('inf')
            
            for geofence in GeofenceLocation.objects.filter(is_active=True):
                if geofence.is_point_within_geofence(self.location):
                    self.geofence_location = geofence
                    self.is_within_geofence = True
                    self.distance_from_geofence = 0
                    break
                elif geofence.location:
                    # Calculate distance using PostGIS
                    distance = geofence.location.distance(self.location) * 111000  # Convert to meters
                    if distance < min_distance:
                        min_distance = distance
                        closest_location = geofence
            
            if not self.is_within_geofence and closest_location:
                self.geofence_location = closest_location
                self.distance_from_geofence = min_distance
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.user.get_full_name()} - {self.action} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
