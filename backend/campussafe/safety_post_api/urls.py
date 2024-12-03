from django.urls import path
from . import views

urlpatterns = [
    path("create_post/", views.create_post),
    path("get_posts/", views.get_posts),
    path("get_post_content/", views.get_post_content),
]