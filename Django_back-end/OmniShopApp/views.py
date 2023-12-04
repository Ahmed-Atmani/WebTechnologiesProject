from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from OmniShopApp.models import Account, Item, Purchase, ItemCategory
from OmniShopApp.serializers import AccountSerializer, ItemSerializer, PurchaseSerializer, ItemCategorySerializer

from django.core.files.storage import default_storage


#  Create your views here.

# == Account ==
@csrf_exempt
def accountApi(request, id=0):
    if request.method == 'GET':
        accounts = Account.objects.all()
        accounts_serializer = AccountSerializer(accounts, many=True)
        return JsonResponse(accounts_serializer.data, safe=False)
    
    elif request.method == 'POST':
        account_data = JSONParser().parse(request)
        account_serializer = AccountSerializer(data=account_data)
    
        if account_serializer.is_valid():
            account_serializer.save()
            return JsonResponse("Added successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)


    
    elif request.method == 'PUT':
        account_data = JSONParser().parse(request)
        account = Account.objects.get(AccountId=account_data['AccountId'])
        account_serializer = AccountSerializer(account, data=account_data)
        if account_serializer.is_valid():
            account_serializer.save()
            return JsonResponse("Updated successfully!", safe=False)
        return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        account = Account.objects.get(AccountId=id)
        account.delete()
        return JsonResponse("Deleted successfully!", safe=False)
  
        
# == ITEM ==
@csrf_exempt
def itemApi(request, id=0):
    if request.method == 'GET':
        items = Item.objects.all()
        item_serializer = ItemSerializer(items, many=True)
        return JsonResponse(item_serializer.data, safe=False)
    
    elif request.method == 'POST':
        item_data = JSONParser().parse(request)
        item_serializer = ItemSerializer(data=item_data)
    
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Added successfully!", safe=False)
        return JsonResponse("Failed to add.", safe=False)
    
    elif request.method == 'PUT':
        item_data = JSONParser().parse(request)
        item = Item.objects.get(ItemId=item_data['ItemId'])
        item_serializer = ItemSerializer(item, data=item_data)
        if item_serializer.is_valid():
            item_serializer.save()
            return JsonResponse("Updated successfully!", safe=False)
        return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        item = Item.objects.get(ItemId=id)
        item.delete()
        return JsonResponse("Deleted successfully!", safe=False)
    
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