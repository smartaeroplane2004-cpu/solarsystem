from django.urls import path

from . import views

app_name = 'learning'

urlpatterns = [
    path('', views.home, name='home'),
    path('science/', views.science, name='science'),
    path('solar-system/', views.solar_system, name='solar_system'),
]