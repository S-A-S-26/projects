from django.db import models

# Create your models here.

class ImageEntry(models.Model):
    Upload_Images=models.FileField(blank=True,null=True,upload_to='images/')
    

class textdata(models.Model):
    Title=models.CharField(max_length=200,unique=True)
    Content=models.TextField()

    def __str__(self):
        return f"{self.Title}"