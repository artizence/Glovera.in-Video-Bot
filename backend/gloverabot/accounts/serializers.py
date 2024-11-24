from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from drf_extra_fields.fields import ImageField
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from datetime import datetime


class UserRegistationSerialiazer(serializers.ModelSerializer):
    # profile_photo = Base64ImageField(required=False)
    # we are write this becouse we need confirm password field in our registration Request 
    password2=serializers.CharField(style={'input_type':"password"},write_only=True) 
    class Meta:
        model=User 
        # fields=['email','first_name','last_name','organization',"profile_photo","job_title","department",'password','password2']
        fields=['email','name','password','password2']
        extra_kwargs={
            'password':{'write_only':True}
        }
    #  validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        email=attrs.get('email')

        if password!=password2:
            raise serializers.ValidationError({'Password': "Password and Confirm Pasword doesn't match"})
         
        return attrs
    def create(self, validated_data):
        password2 = validated_data.pop('password2', None)
        
        ##creating the authorization object
        

        return User.objects.create_user(**validated_data,show_password=password2)

class UserLoginSerialiazer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta:
        model = User
        fields = ['email', 'password']

class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('email',)
        read_only_fields = ('email',)

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
             
class EmailSerializer(serializers.Serializer):
    """
    Reset Password Email Request Serializer.
    """

    email = serializers.EmailField()

    class Meta:
        fields = ("email",)

class ResetPasswordSerializer(serializers.Serializer):
    """
    Reset Password Serializer.
    """

    password = serializers.CharField(
        write_only=True,
        min_length=1,
    )
    password2 = serializers.CharField(write_only=True, min_length=1)

    class Meta:
        field = ("password")

    def validate(self, data):
        """
        Verify token and encoded_pk and then set new password.
        """
        password = data.get("password")
        password2 = data.get("password2")
        if password != password2:
            raise serializers.ValidationError("Passwords do not match.")
        token = self.context.get("kwargs").get("token")
        encoded_pk = self.context.get("kwargs").get("encoded_pk")

        if token is None or encoded_pk is None:
            raise serializers.ValidationError("Missing data.")

        pk = urlsafe_base64_decode(encoded_pk).decode()
        user = User.objects.get(pk=pk)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError("The reset token is invalid")

        user.set_password(password)
        user.save()
        return data
  # or your custom User model if you have one

class PasswordUpdateSerializer(serializers.Serializer):
    currentPassword = serializers.CharField(required=True)
    password1 = serializers.CharField(max_length=128)
    password2 = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("The new passwords do not match.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password1'])
        instance.save()
        return instance

class UpdateUserProfileSerializer(serializers.ModelSerializer):
    profile_photo = ImageField(required=False)

    class Meta:
        model=User 
        fields = ['name', 'phone', 'profile_photo', 'age', 'gender']
 
    def update(self, instance, validated_data):
        # instance.first_name = validated_data.get('first_name', instance.first_name)
        # instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.profile_photo = validated_data.get('profile_photo', instance.profile_photo)
        # instance.job_title = validated_data.get('job_title', instance.job_title)
        instance.save()
        return instance
        



class Me:
    def __init__(self, *args,**kwargs):
        self.account_type = kwargs['account_type']

class MeSerializer(serializers.Serializer):
    # account_type = serializers.CharField(max_length=200)

    def create(self, validated_data):
        return Me(**validated_data)
