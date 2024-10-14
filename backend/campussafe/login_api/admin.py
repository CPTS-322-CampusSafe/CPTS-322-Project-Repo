from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile

# To display the profile on the admin page
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline] # Adds the profile to the user model on admin page

# Registering custom user model to display on the admin page
admin.site.register(User, UserAdmin)