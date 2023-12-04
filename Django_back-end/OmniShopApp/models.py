from django.db import models


# Create your models here.

class Item(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=100)

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


class Purchase(models.Model):
    PurchaseId = models.AutoField(primary_key=True)
    Item = models.ForeignKey(Item, on_delete=models.CASCADE)
    Account = models.ForeignKey(Account, on_delete=models.CASCADE)


STATUS_CHOICES = (
    (1, 'Not Started'),
    (2, 'In Progress'),
    (3, 'Closed'),
)


class Complaint(models.Model):
    ComplaintId = models.AutoField(primary_key=True)
    Account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='complaints')
    Item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True)
    Description = models.TextField()
    Submit_date = models.DateTimeField(auto_now_add=True)
    Status = models.IntegerField(default=0, choices=STATUS_CHOICES)


