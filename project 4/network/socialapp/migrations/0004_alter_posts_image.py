# Generated by Django 4.1.1 on 2023-03-29 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialapp', '0003_alter_posts_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='posts/'),
        ),
    ]
