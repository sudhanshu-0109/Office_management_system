from rest_framework import viewsets, permissions, filters
from .models import Employee, Department, Designation
from .serializers import EmployeeSerializer, DepartmentSerializer, DesignationSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    # permission_classes = [permissions.IsAuthenticated] # Enable in production
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'employee_id']
    filterset_fields = ['department', 'status', 'employment_type']

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    # permission_classes = [permissions.IsAuthenticated]
