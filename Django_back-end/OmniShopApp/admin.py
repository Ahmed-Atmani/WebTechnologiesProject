from django.contrib import admin

from OmniShopApp.models import Account, Item, Purchase, ItemCategory, Complaint, Review, Image

admin.site.register(Account)
admin.site.register(Item)
admin.site.register(Purchase)
admin.site.register(ItemCategory)
admin.site.register(Complaint)
admin.site.register(Review)
admin.site.register(Image)
