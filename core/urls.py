from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    # tailwind
    path("__reload__/", include("django_browser_reload.urls")),
    # pages
    path("", include("wash.urls")),
    path("", include("accounts.urls")),
    # apis
     path("api/", include("wash.api.urls")),
]
