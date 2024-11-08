from django.db import models
import auth_api.models

class IncidentReport(models.Model):
    title = models.CharField(max_length=150)
    summary = models.CharField(max_length=300)
    description = models.TextField()
    isVerified = models.BooleanField(default=False)
    isResolved = models.BooleanField(default=False)

    recieved_at = models.DateTimeField(auto_now_add=True) # The time this report was recieved by the server
    updated_at = models.DateTimeField(auto_now=True) # The time this report was updated by the server
    happened_at = models.DateTimeField(null=True) # The time that this incident actually happened

    location = models.CharField(max_length=100, default="")

    # 0-5: non emergencies
    # 5-10: emergencies (should send notification)
    emergency_level = models.IntegerField(null=True)

    user = models.ForeignKey(auth_api.models.User, on_delete=models.SET_NULL, null=True)

class ReportImage(models.Model):
    image = models.ImageField(upload_to="images/")
    incident_report = models.ForeignKey(IncidentReport, on_delete=models.CASCADE)