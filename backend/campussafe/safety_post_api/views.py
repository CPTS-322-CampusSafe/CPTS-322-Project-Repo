from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SafetyPost
from .serializers import SafetyPostSerializer
from rest_framework import status

@api_view(["POST"])
def create_post(request):
    """
    Creates a new incident report.
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