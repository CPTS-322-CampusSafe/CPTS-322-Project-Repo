from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import IncidentReport
from .serializers import IncidentReportSerializer

@api_view(["GET"])
def report_incident(request):
    return Response("Report incident")

@api_view(["GET"])
def get_reports(request):
    reports = {}

    reports = IncidentReport.objects.all()
    serializer = IncidentReportSerializer(reports, many=True)
    return Response(serializer.data)