from django.urls import path
from . import views

urlpatterns = [
    path('report_incident/', views.report_incident),
    path('get_reports/', views.get_reports),
]