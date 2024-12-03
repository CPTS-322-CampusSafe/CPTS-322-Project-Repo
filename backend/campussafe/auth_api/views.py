from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer
from .models import Profile, UserSettings
from django.middleware.csrf import get_token
from .validators import validate_register_data

@api_view(["POST"])
def register_view(request):
    """
    Creates a new account for a user.
    """

    errors = validate_register_data(request.data)

    if errors != None:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    phone_number = request.data["phone_number"]
    user_data = request.data["user_data"]

    # Serialize the user_data and other information
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save() # Create user
        profile = Profile.objects.create(user=user,phone_number=phone_number) # Create user profile
        user_settings = UserSettings.objects.create(profile=profile) # Create user settings
        return Response("Successfully registered")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login_view(request):
    """
    Logs in the user.
    """

    username = request.data["username"]
    password = request.data["password"]

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response("Successfully logged in!")
    else:
        return Response("Failed to login", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def is_logged_in_view(request):
    """
    Checks whether the requester is logged in.
    """

    if request.user.is_authenticated:
        username = request.user.username

        return Response()
    else:
        return Response("Not logged in", status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
def get_profile_view(request):
    """
    Gets the user's information including profile.
    """

    if request.user.is_authenticated:
        profile = {
            "username": request.user.username,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "date_registered": request.user.date_joined,
            "phone_number": request.user.profile.phone_number.as_e164,
            "is_user_admin": request.user.profile.is_user_admin,
            "settings": {
                "recieve_email_notifications": request.user.profile.usersettings.recieve_email_notifications,
                "recieve_SMS_notifications": request.user.profile.usersettings.recieve_SMS_notifications,
                "recieve_in_app_notifications": request.user.profile.usersettings.recieve_in_app_notifications,
            }
        }

        return Response(profile)
    else:
        return Response("Not logged in", status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
def logout_view(request):
    """
    Logs out the user.
    """

    logout(request)
    return Response()

@api_view(["GET"])
def get_csrf_token(request):
    """
    Gets the CSRF token (only used for mobile).
    """

    csrf_token = get_token(request)
    return Response({ 'csrfToken': csrf_token })