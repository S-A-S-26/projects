# Generated by Django 4.1.1 on 2023-03-29 02:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('socialapp', '0004_alter_posts_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='user',
        ),
    ]
