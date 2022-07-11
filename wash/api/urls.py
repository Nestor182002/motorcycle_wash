from django.urls import path,include
# viewset and apiviews
from wash.api.views import EmployeeViewSet,TypeServicesView,TypeServicesViewDetail
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'Employees', EmployeeViewSet, basename='employees')

urlpatterns = router.urlsurlpatterns = [
    path('', include(router.urls)),
    path('typeservice/',TypeServicesView.as_view(),name='typeservicesapi'),
    path('typeservice/<int:pk>',TypeServicesViewDetail.as_view(),name='typeservicesapidetail')
]
