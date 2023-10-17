from rest_framework import serializers
from OmniShopApp import Items, Accounts, Purchases

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('ItemId', 
                  'ItemName')