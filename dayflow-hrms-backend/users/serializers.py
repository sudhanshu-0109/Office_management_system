from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(required=False, default='employee')

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name', 'role', 'company_name', 'logo')
        extra_kwargs = {'username': {'required': False}}

    def create(self, validated_data):
        # If username is not provided, use email
        username = validated_data.get('username', validated_data['email'])
        
        user = User.objects.create_user(
            email=validated_data['email'],
            username=username,
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'employee'),
            company_name=validated_data.get('company_name', ''),
            logo=validated_data.get('logo', None)
        )
        return user
