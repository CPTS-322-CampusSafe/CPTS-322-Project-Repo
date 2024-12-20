from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view),
    path('is_logged_in/', views.is_logged_in_view),
    path('get_profile/', views.get_profile_view),
    path('logout/', views.logout_view),
    path('register/', views.register_view),
    path('get_csrf_token/', views.get_csrf_token),
    path('update_settings/', views.update_settings_view),
]