# serializers
from wash.api.serializers import EmployeeSerializer,TypeServicesSerializer
# models
from wash.models import Employee , TypeOfServices
# views
from rest_framework import viewsets
from rest_framework.views import APIView
# filter and pagination
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

# response and status
from rest_framework.response import Response
from rest_framework import status

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 1000

class EmployeeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    filter_backends = [filters.SearchFilter]
    search_fields = ['slug', 'name']
    pagination_class = StandardResultsSetPagination
    ordering = ['-id']
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        return Employee.objects.filter(company_id=self.request.user.company)
    
    def perform_create(self, serializer):
        serializer.save(boss=self.request.user,company_id=self.request.user.company)

class TypeServicesView(APIView,StandardResultsSetPagination):
    
    def get(self,request):
        query = ""
        description = request.query_params.get('search',None)   
        if description != None :
            query = TypeOfServices.objects.filter(description__icontains=description,id_company=self.request.user.company,active=True)
        else:
            query = TypeOfServices.objects.filter(id_company=self.request.user.company,active=True)

        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(query,request)
        serializer = TypeServicesSerializer(result_page,many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self,request):

        for i in request.data:
            if(request.data[i] == '' ):
                return Response({'error':'the type service has not been created'},status=status.HTTP_400_BAD_REQUEST)
        
        TypeOfServices.objects.create(
        description=request.data.get("description"),
        id_company=request.user.company,price=request.data.get("price"),
        employee_earnings=request.data.get("employee_earnings"),
        company_earnings=request.data.get("company_earnings")
        )

        return Response({'success':'the type service has been created'},status=status.HTTP_200_OK)

class TypeServicesViewDetail(APIView,StandardResultsSetPagination):
    
    def delete(self,request,pk, format=None):
        TypeOfServices.objects.filter(pk=pk).update(active=False)
        return Response({'success':'element has been deleted'},status=status.HTTP_200_OK)
