from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Notification
from django.contrib.auth.models import User

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Notifications app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Notifications'],
    summary='List Notifications',
    description='Get notifications for the authenticated user',
    responses={
        200: OpenApiResponse(
            description='List of user notifications'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_notifications(request):
    """Get user notifications"""
    try:
        notifications = Notification.objects.filter(
            user=request.user
        ).order_by('-created_at')
        
        notification_data = []
        for notification in notifications:
            notification_data.append({
                'id': notification.id,
                'title': notification.title,
                'message': notification.message,
                'type': notification.type,
                'is_read': notification.is_read,
                'created_at': notification.created_at,
                'read_at': notification.read_at
            })
        
        return Response({
            'notifications': notification_data,
            'count': len(notification_data),
            'unread_count': notifications.filter(is_read=False).count()
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Notifications'],
    summary='Mark Notification as Read',
    description='Mark a specific notification as read',
    responses={
        200: OpenApiResponse(
            description='Notification marked as read'
        ),
        404: OpenApiResponse(
            description='Notification not found'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_as_read(request, notification_id):
    """Mark notification as read"""
    try:
        notification = Notification.objects.get(
            id=notification_id,
            user=request.user
        )
        
        if not notification.is_read:
            notification.is_read = True
            from django.utils import timezone
            notification.read_at = timezone.now()
            notification.save()
        
        return Response({
            'message': 'Notification marked as read',
            'notification_id': notification.id
        }, status=status.HTTP_200_OK)
        
    except Notification.DoesNotExist:
        return Response({
            'error': 'Notification not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Notifications'],
    summary='Mark All Notifications as Read',
    description='Mark all notifications for the user as read',
    responses={
        200: OpenApiResponse(
            description='All notifications marked as read'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_all_as_read(request):
    """Mark all notifications as read"""
    try:
        from django.utils import timezone
        
        updated_count = Notification.objects.filter(
            user=request.user,
            is_read=False
        ).update(
            is_read=True,
            read_at=timezone.now()
        )
        
        return Response({
            'message': f'{updated_count} notifications marked as read'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Notifications'],
    summary='Create Notification',
    description='Create a new notification (admin only)',
    request={
        'type': 'object',
        'properties': {
            'user_id': {'type': 'integer'},
            'title': {'type': 'string'},
            'message': {'type': 'string'},
            'type': {'type': 'string', 'enum': ['info', 'warning', 'error', 'success']}
        },
        'required': ['user_id', 'title', 'message', 'type']
    },
    responses={
        201: OpenApiResponse(
            description='Notification created successfully'
        ),
        400: OpenApiResponse(
            description='Invalid request data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        ),
        403: OpenApiResponse(
            description='Admin access required'
        )
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_notification(request):
    """Create a new notification (admin only)"""
    try:
        if not request.user.is_staff:
            return Response({
                'error': 'Only administrators can create notifications'
            }, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data
        user_id = data.get('user_id')
        title = data.get('title')
        message = data.get('message')
        notification_type = data.get('type')
        
        # Validate required fields
        if not all([user_id, title, message, notification_type]):
            return Response({
                'error': 'user_id, title, message, and type are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get user
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create notification
        notification = Notification.objects.create(
            user=user,
            title=title,
            message=message,
            type=notification_type
        )
        
        return Response({
            'message': 'Notification created successfully',
            'notification': {
                'id': notification.id,
                'title': notification.title,
                'message': notification.message,
                'type': notification.type,
                'user': user.username
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
