from django.db import models
import auth_api.models

class SafetyPost(models.Model):
    """
    A safety post.
    """

    title = models.CharField(max_length=150)
    date_posted = models.DateTimeField(auto_now_add=True) # The time this post was recieved by the server
    author = models.CharField(max_length=150, blank=True, null=True)
    content = models.FileField(upload_to="posts/")
    is_public = models.BooleanField(default=True)

    user = models.ForeignKey(auth_api.models.User, on_delete=models.SET_NULL, null=True, blank=True)