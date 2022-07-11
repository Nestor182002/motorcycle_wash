from django.urls import path
# models
from wash.views import Dashboard,Employee,Typeservices,Service


urlpatterns = [
    path("",Dashboard.as_view(),name="Dashboard"),
    path("employee",Employee.as_view(),name="employee"),
    path("typeservices",Typeservices.as_view(),name="typeservices"),
    path("service",Service.as_view(),name="service"),
]