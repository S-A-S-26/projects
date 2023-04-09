# Generated by Django 4.1.1 on 2023-04-03 09:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('socialapp', '0009_userprofile_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='UserProfile', to=settings.AUTH_USER_MODEL),
        ),
    ]
