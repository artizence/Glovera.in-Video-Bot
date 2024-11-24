from django.urls import path,include
from .views import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path(
        "password-reset/",PasswordReset.as_view(),
        name="request-password-reset",
    ),
    path('password-reset/<str:encoded_pk>/<str:token>/', ResetPasswordAPI.as_view(), name='reset'),
    path('update-password/', UpdatePasswordAPIView.as_view(), name='update_password'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('team-member/list',TeamMemberList.as_view(),name='team-member-list'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('me/update/', Me_Patch.as_view(), name='user--update'),


]