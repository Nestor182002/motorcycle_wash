from django.db import models
# external
import datetime
from django.conf import settings
import random,string
 
# Create your models here.
class BasicData(models.Model):
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

def random_id(lenght=8):
     randoms=''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(lenght))
     while Services.objects.filter(slug=randoms).exists() or Employee.objects.filter(slug=randoms).exists() :
          randoms=''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(lenght))
     else:
          return randoms

class Company(BasicData):
    slug = models.SlugField(default=random_id)
    name = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    expiration = models.DateField()

    def __str__(self):
        return self.slug + " - " + self.name

class Employee(BasicData):
    slug = models.SlugField(default=random_id)
    name = models.CharField(max_length=100)
    boss = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="boss")
    company_id =models.ForeignKey(Company,on_delete=models.CASCADE,related_name="company")
    earnings = models.IntegerField(default=0)

    def __str__(self):
        return self.slug + " - " + self.name

class Vehicle(BasicData):
    license_plate = models.CharField(max_length=50)

    def __str__(self):
        return self.license_plate

class TypeOfServices(BasicData):
    description = models.TextField()
    id_company = models.ForeignKey(Company,on_delete=models.CASCADE,related_name="company_type")
    price = models.IntegerField()
    employee_earnings = models.IntegerField()
    company_earnings = models.IntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.pk) + " - " + self.description

class Services(BasicData):
    slug = models.SlugField(default=random_id)
    typeServices = models.ForeignKey(TypeOfServices,on_delete=models.CASCADE,related_name="typeservices")
    id_company = models.ForeignKey(Company,on_delete=models.CASCADE,related_name="id_company")
    id_admin = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="id_admin",default=True)
    employee = models.ForeignKey(Employee,on_delete=models.CASCADE,related_name="Employee")
    id_vehicle = models.ForeignKey(Vehicle,on_delete=models.CASCADE,related_name="id_vehicle")

    def __str__(self):
        return self.slug 
 






