from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('is_logged_in/', views.is_logged_in_view),
]