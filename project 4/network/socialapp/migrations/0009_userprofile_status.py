# Generated by Django 4.1.1 on 2023-03-31 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialapp', '0008_posts_user_alter_posts_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
