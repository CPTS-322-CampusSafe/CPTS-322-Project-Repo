from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# registering custom user model to display on the admin page
admin.site.register(User, UserAdmin)