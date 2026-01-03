from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('hr', 'HR Manager'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    )
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    
    # Organization Details
    company_name = models.CharField(max_length=100, blank=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    # We use email as the primary login identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
