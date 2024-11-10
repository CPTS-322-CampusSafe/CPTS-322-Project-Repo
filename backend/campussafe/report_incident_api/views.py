from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import IncidentReport
from .serializers import IncidentReportSerializer
from rest_framework import status
from django.db.models.functions import Now
from django.contrib.auth import get_user_model
from utils.utils import is_int

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

    page_size = request.query_params.get("page_size")
    page_number = request.query_params.get("page_number")

    if is_int(page_size) and is_int(page_number.isdigit()):
        page_size = int(page_size)
        page_number = int(page_number)
    else:
        page_size = 10
        page_number = 0

    start_index = page_number * page_size

    # Get only verified reports sorted in order from newest to oldest
    reports = IncidentReport.objects.filter(is_verified=True).order_by("-recieved_at")[start_index:(start_index + page_size)]

    serializer = IncidentReportSerializer(reports, many=True)
    return Response(serializer.data)