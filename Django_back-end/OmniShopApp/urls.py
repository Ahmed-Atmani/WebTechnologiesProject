from django.urls import re_path
from OmniShopApp import views

from django.conf.urls.static import static
from django.conf import settings

from OmniShopApp.views import ItemViewSet, AccountViewSet, ComplaintViewSet, ReviewViewSet, ImageViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path
from django.conf.urls import include

router = DefaultRouter()
router.register(r'item', ItemViewSet, basename='item')
router.register(r'account', AccountViewSet, basename='account')
router.register(r'complaint', ComplaintViewSet, basename='complaint')
router.register(r'review', ReviewViewSet, basename='review')
router.register(r'image', ImageViewSet, basename='image')

urlpatterns = [
    re_path(r'^item-category/$', views.itemCategoryApi),
    re_path(r'^item-category/([0-9]+)$', views.itemCategoryApi),

    re_path(r'^SaveFile$', views.SaveFile),
    path("", include(router.urls)),

    path('api/account/', views.login_view, name='login'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


