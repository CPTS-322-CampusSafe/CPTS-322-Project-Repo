from .models import User
from rest_framework import serializers

# Validator that makes sure the field exists.
def required(value):
    if value is None:
        raise serializers.ValidationError("This field is required.")

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[required]) # Email is required

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user