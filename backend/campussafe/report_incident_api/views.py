from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import IncidentReport
from .serializers import IncidentReportSerializer
from rest_framework import status
from django.db.models.functions import Now
from django.contrib.auth import get_user_model

NEED_ADMIN_APPROVAL = False # This should be changed when the admin review feature is added

@api_view(["POST"])
def report_incident(request):
    """
    Creates a new incident report.
    """

    user = None
    if request.user.is_authenticated:
        user = request.user

    serializer = IncidentReportSerializer(data=request.data)
    if serializer.is_valid():
        is_verified = False
        verified_at = None

        if user:
            if not NEED_ADMIN_APPROVAL or user.profile.is_user_admin:
                is_verified = True
                verified_at = Now()

        serializer.save(user=user, is_verified=is_verified, verified_at=verified_at)
        return Response("Success!", status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_reports(request):
    """
    Gets the most recient incident reports.
    """

    reports = {}

    # Get only verified reports sorted in order from newest to oldest
    reports = IncidentReport.objects.filter(is_verified=True).order_by("-recieved_at")[:10]

    serializer = IncidentReportSerializer(reports, many=True)
    return Response(serializer.data)