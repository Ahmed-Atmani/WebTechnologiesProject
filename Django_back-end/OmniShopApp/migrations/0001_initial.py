# Generated by Django 4.2.6 on 2023-10-17 17:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('AccountId', models.AutoField(primary_key=True, serialize=False)),
                ('AccountFirstName', models.CharField(max_length=20)),
                ('AccountLastName', models.CharField(max_length=20)),
                ('AccountPicture', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('ItemId', models.AutoField(primary_key=True, serialize=False)),
                ('ItemName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('PurchaseId', models.AutoField(primary_key=True, serialize=False)),
                ('Account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='OmniShopApp.account')),
                ('Item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='OmniShopApp.items')),
            ],
        ),
    ]