from rest_framework import viewsets
from .models import Program, Student, Interview, MeetingLink
from .serializers import ProgramSerializer, StudentSerializer, InterviewSerializer, MeetingLinkSerializer

from .models import Program, Student, Interview, MeetingLink, LanguageTest, WorkExperience
from .serializers import ProgramSerializer, StudentSerializer, InterviewSerializer, MeetingLinkSerializer, LanguageTestSerializer, WorkExperienceSerializer

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class InterviewViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer

class MeetingLinkViewSet(viewsets.ModelViewSet):
    queryset = MeetingLink.objects.all()
    serializer_class = MeetingLinkSerializer

class LanguageTestViewSet(viewsets.ModelViewSet):
    queryset = LanguageTest.objects.all()
    serializer_class = LanguageTestSerializer

class WorkExperienceViewSet(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer