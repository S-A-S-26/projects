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
    likes=models.ManyToManyField('User',related_name='likedPosts')

    def Serialize(self,accountUserName,pageno,type):
        return {
            "id":self.id,
            "username":self.user.user.username,
            "timestamp_created":self.timestamp_created.strftime(r"%x %I:%M:%S %p UTC"),
            "timestamp_updated":self.timestamp_updated.strftime(r"%x %I:%M:%S %p UTC"),
            "description":self.description,
            "like":[likes.username for likes in self.likes.all()],
            # "post_images":[self.images.all().values_list('image',flat=True)],
            "post_images":[images.image.name for images in self.images.all()],
            "profilepic":self.user.profilepic.name,
            "followers":[followers.username for followers in self.user.followers.all()],
            "accountUserName":accountUserName,
            "comments":len(self.comments.all()),
            "page":pageno,
            "type":type
            }
    def __str__(self):
        return f'{self.user} {self.id}'


class Comments(models.Model):
    post=models.ForeignKey('Posts',null=False,on_delete=models.CASCADE,related_name='comments')
    comment=models.CharField(max_length=500)
    user=models.ForeignKey('User',on_delete=models.CASCADE,related_name='comments')

    def serialize(self,accountUser):
        return {
            "id":self.id,
            "username":self.user.username,
            "comment":self.comment,
            "profilepic":self.user.UserProfile.profilepic.name,
            "accountUser":accountUser,
            "postid":self.post.id,

        } 

    def __str__(self):
        return f'{self.user} {self.post.id}'

class PostImages(models.Model):
    post=models.ForeignKey('Posts',null=True,on_delete=models.CASCADE,related_name='images')
    image=models.FileField(blank=True,null=True,upload_to='posts/')

    def __str__(self):
        return f'{self.post.user} {self.post.id}'
    
