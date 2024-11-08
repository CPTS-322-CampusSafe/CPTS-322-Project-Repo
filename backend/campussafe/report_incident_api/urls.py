from django.urls import path
from . import views

urlpatterns = [
    path('report_incident/', views.report_incident),
]