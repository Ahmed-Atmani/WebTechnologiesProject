from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from OmniShopApp.models import Account, Item, Purchase, ItemCategory, Complaint, Review
from OmniShopApp.serializers import AccountSerializer, ItemSerializer, PurchaseSerializer, \
    ItemCategorySerializer, ComplaintSerializer, ReviewSerializer

from django.core.files.storage import default_storage


#  Create your views here.

# == Account ==
class AccountViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating and updating accounts.
    """

    def list(self, request):
        queryset = Account.objects.all()
        serializer = AccountSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Account.objects.all()
        account = get_object_or_404(queryset, pk=pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def create(self, request):
        account_data = JSONParser().parse(request)
        account_serializer = AccountSerializer(data=account_data)
        if account_serializer.is_valid():
            if account_serializer.is_email_unique(value=account_data['AccountEmail']):
                account_serializer.save()
                return Response("Added successfully!")
            else:
                return Response("This email address is already linked to an Account.")
        return Response("Failed to add.")

    def update(self, request, pk=None):
        account_data = JSONParser().parse(request)
        account = Account.objects.get(AccountId=account_data['AccountId'])
        account_serializer = AccountSerializer(account, data=account_data)
        if account_serializer.is_valid():
            account_serializer.save()
            return Response("Updated successfully!")
        return Response("Failed to update.")

    def destroy(self, request, pk=None):
        account = Account.objects.get(AccountId=pk)
        account.delete()
        return Response("Deleted successfully!")


# == ITEM ==
class ItemViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating, updating and deleting items.
    """

    def list(self, request, account=None):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset, many=True)
        if account:
            queryset = queryset.filter(Seller=account)
            serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Item.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def create(self, request):
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

    def update(self, request, pk=None):
        item_data = JSONParser().parse(request)
        item = Item.objects.get(ItemId=pk)
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response("Updated successfully!")
        return Response("Failed to update.")

    def destroy(self, request, pk=None):
        item = Item.objects.get(ItemId=pk)
        item.delete()
        return Response("Deleted successfully!")


# == COMPLAINT ==
class ComplaintViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing and creating complaints.
    """

    def list(self, request, account=None):
        queryset = Complaint.objects.all()
        if account:
            queryset = queryset.filter(Account=account)
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        complaint_data = JSONParser().parse(request)
        complaint_serializer = ComplaintSerializer(data=complaint_data)
        if complaint_serializer.is_valid():
            complaint_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")


# == REVIEW ==
class ReviewViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating, updating and deleting reviews.
    """

    def list(self, request, account=None, item=None):
        queryset = Review.objects.all()
        if account:
            queryset = queryset.filter(Reviewer=account)
        if item:
            queryset = queryset.filter(Item=item)
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

    def update(self, request, pk=None):
        item_data = JSONParser().parse(request)
        item = Item.objects.get(ItemId=pk)
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response("Updated successfully!")
        return Response("Failed to update.")

    def destroy(self, request, pk=None):
        item = Item.objects.get(ItemId=pk)
        item.delete()
        return Response("Deleted successfully!")


# == ITEM CATEGORY ==
@csrf_exempt
def itemCategoryApi(request, id=0):
    if request.method == 'GET':
        itemCategorys = ItemCategory.objects.all()
        itemCategory_serializer = ItemCategorySerializer(itemCategorys, many=True)
        return JsonResponse(itemCategory_serializer.data, safe=False)

    elif request.method == 'POST':
        itemCategory_data = JSONParser().parse(request)
        itemCategory_serializer = ItemCategorySerializer(data=itemCategory_data)

        if itemCategory_serializer.is_valid():
            itemCategory_serializer.save()
            return JsonResponse("Added successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)

    elif request.method == 'PUT':
        itemCategory_data = JSONParser().parse(request)
        itemCategory = ItemCategory.objects.get(ItemCategoryId=itemCategory_data['ItemCategoryId'])
        itemCategory_serializer = ItemCategorySerializer(itemCategory, data=itemCategory_data)
        if itemCategory_serializer.is_valid():
            itemCategory_serializer.save()
            return JsonResponse("Updated successfully!", safe=False)
        return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        itemCategory = ItemCategory.objects.get(ItemCategoryId=id)
        itemCategory.delete()
        return JsonResponse("Deleted successfully!", safe=False)


@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)
