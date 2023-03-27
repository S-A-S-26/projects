# Generated by Django 4.1.1 on 2022-10-05 01:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0002_remove_auction_listings_posted_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='auction_listings',
            name='Posted_By',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_name', to=settings.AUTH_USER_MODEL),
        ),
    ]
