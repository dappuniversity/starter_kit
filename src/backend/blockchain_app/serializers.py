from rest_framework import serializers
from .models import *


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=Login
        fields = "__all__"