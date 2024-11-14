from sms import send_sms
from auth_api.models import User, UserSettings

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

def send_email_notification(message):
    """
    Sends a message via email to users who have opted in for email notifications.
    """

    pass

def on_incident_report_verified(report):
    """
    Called when an incident report is verified.
    """

    if report.emergency_level != None and report.emergency_level >= 5:
        sms_message = report.title + ": " + report.summary
        email_message = report.title + ": " + report.summary + ". " + report.description

        send_sms_notification(sms_message)
        send_email_notification(email_message)