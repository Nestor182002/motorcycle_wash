from django.contrib import admin
from wash.models import Company,Employee,Vehicle,TypeOfServices,Services

# Register your models here.

class CompanyAdmin(admin.ModelAdmin):
    model = Company
    list_display = ('slug', 'name','expiration','active',)
    list_filter = ('active',)

class EmployeeAdmin(admin.ModelAdmin):
    model = Employee
    list_display = ('slug', 'name','boss','earnings')
    list_filter = ('slug','name')

class VehicleAdmin(admin.ModelAdmin):
    model = Vehicle
    list_display = ('id','license_plate')
    list_filter = ('license_plate',)

class TypeOfServicesAdmin(admin.ModelAdmin):
    model = TypeOfServices
    list_display = ('id', 'description','id_company','price','employee_earnings','company_earnings','active')
    list_filter = ('id',)

class ServicesAdmin(admin.ModelAdmin):
    model = Services
    list_display =  ('slug', 'id_company','id_admin','id_vehicle','employee')
    list_filter = ('slug',)



admin.site.register(Company,CompanyAdmin)
admin.site.register(Employee,EmployeeAdmin)
admin.site.register(Vehicle,VehicleAdmin)
admin.site.register(TypeOfServices,TypeOfServicesAdmin)
admin.site.register(Services,ServicesAdmin)
