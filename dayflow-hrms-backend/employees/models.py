from django.db import models
from django.conf import settings

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Designation(models.Model):
    title = models.CharField(max_length=100)
    level = models.IntegerField(default=1) # 1=Junior, 10=Exec
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='designations')

    def __str__(self):
        return f"{self.title} ({self.department.name})"

class Employee(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    EMPLOYMENT_TYPE_CHOICES = (
        ('permanent', 'Permanent'),
        ('contract', 'Contract'),
        ('intern', 'Intern'),
    )
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('terminated', 'Terminated'),
    )

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employee_profile')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    designation = models.ForeignKey(Designation, on_delete=models.SET_NULL, null=True, blank=True)
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')
    
    # Personal Info
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    # Work Info
    employee_id = models.CharField(max_length=20, unique=True)
    joining_date = models.DateField()
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE_CHOICES, default='permanent')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    location = models.CharField(max_length=50, default='Office')

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.employee_id})"
