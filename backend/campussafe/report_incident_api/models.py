from django.db import models
import auth_api.models
from .notifier import on_incident_report_verified
from django.db.models.functions import Now
from django.db.models.signals import post_save, post_init

class IncidentReport(models.Model):
    """
    An incident report with info such as title, description, and location.
    """

    title = models.CharField(max_length=150)
    summary = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)
    is_resolved = models.BooleanField(default=False)

    recieved_at = models.DateTimeField(auto_now_add=True) # The time this report was recieved by the server
    updated_at = models.DateTimeField(auto_now=True) # The time this report was updated by the server
    verified_at = models.DateTimeField(blank=True, null=True) # The time this report was verified by an admin
    happened_at = models.DateTimeField(blank=True, null=True) # The time that this incident actually happened
    resolved_at = models.DateTimeField(blank=True, null=True) # The time this report was marked as resolved

    location = models.CharField(max_length=100, blank=True, default="")

    # 0-5: non emergencies
    # 5-10: emergencies (should send notification)
    emergency_level = models.IntegerField(null=True)

    user = models.ForeignKey(auth_api.models.User, on_delete=models.SET_NULL, null=True)

    previous_is_verified = None

    # help from this awnser: https://stackoverflow.com/a/25503326
    @staticmethod
    def post_save(sender, instance, created, **kwargs):
        if instance.previous_is_verified != instance.is_verified or created:
            if instance.is_verified:
                instance.verified_at = Now()
                on_incident_report_verified(instance)

    @staticmethod
    def remember_state(sender, instance, **kwargs):
        instance.previous_is_verified = instance.is_verified

post_save.connect(IncidentReport.post_save, sender=IncidentReport)
post_init.connect(IncidentReport.remember_state, sender=IncidentReport)

class ReportImage(models.Model):
    """
    An image contained within an incident report.
    """

    image = models.ImageField(upload_to="images/")
    incident_report = models.ForeignKey(IncidentReport, on_delete=models.CASCADE)