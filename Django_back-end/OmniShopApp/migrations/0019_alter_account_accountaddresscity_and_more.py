# Generated by Django 4.2.7 on 2023-12-18 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0018_account_wishlist_alter_account_following'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='AccountAddressCity',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountAddressCountry',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountAddressStreet',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountEmail',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountFirstName',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountLastName',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='account',
            name='AccountPassword',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='address',
            name='AddressCity',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='address',
            name='AddressCountry',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='address',
            name='AddressStreet',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='item',
            name='ItemName',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='itemcategory',
            name='ItemCategoryName',
            field=models.CharField(max_length=100),
        ),
    ]
