# Generated by Django 4.1.1 on 2022-10-09 13:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auction', '0007_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='notified_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL),
        ),
    ]
