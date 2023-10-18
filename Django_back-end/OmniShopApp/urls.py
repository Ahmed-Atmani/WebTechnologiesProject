# from django.conf.urls import url
from django.urls import re_path
from OmniShopApp import views

urlpatterns = [
    re_path(r'^account/$', views.accountApi),
    re_path(r'^account/([0-9]+)$', views.accountApi),
]
