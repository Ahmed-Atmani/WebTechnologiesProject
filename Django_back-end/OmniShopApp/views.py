from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404, render

from OmniShopApp.models import Account, Item, Purchase, ItemCategory, Complaint, Review, Image
from OmniShopApp.serializers import AccountSerializer, ItemSerializer, PurchaseSerializer, \
    ItemCategorySerializer, ComplaintSerializer, ReviewSerializer, ImageSerializer

from django.core.files.storage import default_storage

from django.contrib.auth import authenticate, login, logout


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

    @action(detail=False,
            methods=['POST'])
    def add_account_to_following(self, request):
        data = JSONParser().parse(request)
        account = get_object_or_404(Account, AccountId=data['follower'])
        seller = get_object_or_404(Account, AccountId=data['seller'])
        account.Following.add(seller)
        return Response("Seller added to your followed sellers.")

    @action(detail=False,
            methods=['POST'])
    def remove_account_from_following(self, request):
        data = JSONParser().parse(request)
        account = get_object_or_404(Account, AccountId=data['follower'])
        seller = get_object_or_404(Account, AccountId=data['seller'])
        account.Following.remove(seller)
        return Response("Seller removed from your followed sellers.")

    @action(detail=False,
            methods=['POST'])
    def add_item_to_wishlist(self, request):
        data = JSONParser().parse(request)
        account = get_object_or_404(Account, AccountId=data['account'])
        item = get_object_or_404(Item, ItemId=data['item'])
        account.Wishlist.add(item)
        return Response("Item added to your wishlist.")

    @action(detail=False,
            methods=['POST'])
    def remove_item_from_wishlist(self, request):
        data = JSONParser().parse(request)
        account = get_object_or_404(Account, AccountId=data['account'])
        item = get_object_or_404(Item, ItemId=data['item'])
        account.Wishlist.remove(item)
        return Response("Item removed from your wishlist.")


class ImageViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating and deleting images.
    """
    def list(self, request, *args, **kwargs):
        item = request.query_params.get('item', None)

        queryset = Image.objects.all()
        if item:
            queryset = queryset.filter(Item=Item.objects.get(ItemId=item))
        serializer = ImageSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Image.objects.all()
        image= get_object_or_404(queryset, pk=pk)
        serializer = ImageSerializer(image)
        return Response(serializer.data)

    def create(self, request):
        image_serializer = ImageSerializer(data=request.data)
        if image_serializer.is_valid():
            image_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

    def destroy(self, request, pk=None):
        image = Image.objects.get(ImageId=pk)
        image.delete()
        return Response("Deleted successfully!")


# == ITEM ==
class ItemViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating, updating and deleting items.
    For listing, filtering possible on ItemSeller with parameter 'account' (Integer)
    and on ItemState with parameter 'state' (Integer).
    """
    def list(self, request, *args, **kwargs):
        account = request.query_params.get('account', None)
        state = request.query_params.get('state', None)
        category = request.query_params.get('category', None)

        queryset = Item.objects.all()
        if account:
            queryset = queryset.filter(ItemSeller=Account.objects.get(AccountId=account))
        if state:
            queryset = queryset.filter(ItemState=state)
        if category:
            queryset = queryset.filter(ItemCategory=ItemCategory.objects.get(ItemCategory=category))
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Item.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def create(self, request):
        item_serializer = ItemSerializer(data=request.data)
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
    For listing, filtering possible on Account with parameter 'account' (Integer).
    """

    def list(self, request, *args, **kwargs):
        account = request.query_params.get('account', None)

        queryset = Complaint.objects.all()
        if account:
            queryset = queryset.filter(Account=Account.objects.get(AccountId=account))
        serializer = ComplaintSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        complaint_data = JSONParser().parse(request)
        complaint_serializer = ComplaintSerializer(data=complaint_data)
        if complaint_serializer.is_valid():
            complaint_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

class PurchaseViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating and updating purchases.
    """

    def list(self, request):
        queryset = Purchase.objects.all()
        serializer = PurchaseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Purchase.objects.all()
        purchase = get_object_or_404(queryset, pk=pk)
        serializer = PurchaseSerializer(purchase)
        return Response(serializer.data)

    def create(self, request):
        data = JSONParser().parse(request)
        serializer = PurchaseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response("Added successfully!")
        else:
            return Response("Failed to add.")

    def update(self, request, pk=None):
        data = JSONParser().parse(request)
        purchase = Purchase.objects.get(AccountId=data['PurchaseId'])
        serializer = PurchaseSerializer(purchase, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response("Updated successfully!")
        return Response("Failed to update.")

    def destroy(self, request, pk=None):
        purchase = Purchase.objects.get(PurchaseId=pk)
        purchase.delete()
        return Response("Deleted successfully!")

# == REVIEW ==
class ReviewViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating, updating and deleting reviews.
    For listing, filtering possible on Reviewer with parameter 'account' (Integer)
    and on Item with parameter 'item' (Integer).
    """

    def list(self, request, *args, **kwargs):
        account = request.query_params.get('account', None)
        item = request.query_params.get('item', None)

        queryset = Review.objects.all()
        if account:
            queryset = queryset.filter(Reviewer=Account.objects.get(AccountId=account))
        if item:
            queryset = queryset.filter(Item=Item.objects.get(ItemId=item))
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        review_data = JSONParser().parse(request)
        review_serializer = ReviewSerializer(data=review_data)
        if review_serializer.is_valid():
            review_serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

    def update(self, request, pk=None):
        review_data = JSONParser().parse(request)
        review = Review.objects.get(ReviewId=pk)
        review_serializer = ReviewSerializer(review, data=review_data)
        if review_serializer.is_valid():
            review_serializer.save()
            return Response("Updated successfully!")
        return Response("Failed to update.")

    def destroy(self, request, pk=None):
        review = Review.objects.get(ReviewId=pk)
        review.delete()
        return Response("Deleted successfully!")


class ItemCategoryViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing, retrieving, creating and deleting ItemCategories
    """
    def list(self, request, *args, **kwargs):
        queryset = ItemCategory.objects.all()
        serializer = ItemCategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ItemCategory.objects.all()
        itemcategory = get_object_or_404(queryset, pk=pk)
        serializer = ItemCategorySerializer(itemcategory)
        return Response(serializer.data)

    def create(self, request):
        serializer = ItemCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Added successfully!")
        return Response("Failed to add.")

    def destroy(self, request, pk=None):
        itemcategory = ItemCategory.objects.get(ItemCategoryId=pk)
        itemcategory.delete()
        return Response("Deleted successfully!")


@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)


class LoginView(APIView):
    def post(self, request):
        AccountEmail = request.data.get('AccountEmail')
        AccountPassword = request.data.get('AccountPassword')

        user = authenticate(email=AccountEmail, password=AccountPassword)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)

            return Response({'token': token.key,
                             'AccountId': Account.objects.get(User=user).AccountId})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out'})


def landing_page(request):
    newbestsellers = Item.objects.all()[:4]  # Assuming you want to display 4 bestsellers
    return render(request, 'landing_page.html', {'newbestsellers': newbestsellers})