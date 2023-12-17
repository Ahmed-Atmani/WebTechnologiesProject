from django.urls import re_path
from OmniShopApp import views

from django.conf.urls.static import static
from django.conf import settings

from OmniShopApp.views import ItemViewSet, AccountViewSet, ComplaintViewSet, ReviewViewSet, ImageViewSet, PurchaseViewSet, ItemCategoryViewSet, LoginView, LogoutView
from rest_framework.routers import DefaultRouter
from django.urls import path
from django.conf.urls import include

router = DefaultRouter()
router.register(r'item', ItemViewSet, basename='item')
router.register(r'account', AccountViewSet, basename='account')
router.register(r'complaint', ComplaintViewSet, basename='complaint')
router.register(r'review', ReviewViewSet, basename='review')
router.register(r'image', ImageViewSet, basename='image')
router.register(r'purchase', PurchaseViewSet, basename='purchase')
router.register(r'item-category', ItemCategoryViewSet, basename='item-category')

urlpatterns = [

    re_path(r'^SaveFile$', views.SaveFile),
    path("", include(router.urls)),

    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


