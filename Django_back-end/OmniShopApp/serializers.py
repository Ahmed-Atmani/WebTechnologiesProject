from rest_framework import serializers
from OmniShopApp.models import Item, Account, Purchase

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('ItemId', 
                  'ItemName')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (  'AccountId', 
                    'AccountFirstName',
                    'AccountLastName',
                    'AccountPicture',
                    'AccountBirthDate',
                    'AccountEmail',                  
                    'AccountPassword',  

                    'AccountAddressStreet',
                    'AccountAddressCity',
                    'AccountAddressCountry',
                    'AccountAddressStreetNumber',
                    'AccountAddressPostalCode')
        
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('PurchaseId',
                  'ItemId',
                  'AccountId')

