from django.db import models

# Create your models here.

class Items(models.Model):
    ItemId = models.AutoField(primary_key=True)
    ItemName = models.CharField(max_length=100)


class Accounts(models.Model):
    AccountId = models.AutoField(primary_key=True)
    AccountFirstName = models.CharField(max_length=20)
    AccountLastName = models.CharField(max_length=20)
    AccountPicture = models.CharField(max_length=100)

class Purchases(models.Model):
    PurchaseId = models.AutoField(primary_key=True)
    Item = models.ForeignKey(Items, on_delete=models.CASCADE)
    Account = models.ForeignKey(Accounts, on_delete=models.CASCADE)
