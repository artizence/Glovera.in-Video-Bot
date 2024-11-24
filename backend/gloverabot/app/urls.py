from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProgramViewSet, StudentViewSet, InterviewViewSet, MeetingLinkViewSet

router = DefaultRouter()
router.register(r'programs', ProgramViewSet)
router.register(r'students', StudentViewSet)
router.register(r'interviews', InterviewViewSet)
router.register(r'meeting-links', MeetingLinkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]