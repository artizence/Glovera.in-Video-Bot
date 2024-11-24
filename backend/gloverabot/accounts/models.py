from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, password=password, **extra_fields)


AUTH_PROVIDERS = {"email": "email", "google": "google"}


class User(AbstractBaseUser):
    GENDER_CHOICES = (("MALE", "Male"), ("FEMALE", "Female"))

    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=200, null=True, blank=True)
    gender = models.CharField(
        max_length=200, null=True, blank=True, choices=GENDER_CHOICES
    )
    age = models.PositiveIntegerField(null=True, blank=True)
    # stripe_session_id = models.CharField()
    # organization = models.CharField(max_length=200, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email"))
    admin = models.BooleanField(default=False)
    show_password = models.CharField(max_length=100,null=True)
    # profile_photo = models.CharField(max_length=200, null=True, blank=True, default='default.jpg')
    profile_photo = models.ImageField(upload_to="users/", default="users/default.jpg")
    objects = UserManager()
    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ["name", "organization"]
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.email)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

