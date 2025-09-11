from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
import json

# Create your views here.

def test_view(request):
    """Simple test view to verify URL configuration is working"""
    return JsonResponse({
        'message': 'Authentication app is working!',
        'status': 'success'
    })

@extend_schema(
    tags=['Authentication'],
    summary='User Registration',
    description='Register a new user account with username, email, and password',
    request=UserRegistrationSerializer,
    responses={
        201: OpenApiResponse(
            response=UserSerializer,
            description='User successfully created'
        ),
        400: OpenApiResponse(
            description='Bad request - validation errors'
        )
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """User registration endpoint"""
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        
        # Validate required fields
        if not username or not email or not password:
            return Response({
                'error': 'Username, email, and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({
                'error': 'Username already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'Email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create token for the user
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'message': 'User created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'token': token.key
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Authentication'],
    summary='User Login',
    description='Authenticate user and return access token',
    request=UserLoginSerializer,
    responses={
        200: OpenApiResponse(
            description='Login successful'
        ),
        401: OpenApiResponse(
            description='Invalid credentials or account disabled'
        )
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """User login endpoint"""
    try:
        data = request.data
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return Response({
                'error': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            if user.is_active:
                # Get or create token
                token, created = Token.objects.get_or_create(user=user)
                
                return Response({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    },
                    'token': token.key
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Account is disabled'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Authentication'],
    summary='User Logout',
    description='Logout user and invalidate access token',
    request=None,
    responses={
        200: OpenApiResponse(
            description='Logout successful'
        )
    }
)
@api_view(['POST'])
def logout_view(request):
    """User logout endpoint"""
    try:
        # Delete the user's token
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        
        return Response({
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@extend_schema(
    tags=['Authentication'],
    summary='User Profile',
    description='Get current user profile information',
    responses={
        200: OpenApiResponse(
            response=UserSerializer,
            description='User profile data'
        ),
        401: OpenApiResponse(
            description='Authentication required'
        )
    }
)
@api_view(['GET'])
def profile_view(request):
    """Get user profile information"""
    try:
        user = request.user
        
        if not user.is_authenticated:
            return Response({
                'error': 'Authentication required'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'date_joined': user.date_joined,
                'last_login': user.last_login,
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
