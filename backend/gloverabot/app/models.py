from django.db import models
from rest_framework import serializers

class Program(models.Model):
    # Program attributes
    PROGRAM_LEVEL_CHOICES = [
        ('Bachelors', 'Bachelors'),
        ('Masters', 'Masters'),
        ('PhD', 'PhD'),
        ('Diploma', 'Diploma'),
    ]
    name = models.CharField(max_length=255, unique=True, help_text="Name of the program")
    level = models.CharField(max_length=50, choices=PROGRAM_LEVEL_CHOICES, help_text="Level of the program")
    min_fee = models.DecimalField(max_digits=10, decimal_places=2, help_text="Minimum fee for the program")
    scholarship = models.BooleanField(default=False, help_text="Is scholarship available?")
    scholarship_details = models.TextField(blank=True, null=True, help_text="Details about scholarship, if applicable")
    qualification_required = models.TextField(help_text="Minimum qualifications required for the program")
    location = models.CharField(max_length=255, help_text="Location of the program")
    time_span = models.DurationField(help_text="Duration of the program (e.g., 2 years, 6 months)")
    total_fee = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total fee for the program")
    is_active = models.BooleanField(default=True, help_text="Is the program currently active?")
    currently_in_program = models.IntegerField(default=0, help_text="Number of students currently in the program")
    visa_requirements = models.TextField(blank=True, null=True, help_text="Visa requirements for the program")
    pros_and_cons = models.TextField(blank=True, null=True, help_text="Pros and cons of the program")
    one_line_description = models.CharField(max_length=255, blank=True, null=True, help_text="One-line description of the program")

    # Metadata and string representation
    class Meta:
        ordering = ['level', 'name']
        verbose_name = "Program"
        verbose_name_plural = "Programs"

    def __str__(self):
        return f"{self.name} ({self.level})"

class Student(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    program = models.ForeignKey('Program', on_delete=models.CASCADE, related_name='students')
    education_qualification = models.TextField(help_text="Details of education qualification")
    subjects_studied = models.TextField(help_text="Subjects studied")
    countries_looking_to_study = models.TextField(help_text="Countries looking to study")
    program_looking_for = models.CharField(max_length=255, help_text="Program looking for")
    address = models.TextField(help_text="Home address")
    phone_number = models.CharField(max_length=15, help_text="Phone number")
    nationality = models.CharField(max_length=100, help_text="Nationality")
    passport_number = models.CharField(max_length=50, unique=True, help_text="Passport number")
    previous_institutions = models.TextField(help_text="Previous institutions attended")
    extracurricular_activities = models.TextField(blank=True, null=True, help_text="Extracurricular activities")
    personal_statement = models.TextField(blank=True, null=True, help_text="Personal statement")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class WorkExperience(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='work_experiences')
    company_name = models.CharField(max_length=255, help_text="Name of the company")
    position = models.CharField(max_length=255, help_text="Position held")
    start_date = models.DateField(help_text="Start date of the work experience")
    end_date = models.DateField(blank=True, null=True, help_text="End date of the work experience")
    responsibilities = models.TextField(help_text="Responsibilities and achievements")

    def __str__(self):
        return f"{self.position} at {self.company_name}"

class LanguageTest(models.Model):
    LANGUAGE_CHOICES = [
        ('English', 'English'),
        ('German', 'German'),
        ('Spanish', 'Spanish'),
        ('French', 'French'),
        ('Russian', 'Russian'),
    ]
    TEST_CHOICES = [
        ('SAT', 'SAT'),
        ('IELTS', 'IELTS'),
        ('TOEFL', 'TOEFL'),
        ('DUOLINGO', 'DUOLINGO'),
        ('PTE', 'PTE'),
    ]
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Proficient', 'Proficient'),
    ]
    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='language_tests')
    language = models.CharField(max_length=50, choices=LANGUAGE_CHOICES, help_text="Language of the test")
    test_name = models.CharField(max_length=50, choices=TEST_CHOICES, help_text="Name of the language test")
    level = models.CharField(max_length=50, choices=LEVEL_CHOICES, help_text="Level of proficiency")
    score = models.DecimalField(max_digits=5, decimal_places=2, help_text="Score obtained in the test")
    test_date = models.DateField(help_text="Date of the test")

    def __str__(self):
        return f"{self.language} - {self.test_name} - {self.student.first_name} {self.student.last_name}"

class Interview(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='interviews')
    date = models.DateTimeField()
    interviewer = models.CharField(max_length=255)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Interview with {self.student} on {self.date}"

class MeetingLink(models.Model):
    interview = models.OneToOneField('Interview', on_delete=models.CASCADE, related_name='meeting_link')
    url = models.URLField()

    def __str__(self):
        return f"Meeting link for {self.interview}"