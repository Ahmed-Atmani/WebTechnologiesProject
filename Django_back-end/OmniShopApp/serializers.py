from rest_framework import serializers
from OmniShopApp.models import Item, Account, Purchase, ItemCategory, Complaint, Review

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = (
            'ItemCategoryId',
            'ItemCategoryName')


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

    def is_email_unique(self, value):
        # Check if an account with the same email address already exists
        existing_account = Account.objects.filter(AccountEmail=value).first()

        if existing_account:
            return False
        else:
            return True


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('PurchaseId',
                  'ItemId',
                  'AccountId')

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


