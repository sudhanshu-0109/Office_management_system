from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='/api/schema/swagger-ui/', permanent=False)),  # Redirect root to docs
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/employees/', include('employees.urls')),
    
    # Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
