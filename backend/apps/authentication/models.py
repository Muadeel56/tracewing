from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class UserProfile(models.Model):
    THEME_CHOICES = [
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('auto', 'Auto'),
    ]

    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ur', 'Urdu'),
        ('es', 'Spanish'),
        ('fr', 'French'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True, null=True)
    theme_preference = models.CharField(max_length=10, choices=THEME_CHOICES, default='light')
    language_preference = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, default='en')
    timezone = models.CharField(max_length=50, default='UTC')
    is_profile_complete = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)
    last_password_change = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Check if profile is complete
        required_fields = [self.user.first_name, self.user.last_name, self.user.email, self.phone]
        self.is_profile_complete = all(field for field in required_fields)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - Profile"

    class Meta:
        ordering = ['user__username']

class UserSession(models.Model):
    DEVICE_TYPE_CHOICES = [
        ('web', 'Web Browser'),
        ('mobile', 'Mobile App'),
        ('tablet', 'Tablet'),
        ('desktop', 'Desktop App'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_key = models.CharField(max_length=40, unique=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_TYPE_CHOICES, default='web')
    device_info = models.TextField(blank=True, null=True)
    ip_address = models.GenericIPAddressField()
    location = models.CharField(max_length=200, blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    last_activity = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.device_type} ({self.ip_address})"

    class Meta:
        ordering = ['-last_activity']

class LoginAttempt(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('blocked', 'Blocked'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    username_attempted = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    failure_reason = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username_attempted} - {self.status} ({self.ip_address})"

    class Meta:
        ordering = ['-timestamp']

class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    is_used = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"Password Reset - {self.user.username}"

    class Meta:
        ordering = ['-created_at']

class EmailVerificationToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    token = models.CharField(max_length=100, unique=True)
    is_used = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"Email Verification - {self.user.username} ({self.email})"

    class Meta:
        ordering = ['-created_at']
