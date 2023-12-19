# Generated by Django 4.2.7 on 2023-12-19 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0019_alter_account_accountaddresscity_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='PurchaseCity',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='PurchaseCountry',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='PurchasePostalCode',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='PurchaseStreet',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='PurchaseStreetNumber',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='CustomDrawing',
            field=models.TextField(null=True),
        ),
    ]
