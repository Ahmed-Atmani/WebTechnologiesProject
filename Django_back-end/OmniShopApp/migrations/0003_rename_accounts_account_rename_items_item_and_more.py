# Generated by Django 4.2.6 on 2023-11-11 21:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0002_rename_account_accounts_rename_purchase_purchases'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Accounts',
            new_name='Account',
        ),
        migrations.RenameModel(
            old_name='Items',
            new_name='Item',
        ),
        migrations.RenameModel(
            old_name='Purchases',
            new_name='Purchase',
        ),
    ]
