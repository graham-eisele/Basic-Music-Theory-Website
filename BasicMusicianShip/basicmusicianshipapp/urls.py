from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [

    path("worksheets", views.worksheets, name="worksheets"),
    path("worksheets/<int:pk>/", views.worksheet, name="worksheets"),
    path("about", views.about, name="about"),
    path('', views.home, name='home')
]