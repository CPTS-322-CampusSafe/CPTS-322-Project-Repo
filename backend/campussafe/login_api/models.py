from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class User(AbstractUser):
    pass

# Adds additional information to user model, including phone number
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # the profile is associated with one user
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)