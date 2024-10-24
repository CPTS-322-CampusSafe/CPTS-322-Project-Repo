from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class User(AbstractUser):
    pass

# Adds additional information to user model, including phone number
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # the profile is associated with one user
    phone_number = PhoneNumberField(null=True, blank=False)
    is_user_admin = models.BooleanField(default=False)

# User settings/pereferences
class UserSettings(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    recieve_email_notifications = models.BooleanField(null=False, blank=False, default=True)
    recieve_SMS_notifications = models.BooleanField(null=False, blank=False, default=True)
    recieve_in_app_notifications = models.BooleanField(null=False, blank=False, default=True)

