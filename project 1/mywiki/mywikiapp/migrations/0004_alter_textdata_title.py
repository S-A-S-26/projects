# Generated by Django 4.1.1 on 2022-09-26 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mywikiapp', '0003_textdata_remove_newentry_content_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='textdata',
            name='Title',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
