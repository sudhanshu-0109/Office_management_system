from django.db import models
from django.conf import settings

class LeaveType(models.Model):
    name = models.CharField(max_length=50) # e.g. "Sick Leave", "Casual Leave"
    days_allowed = models.IntegerField(default=12)
    is_paid = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Leave(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.ForeignKey(LeaveType, on_delete=models.PROTECT)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Approval info
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
    rejection_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.leave_type} ({self.start_date})"
    
    @property
    def duration(self):
        return (self.end_date - self.start_date).days + 1
