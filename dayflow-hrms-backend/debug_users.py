
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

print("--- Listing Users ---")
for u in User.objects.all():
    print(f"ID: {u.id} | Email: {u.email} | Username: {u.username} | Role: {u.role} | Active: {u.is_active} | Has Pwd: {u.has_usable_password()}")

print("\n--- Testing Authentication ---")
email = "sunnygautam123@gmail.com"
password = "password123"

print(f"Attempting auth for {email} ...")
user = authenticate(email=email, password=password)
if user:
    print(f"SUCCESS: Authenticated user {user.email}")
else:
    print(f"FAILURE: Authentication returned None")
    # Try with username kwarg just in case
    user2 = authenticate(username=email, password=password)
    if user2:
        print(f"SUCCESS: Authenticated using 'username' kwarg! {user2.email}")

