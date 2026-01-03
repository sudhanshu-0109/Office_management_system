from rest_framework import serializers
from .models import Employee, Department, Designation
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    designation_title = serializers.CharField(source='designation.title', read_only=True)
    
    # Write fields for creating user implicitly if needed, 
    # but typically admin creates User then Employee, or Employee creation creates User.
    # For simplicity, we'll assume we pass 'email', 'name' etc to auto-create user OR link existing.
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)
    
    # Custom fields for handling string input for foreign keys
    department_val = serializers.CharField(write_only=True, required=False)
    designation_val = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Employee
        fields = [
            'id', 'user', 'department', 'designation', 'manager', 
            'date_of_birth', 'gender', 'phone', 'address', 
            'employee_id', 'joining_date', 'employment_type', 
            'status', 'location', 'department_name', 'designation_title',
            'email', 'first_name', 'last_name', 'password',
            'department_val', 'designation_val'
        ]
        extra_kwargs = {
            'employee_id': {'required': False},
            'joining_date': {'required': False},
            'gender': {'required': False},
            'department': {'required': False},
            'designation': {'required': False},
        }

    def create(self, validated_data):
        email = validated_data.pop('email')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        password = validated_data.pop('password', 'dayflow123') 
        
        dept_name = validated_data.pop('department_val', None)
        desig_title = validated_data.pop('designation_val', None)

        # Department & Designation Logic
        department = None
        designation = None

        if dept_name:
            department, _ = Department.objects.get_or_create(name=dept_name)
        
        if desig_title:
            # Attach to department if exists, otherwise create generic
            parent_dept = department if department else Department.objects.get_or_create(name="General")[0]
            designation, _ = Designation.objects.get_or_create(title=desig_title, defaults={'department': parent_dept})

        # Auto-generation
        import uuid
        import datetime
        
        if 'employee_id' not in validated_data:
            validated_data['employee_id'] = f"EMP-{uuid.uuid4().hex[:6].upper()}"
        
        if 'joining_date' not in validated_data:
            validated_data['joining_date'] = datetime.date.today()
            
        if 'gender' not in validated_data:
            validated_data['gender'] = 'O'

        # Create User
        username = email 
        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name, role='employee')
        
        # Create Employee
        employee = Employee.objects.create(
            user=user, 
            department=department, 
            designation=designation, 
            **validated_data
        )
        return employee
