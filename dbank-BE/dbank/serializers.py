from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # what fields = "__all__" will do 
        # is to serialize all the fields in the model 
        fields = '__all__'

