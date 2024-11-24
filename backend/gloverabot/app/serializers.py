from rest_framework import serializers
from .models import Program, Student, Interview, MeetingLink,LanguageTest,WorkExperience

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'

class MeetingLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingLink
        fields = '__all__'

class LanguageTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageTest
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'