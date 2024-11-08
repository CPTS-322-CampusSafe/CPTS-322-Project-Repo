from .models import IncidentReport
from rest_framework import serializers

class IncidentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentReport
        fields = ["title", "summary", "description", "happened_at", "location", "user"]