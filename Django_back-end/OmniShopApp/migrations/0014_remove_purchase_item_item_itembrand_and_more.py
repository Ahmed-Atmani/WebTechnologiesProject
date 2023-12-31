# Generated by Django 4.2.7 on 2023-12-14 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0013_account_user_alter_image_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchase',
            name='Item',
        ),
        migrations.AddField(
            model_name='item',
            name='ItemBrand',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='purchase',
            name='Delivery_time',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='purchase',
            name='Items',
            field=models.ManyToManyField(to='OmniShopApp.item'),
        ),
        migrations.AddField(
            model_name='purchase',
            name='Purchase_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='purchase',
            name='Shipping_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='purchase',
            name='Status',
            field=models.IntegerField(choices=[(1, 'Pending'), (2, 'Confirmed'), (3, 'Shipped'), (4, 'Delivered')], default=1),
        ),
    ]
