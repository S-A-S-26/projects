# Generated by Django 4.1.1 on 2022-09-26 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mywikiapp', '0005_alter_newentry_upload_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Upload_Images', models.FileField(blank=True, null=True, upload_to='images/')),
            ],
        ),
        migrations.DeleteModel(
            name='NewEntry',
        ),
    ]