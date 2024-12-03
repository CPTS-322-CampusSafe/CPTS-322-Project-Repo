from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SafetyPost
from .serializers import SafetyPostSerializer
from rest_framework import status

@api_view(["POST"])
def create_post(request):
    """
    Creates a new safety post.
    """

    user = None

    if request.user.is_authenticated and request.user.is_user_admin:
        user = request.user
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = SafetyPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_posts(request):
    """
    Gets all of the safety posts.
    """

    serializer = SafetyPostSerializer(SafetyPost.objects.all(), many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_post_content(request):
    """
    Gets the content of a safety post.
    """

    post_id = request.query_params.get("id")

    try:
        post = SafetyPost.objects.get(id=post_id)
    except SafetyPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    with post.content.open() as f:
        return Response(f.read())

    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)