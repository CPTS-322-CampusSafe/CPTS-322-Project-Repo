from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import IncidentReport, ReportImage
from .serializers import IncidentReportSerializer
from rest_framework import status
from utils.utils import is_int
from .notifier import on_incident_report_verified

NEED_ADMIN_APPROVAL = False # This should be changed when the admin review feature is added
DEFAULT_PAGE_SIZE = 10

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

        if user:
            if not NEED_ADMIN_APPROVAL or user.profile.is_user_admin:
                is_verified = True

        serializer.save(user=user, is_verified=is_verified)

        return Response("Success!", status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def upload_report_image(request):
    """
    Uploads and image for an incident report. Multiple images can be
    uploaded for a single report (only one at a time).
    """

    try:
        image = request.data["image"]
    except KeyError:
        return Response({ "image": "Missing image." }, status=status.HTTP_400_BAD_REQUEST)

    try:
        report_id = request.data["report_id"]
    except KeyError:
        return Response({ "report_id": "Missing report_id." }, status=status.HTTP_400_BAD_REQUEST)

    if not image:
        return Response({ "image": "Image is null." }, status=status.HTTP_400_BAD_REQUEST)

    if not report_id:
        return Response({ "report_id": "Report_id is null." }, status=status.HTTP_400_BAD_REQUEST)

    try:
        incident_report = IncidentReport.objects.get(id=int(report_id))
    except IncidentReport.DoesNotExist:
        return Response({ "report_id": "Incident report does not exist." }, status=status.HTTP_404_NOT_FOUND)
    
    if not incident_report.user:
        return Response({ "report_id": "Incident report does not have an attached user." }, status=status.HTTP_403_FORBIDDEN)
    
    if incident_report.user != request.user:
        return Response({ "report_id": "User does not have access to this report." }, status=status.HTTP_403_FORBIDDEN)
    
    report_image = ReportImage()
    report_image.image = image
    report_image.incident_report = incident_report
    report_image.save()

    return Response("Success!", status=status.HTTP_201_CREATED)

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
        page_size = DEFAULT_PAGE_SIZE
        page_number = 0

    start_index = page_number * page_size

    # Get only verified reports sorted in order from newest to oldest
    reports = IncidentReport.objects.filter(is_verified=True).order_by("-recieved_at")[start_index:(start_index + page_size)]

    serializer = IncidentReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def search_reports(request):
    """
    Searches all incident reports.
    """

    page_size = request.query_params.get("page_size")
    page_number = request.query_params.get("page_number")
    search_query = request.query_params.get("search_query")

    if search_query == None:
        return Response("Must contain a search_query paramerter.", status=status.HTTP_400_BAD_REQUEST)

    if is_int(page_size) and is_int(page_number.isdigit()):
        page_size = int(page_size)
        page_number = int(page_number)
    else:
        page_size = DEFAULT_PAGE_SIZE
        page_number = 0

    start_index = page_number * page_size

    # Get only verified reports sorted in order from newest to oldest
    reports = IncidentReport.objects.filter(is_verified=True)

    if search_query != "":
        reports = reports.filter(title__icontains=search_query) or reports.filter(summary__icontains=search_query) or reports.filter(description__icontains=search_query) or reports.filter(location__icontains=search_query)

    reports = reports.order_by("-recieved_at")[start_index:(start_index + page_size)]

    serializer = IncidentReportSerializer(reports, many=True)
    return Response(serializer.data)