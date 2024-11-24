from rest_framework.response import Response
from rest_framework import status,generics, viewsets
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import render 
from .models import User
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
import random
import string
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth.hashers import check_password

#from allauth.socialaccount.models import SocialAccount
# generet manualy token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }

class UserRegistrationView(APIView):

    def post(self,request,format=None):
        serialiazer=UserRegistationSerialiazer(data=request.data)
        if serialiazer.is_valid(raise_exception=True):
            user=serialiazer.save()
            user_data = UserRegistationSerialiazer(user).data
            return Response({'msg':'Registration Success',"User":user_data,'firstTimeLogin':True,"status":status.HTTP_201_CREATED},status=status.HTTP_201_CREATED)
        return Response(serialiazer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    def post(self,request,format=None):
        serialiazer=UserLoginSerialiazer(data=request.data)
        if serialiazer.is_valid(raise_exception=True):                                                                                                                                                                                                                                                                                              
            email=serialiazer.data.get('email')
            password=serialiazer.data.get('password')

            user=authenticate(email=email,password=password)

            if user is not None:    
                token=get_tokens_for_user(user)
                return Response({'user_id': user.id,'token':token, 'msg':"Login Success","status":status.HTTP_200_OK},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not valid']},"status":status.HTTP_404_NOT_FOUND},status=status.HTTP_404_NOT_FOUND)
        return Response(serialiazer.errors,status=status.HTTP_400_BAD_REQUEST)

class TeamMemberList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,**kwargs):
        UserObjs = User.objects.filter(organization_id = request.user.organization_id)
        userlist = UserDetailsSerializer(UserObjs,many=True)
        
        return Response(userlist.data,status=status.HTTP_200_OK)
    
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
        
    def get(self, request, format=None):
        user = self.get_object()
       
        if user:
            serializer = UserDetailsSerializer(user)

    
            response_data = {
            "user": serializer.data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        else:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class Me_Patch(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self,request,*args,**kwargs):
        seriazlier_obj = MeSerializer(data=request.data)

        if seriazlier_obj.is_valid():
             
            UserObj = User.objects.get(id=request.user.id)
            UserObj.name = seriazlier_obj['name'].value
            UserObj.gender = seriazlier_obj['gender'].value
            UserObj.age = seriazlier_obj['age'].value
            UserObj.save()

            return Response(seriazlier_obj.data,status=status.HTTP_200_OK)

        return Response(seriazlier_obj.errors,status=status.HTTP_200_OK)
        
class PasswordReset(generics.GenericAPIView):
    """
    Request for Password Reset Link.
    """

    serializer_class = EmailSerializer

    def post(self, request):
        """
        Create token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data["email"]
        user = User.objects.filter(email=email).first()
        locale = request.META['HTTP_ACCEPT_LANGUAGE'];

        if user:
            encoded_pk = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            # reset_url = reverse(
            #     "reset",
            #     kwargs={"encoded_pk": encoded_pk, "token": token},
            # )
            reset_url = f"reset-password/{encoded_pk}/{token}"
            reset_link = f"{settings.FRONTEND_URL}/{locale}/{reset_url}"

            # send the rest_link as mail to the user.
            email_content = f'Hello,\n\n reset your password. Your login link: {reset_link}'
            mail_subject='Reset Password Link.'
            from_email =  settings.DEFAULT_FROM_EMAIL
            recipient_list = [email]
            print(email_content)
            send_mail(mail_subject, email_content, from_email, recipient_list, fail_silently=True)
            return Response(
                {
                    "message": 
                    "Your reset password link send on your email","status":status.HTTP_200_OK
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "User doesn't exists","status":status.HTTP_400_BAD_REQUEST},
                status=status.HTTP_400_BAD_REQUEST,
            )
    
class ResetPasswordAPI(generics.GenericAPIView):
    """
    Verify and Reset Password Token View.
    """

    serializer_class = ResetPasswordSerializer

    def patch(self, request, *args, **kwargs):
        """
        Verify token & encoded_pk and then reset the password.
        """
        serializer = self.serializer_class(
            data=request.data, context={"kwargs": kwargs}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"message": "Your password has recently been changed","status":status.HTTP_200_OK},
            status=status.HTTP_200_OK,
        )

class UpdatePasswordAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordUpdateSerializer

    def get_object(self):
        return self.request.user

    def post(self, request):
        try:
            serializer = PasswordUpdateSerializer(data=request.data)
            if serializer.is_valid():
                user = request.user
                current_password = serializer.validated_data.get('currentPassword')
                new_password = serializer.validated_data.get('password1')
                confirm_password = serializer.validated_data.get('password2')

                if not check_password(current_password, user.password):
                    return Response({"currentPassword": ["Incorrect current password."]}, status=status.HTTP_400_BAD_REQUEST)
                
                if new_password != confirm_password:
                    return Response({"password2": ["Passwords do not match."]}, status=status.HTTP_400_BAD_REQUEST)

                user.set_password(new_password)
                user.save()
                return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("An error occurred:", e)
            return Response({"message": "An error occurred while updating the password."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserProfileSerializer
    parser_classes = [MultiPartParser, FormParser]  # Add parsers for multipart form data



    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        updated_data = serializer.data

        return Response({'status': status.HTTP_200_OK, 'message': "User profile updated successfully.", 'data': updated_data}, status=status.HTTP_200_OK)

