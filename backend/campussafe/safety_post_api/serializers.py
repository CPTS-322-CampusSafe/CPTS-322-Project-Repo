from .models import SafetyPost
from rest_framework import serializers

class SafetyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SafetyPost
        fields = "__all__"
        extra_kwargs = {
            "id": {"read_only": True},
            "date_posted": {"read_only": True},
            "user": {"read_only": True},
        }