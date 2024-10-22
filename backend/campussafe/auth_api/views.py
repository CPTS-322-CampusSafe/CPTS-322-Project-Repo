from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer

@api_view(["POST"])
def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response("Successfully logged in!")
    else:
        return Response("Failed to login", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def is_logged_in_view(request):
    username = request.user.username

    return Response({
        "username": username,
    })