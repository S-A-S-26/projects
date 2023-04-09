from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class UserProfile(models.Model):
    user=models.OneToOneField('User',on_delete=models.CASCADE,related_name='UserProfile')
    followers=models.ManyToManyField('User',related_name='followers')
    following=models.ManyToManyField('User',related_name='following')
    profilepic=models.FileField(null=True,upload_to='profilepic/')
    status=models.CharField(null=True,blank=True,max_length=255)

    def Serialize(self,status):
        return {
            "id":self.id,
            "username":self.user.username,
            "followers":[user.username for user in self.followers.all()],
            "following":[user.username for user in self.following.all()],
            "profilepic":self.profilepic.name,
            "status":self.status,
            "profile_user":status,
        }
    
    def __str__(self):
        return self.user.username


class Posts(models.Model):
    user=models.ForeignKey('UserProfile',null=True,on_delete=models.CASCADE,related_name='Posts')
    timestamp_created=models.DateTimeField(auto_now_add=True)
    timestamp_updated=models.DateTimeField(auto_now=True)
    description=models.CharField(max_length=255)
    image=models.FileField(blank=True,null=True,upload_to='posts/')
    likes=models.ManyToManyField('User',related_name='likedPosts')