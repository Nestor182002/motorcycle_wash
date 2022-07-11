from rest_framework import serializers
# models 
from wash.models import Employee,TypeOfServices

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = ['pk','slug', 'name', 'boss','earnings','company_id']
        read_only_fields = ['pk','slug','boss','earnings','company_id']

class TypeServicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeOfServices
        fields = ['pk','description', 'id_company','price','employee_earnings','company_earnings']
        read_only_fields = ['pk','id_company']