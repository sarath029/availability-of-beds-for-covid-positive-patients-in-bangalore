from django.urls import path
from .views import AvailabilityView
from django.views.decorators.cache import cache_page

urlpatterns = [
    path('availability', cache_page(60*60)(AvailabilityView.as_view())),
]
