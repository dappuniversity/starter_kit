from django.shortcuts import render
from rest_framework import viewsets

from .serializers import *

class LoginAPI(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    queryset = Login.objects.all()