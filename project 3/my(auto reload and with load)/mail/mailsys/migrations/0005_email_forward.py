# Generated by Django 4.1.1 on 2023-03-15 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailsys', '0004_email_replied'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='forward',
            field=models.BooleanField(default=False),
        ),
    ]