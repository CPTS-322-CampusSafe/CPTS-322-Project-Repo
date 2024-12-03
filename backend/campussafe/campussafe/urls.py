"""
URL configuration for campussafe project.
"""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth_api.urls')),
    path('report/', include('report_incident_api.urls')),
    path('posts/', include('safety_post_api.urls')),
]
