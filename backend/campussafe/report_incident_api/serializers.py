from .models import IncidentReport
from rest_framework import serializers

class IncidentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentReport
        fields = "__all__"
        extra_kwargs = {
            "id": {"read_only": True},
            "is_verified": {"read_only": True},
            "is_resolved": {"read_only": True},
            "recieved_at": {"read_only": True},
            "updated_at": {"read_only": True},
            "verified_at": {"read_only": True},
            "resolved_at": {"read_only": True},
            "user": {"read_only": True},
        }