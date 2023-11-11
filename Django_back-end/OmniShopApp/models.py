from django.db import models

# Create your models here.

class Item(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=100)


class Account(models.Model):
    AccountId = models.AutoField(primary_key=True)
    AccountFirstName = models.CharField(max_length=20)
    AccountLastName = models.CharField(max_length=20)
    AccountPicture = models.CharField(max_length=100)

class Purchase(models.Model):
    PurchaseId = models.AutoField(primary_key=True)
    Item = models.ForeignKey(Item, on_delete=models.CASCADE)
    Account = models.ForeignKey(Account, on_delete=models.CASCADE)

