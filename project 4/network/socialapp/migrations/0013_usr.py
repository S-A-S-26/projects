# Generated by Django 4.1.1 on 2023-04-18 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialapp', '0012_comments'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
            ],
        ),
    ]
