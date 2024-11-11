from django.db import models
import auth_api.models

class IncidentReport(models.Model):
    """
    An incident report with info such as title, description, and location.
    """

    title = models.CharField(max_length=150)
    summary = models.CharField(max_length=300)
    description = models.TextField()
    is_verified = models.BooleanField(default=False)
    is_resolved = models.BooleanField(default=False)

    recieved_at = models.DateTimeField(auto_now_add=True) # The time this report was recieved by the server
    updated_at = models.DateTimeField(auto_now=True) # The time this report was updated by the server
    verified_at = models.DateTimeField(null=True) # The time this report was verified by an admin
    happened_at = models.DateTimeField(null=True) # The time that this incident actually happened
    resolved_at = models.DateTimeField(null=True) # The time this report was marked as resolved

    location = models.CharField(max_length=100, default="")

    # 0-5: non emergencies
    # 5-10: emergencies (should send notification)
    emergency_level = models.IntegerField(null=True)

    user = models.ForeignKey(auth_api.models.User, on_delete=models.SET_NULL, null=True)

class ReportImage(models.Model):
    """
    An image contained within an incident report.
    """

    image = models.ImageField(upload_to="images/")
    incident_report = models.ForeignKey(IncidentReport, on_delete=models.CASCADE)