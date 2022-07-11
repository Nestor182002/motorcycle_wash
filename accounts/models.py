from django.db import models
from django.contrib.auth.models import AbstractUser
# models
from wash.models import Company

# Create your models here.
class CustomUser(AbstractUser):
    company=models.ForeignKey(Company,null=True,blank=True,on_delete=models.CASCADE,related_name="user_company")
