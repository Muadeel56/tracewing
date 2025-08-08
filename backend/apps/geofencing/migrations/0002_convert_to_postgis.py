from django.db import migrations
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


def convert_coordinates_to_points(apps, schema_editor):
    """Convert existing latitude/longitude coordinates to PostGIS Points"""
    GeofenceLocation = apps.get_model('geofencing', 'GeofenceLocation')
    EmployeeLocationLog = apps.get_model('geofencing', 'EmployeeLocationLog')
    
    # Convert GeofenceLocation coordinates
    for location in GeofenceLocation.objects.all():
        if hasattr(location, 'latitude') and hasattr(location, 'longitude'):
            if location.latitude is not None and location.longitude is not None:
                location.location = Point(float(location.longitude), float(location.latitude))
                location.save()
    
    # Convert EmployeeLocationLog coordinates
    for log in EmployeeLocationLog.objects.all():
        if hasattr(log, 'latitude') and hasattr(log, 'longitude'):
            if log.latitude is not None and log.longitude is not None:
                log.location = Point(float(log.longitude), float(log.latitude))
                log.save()


def reverse_points_to_coordinates(apps, schema_editor):
    """Reverse migration: convert PostGIS Points back to latitude/longitude"""
    GeofenceLocation = apps.get_model('geofencing', 'GeofenceLocation')
    EmployeeLocationLog = apps.get_model('geofencing', 'EmployeeLocationLog')
    
    # Convert GeofenceLocation points back
    for location in GeofenceLocation.objects.all():
        if location.location:
            location.latitude = location.location.y
            location.longitude = location.location.x
            location.save()
    
    # Convert EmployeeLocationLog points back
    for log in EmployeeLocationLog.objects.all():
        if log.location:
            log.latitude = log.location.y
            log.longitude = log.location.x
            log.save()


class Migration(migrations.Migration):
    dependencies = [
        ('geofencing', '0001_initial'),
    ]

    operations = [
        # Step 1: Add new PostGIS PointField columns (nullable initially)
        migrations.AddField(
            model_name='geofencelocation',
            name='location',
            field=models.PointField(help_text="Geographic location (longitude, latitude)", null=True, blank=True),
        ),
        migrations.AddField(
            model_name='employeelocationlog',
            name='location',
            field=models.PointField(help_text="Employee's geographic location (longitude, latitude)", null=True, blank=True),
        ),
        
        # Step 2: Convert existing coordinate data to PostGIS Points
        migrations.RunPython(
            convert_coordinates_to_points,
            reverse_points_to_coordinates,
        ),
        
        # Step 3: Make PostGIS fields non-nullable
        migrations.AlterField(
            model_name='geofencelocation',
            name='location',
            field=models.PointField(help_text="Geographic location (longitude, latitude)"),
        ),
        migrations.AlterField(
            model_name='employeelocationlog',
            name='location',
            field=models.PointField(help_text="Employee's geographic location (longitude, latitude)"),
        ),
        
        # Step 4: Remove old decimal coordinate fields
        migrations.RemoveField(
            model_name='geofencelocation',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='geofencelocation',
            name='longitude',
        ),
        migrations.RemoveField(
            model_name='employeelocationlog',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='employeelocationlog',
            name='longitude',
        ),
    ] 