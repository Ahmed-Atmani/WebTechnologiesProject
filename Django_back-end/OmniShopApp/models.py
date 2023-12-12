from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg


# Create your models here.

class Address(models.Model):
    AddressId = models.AutoField(primary_key=True)
    AddressStreet = models.CharField(max_length=20)
    AddressCity = models.CharField(max_length=20)
    AddressCountry = models.CharField(max_length=20)
    AddressStreetNumber = models.PositiveIntegerField()
    AddressPostalCode = models.PositiveIntegerField()


class Account(models.Model):
    AccountId = models.AutoField(primary_key=True)
    AccountFirstName = models.CharField(max_length=20)
    AccountLastName = models.CharField(max_length=20)
    AccountPicture = models.CharField(max_length=100)
    AccountBirthDate = models.DateField()
    AccountEmail = models.CharField(max_length=20)
    AccountPassword = models.CharField(max_length=20)
    # Address
    AccountAddressStreet = models.CharField(max_length=20)
    AccountAddressCity = models.CharField(max_length=20)
    AccountAddressCountry = models.CharField(max_length=20)
    AccountAddressStreetNumber = models.PositiveIntegerField()
    AccountAddressPostalCode = models.PositiveIntegerField()


class ItemCategory(models.Model):
    ItemCategoryId = models.AutoField(primary_key=True)
    ItemCategoryName = models.CharField(max_length=20)


STATE_CHOICES = (
    (1, 'New'),
    (2, 'Second-Hand'),
)


class Item(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=20)
    ItemDetails = models.CharField(max_length=1000)
    ItemPrice = models.DecimalField(max_digits=6, decimal_places=2)
    ItemCategory = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    ItemState = models.IntegerField(default=1, choices=STATE_CHOICES)
    ItemSeller = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    ItemRating = models.FloatField(help_text='Average rating', null=True)

    def update_rating(self):
        # Update the rating based on the average rating of associated reviews
        reviews = self.reviews.all()
        if reviews.exists():
            average_rating = reviews.aggregate(Avg('rating'))['rating__avg']
            self.ItemRating = round(average_rating, 1)
        else:
            self.ItemRating = None

        self.save()


class Purchase(models.Model):
    PurchaseId = models.AutoField(primary_key=True)
    Item = models.ForeignKey(Item, on_delete=models.CASCADE)
    Account = models.ForeignKey(Account, on_delete=models.CASCADE)


STATUS_CHOICES = (
    (1, 'Not Started'),
    (2, 'In Progress'),
    (3, 'Closed'),
)


class Review(models.Model):
    ReviewId = models.AutoField(primary_key=True)
    Item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='reviews')
    Rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)],)
    ReviewText = models.CharField(max_length=1000)
    Submit_date = models.DateTimeField(auto_now_add=True)
    Reviewer = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='reviews')

    def save(self, *args, **kwargs):
        super(Review, self).save(*args, **kwargs)
        # Update the rating of the associated item after saving
        self.Item.update_rating()

    def delete(self, *args, **kwargs):
        item = self.Item
        super(Review, self).delete(*args, **kwargs)
        # Update the rating of the associated item after review is deleted
        item.update_rating()


class Complaint(models.Model):
    ComplaintId = models.AutoField(primary_key=True)
    Account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='complaints')
    Item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    Purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, null=True)
    Description = models.TextField()
    Submit_date = models.DateTimeField(auto_now_add=True)
    Status = models.IntegerField(default=1, choices=STATUS_CHOICES)


