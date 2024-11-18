"""
URL configuration for campussafe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import: from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth_api.urls')),  # Existing auth API routes
    path('report/', include('report_incident_api.urls')),  # Existing report routes
    path('auth/logout/', include('auth_api.urls')),  # Logout endpoint
    path('auth/profile/<int:user_id>/', include('auth_api.urls')),  # Profile GET/PUT endpoints
]
