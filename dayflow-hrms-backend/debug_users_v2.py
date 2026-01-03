
import os
import django
import sys

# Add the project directory to the sys.path
sys.path.append(os.getcwd())

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

print(f"Total Users: {User.objects.count()}")
for u in User.objects.all():
    print(f"ID: {u.id}")
    print(f"  Email: {u.email}")
    print(f"  Username: {u.username}")
    print(f"  Role: {u.role}")
    print(f"  Active: {u.is_active}")
    print("-" * 20)
