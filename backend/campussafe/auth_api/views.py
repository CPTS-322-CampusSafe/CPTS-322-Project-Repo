from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer

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
    Will return their username if they are logged in, and
    will return an empty string if they are not logged in.
    """

    username = request.user.username

    return Response({
        "username": username,
    })