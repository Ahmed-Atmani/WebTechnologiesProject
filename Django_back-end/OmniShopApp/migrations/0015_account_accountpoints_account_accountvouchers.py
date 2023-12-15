# Generated by Django 4.2.7 on 2023-12-15 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0014_remove_purchase_item_item_itembrand_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='AccountPoints',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='AccountVouchers',
            field=models.JSONField(default=[], help_text='list of integers'),
        ),
    ]