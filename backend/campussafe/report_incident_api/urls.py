from django.urls import path
from . import views

urlpatterns = [
    path('report_incident/', views.report_incident),
    path('upload_report_image/', views.upload_report_image),
    path('get_reports/', views.get_reports),
    path('serach_reports/', views.search_reports),
]