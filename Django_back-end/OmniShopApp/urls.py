# from django.conf.urls import url
from django.urls import re_path
from OmniShopApp import views

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    re_path(r'^account/$', views.accountApi),
    re_path(r'^account/([0-9]+)$', views.accountApi),

    re_path(r'^SaveFile$', views.SaveFile),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
