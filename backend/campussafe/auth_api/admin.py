from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile, UserSettings
from nested_admin import NestedModelAdmin, NestedTabularInline, NestedStackedInline

# To display the UserSettings model inline on the User model page
class UserSettingsInline(NestedStackedInline):
    model = UserSettings
    can_delete = False

# To display the Profile model inline on the User model page
class ProfileInline(NestedTabularInline):
    model = Profile
    inlines = [UserSettingsInline]
    can_delete = False

class UserAdmin(NestedModelAdmin):
    inlines = [ProfileInline] # Adds the Profile model to the user model on admin page

# Registering custom user model to display on the admin page
admin.site.register(User, UserAdmin)