from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import GeofenceLocation
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Geofencing app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Geofencing'],
    summary='List Geofences',
    description='Get all geofence areas for attendance tracking',
    responses={
        200: OpenApiResponse(
            description='List of geofence areas'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_geofences(request):
    """Get all geofence areas"""
    try:
        geofences = GeofenceLocation.objects.all()
        geofence_data = []
        
        for geofence in geofences:
            geofence_data.append({
                'id': geofence.id,
                'name': geofence.name,
                'location_type': geofence.location_type,
                'radius': geofence.radius,
                'center': {
                    'latitude': geofence.latitude,
                    'longitude': geofence.longitude
                },
                'address': geofence.address,
                'is_active': geofence.is_active,
                'created_at': geofence.created_at
            })
        
        return Response({
            'geofences': geofence_data,
            'count': len(geofence_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Geofencing'],
    summary='Create Geofence',
    description='Create a new geofence area for attendance tracking',
    request={
        'type': 'object',
        'properties': {
            'name': {'type': 'string'},
            'location_type': {'type': 'string', 'enum': ['office', 'branch', 'site', 'client']},
            'latitude': {'type': 'number', 'format': 'float'},
            'longitude': {'type': 'number', 'format': 'float'},
            'radius': {'type': 'integer', 'description': 'Radius in meters'},
            'address': {'type': 'string'}
        },
        'required': ['name', 'latitude', 'longitude', 'radius']
    },
    responses={
        201: OpenApiResponse(
            description='Geofence created successfully'
        ),
        400: OpenApiResponse(
            description='Invalid request data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_geofence(request):
    """Create a new geofence area"""
    try:
        if not request.user.is_staff:
            return Response({
                'error': 'Only administrators can create geofences'
            }, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data
        name = data.get('name')
        location_type = data.get('location_type', 'office')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        radius = data.get('radius', 100)
        address = data.get('address', '')
        
        # Validate required fields
        if not all([name, latitude, longitude]):
            return Response({
                'error': 'Name, latitude, and longitude are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create geofence
        geofence = GeofenceLocation.objects.create(
            name=name,
            location_type=location_type,
            location=Point(longitude, latitude),
            radius=radius,
            address=address,
            is_active=True
        )
        
        return Response({
            'message': 'Geofence created successfully',
            'geofence': {
                'id': geofence.id,
                'name': geofence.name,
                'location_type': geofence.location_type,
                'radius': geofence.radius,
                'center': {
                    'latitude': geofence.latitude,
                    'longitude': geofence.longitude
                },
                'address': geofence.address,
                'is_active': geofence.is_active
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Geofencing'],
    summary='Check Location',
    description='Check if a location is within any active geofence',
    request={
        'type': 'object',
        'properties': {
            'latitude': {'type': 'number', 'format': 'float'},
            'longitude': {'type': 'number', 'format': 'float'}
        },
        'required': ['latitude', 'longitude']
    },
    responses={
        200: OpenApiResponse(
            description='Location check result'
        ),
        400: OpenApiResponse(
            description='Invalid request data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_location(request):
    """Check if location is within any geofence"""
    try:
        data = request.data
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        if not latitude or not longitude:
            return Response({
                'error': 'Latitude and longitude are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if point is within any active geofence
        geofences = GeofenceLocation.objects.filter(is_active=True)
        within_geofences = []
        
        for geofence in geofences:
            if geofence.is_within_geofence(latitude, longitude):
                within_geofences.append({
                    'id': geofence.id,
                    'name': geofence.name,
                    'location_type': geofence.location_type,
                    'distance': 0  # Within geofence
                })
        
        return Response({
            'location': {
                'latitude': latitude,
                'longitude': longitude
            },
            'within_geofences': within_geofences,
            'is_within_geofence': len(within_geofences) > 0
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
