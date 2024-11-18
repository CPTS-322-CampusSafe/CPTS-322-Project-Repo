from sms import send_sms
from auth_api.models import User, UserSettings
from django.core.mail import send_mail
from django.conf import settings as django_settings

def send_sms_notification(message):
    """
    Sends a message via SMS to users who have opted in for SMS notifications.
    """

    user_settings = UserSettings.objects.filter(recieve_SMS_notifications=True)

    phone_numbers = []
    for settings in user_settings:
        phone_numbers.append(settings.profile.phone_number)

    if len(phone_numbers) != 0:
        num = send_sms(
            message,
            '+12065550100',
            phone_numbers,
            fail_silently=False
        )

        if num < len(phone_numbers):
            print("Failed to send message to " + str(len(phone_numbers) - num) + " phone numbers.")

def send_email_notification(subject, message):
    """
    Sends a message via email to users who have opted in for email notifications.
    """

    user_settings = UserSettings.objects.filter(recieve_email_notifications=True)

    emails = []
    for settings in user_settings:
        emails.append(settings.profile.user.email)

    if len(emails) != 0:
        num = 0
        for email in emails:
            print("Sending email to: ", email)

            num += send_mail(
                subject,
                message,
                django_settings.EMAIL_FROM,
                [email],
                fail_silently=False,
            )
        
        if num < len(emails):
            print("Failed to email message to " + str(len(emails) - num) + " emails.")

def on_incident_report_verified(report):
    """
    Called when an incident report is verified.
    """

    if report.emergency_level != None and report.emergency_level >= 5:
        sms_message = report.title + ": " + report.summary

        send_sms_notification(sms_message)

        email_subject = report.title
        email_message = report.summary + ": " + report.description

        send_email_notification(email_subject, email_message)