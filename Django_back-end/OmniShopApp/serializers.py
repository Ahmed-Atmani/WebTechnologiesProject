from rest_framework import serializers
from OmniShopApp.models import Items, Accounts, Purchases

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('ItemId', 
                  'ItemName')
        
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ('AccountId', 
                  'AccountFirstName',
                  'AccountLastName',
                  'AccountPicture')
        
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchases
        fields = ('PurchaseId',
                  'ItemId',
                  'AccountId')

