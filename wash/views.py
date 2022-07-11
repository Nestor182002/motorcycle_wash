from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.


class Dashboard(LoginRequiredMixin,TemplateView):
    template_name = "dash/inicio.html"
    login_url = '/login/'

class Employee(LoginRequiredMixin,TemplateView):
    template_name = "employee/employ.html"
    login_url = '/login/'

class Typeservices(LoginRequiredMixin,TemplateView):
    template_name = "services/typeservice.html"
    login_url = '/login/'

class Service(LoginRequiredMixin,TemplateView):
    template_name = "services/addservices.html"
    login_url = '/login/'




