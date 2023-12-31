# Generated by Django 4.2.7 on 2023-12-12 21:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('OmniShopApp', '0011_alter_review_item_alter_review_reviewer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('ImageId', models.AutoField(primary_key=True, serialize=False)),
                ('Image', models.ImageField(upload_to='media/')),
                ('Item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='OmniShopApp.item')),
            ],
        ),
    ]
