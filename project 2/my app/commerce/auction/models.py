from random import choices
from tkinter import CASCADE
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.forms import CharField, ImageField
import PIL

# Create your models here.
class User(AbstractUser):
    pass
    

class Auction_listings(models.Model):
    Title=models.CharField(blank=False,max_length=24)
    Description=models.TextField(blank=False,max_length=500,null=True)
    Category=models.CharField(choices=(("Toys","Toys"),
                                    ("Electronics","Electronics"),
                                    ("Fashion","Fashion"),
                                    ("Household","Household"),                             
                                    ("Entertainment","Entertainment"),
                                    ("Automobiles","Automobiles"),
                                    ("Collectibles","Collectibles"),
                                    ("Clothing & accessories","Clothing & accessories"),
                                    ("Others","Others")),
                                    max_length=100,blank=True
                            )
    Display_Image=models.ImageField(blank=True,null=True)
    Price=models.BigIntegerField(null=True)
    Posted_By=models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_name",null=True)



    def __str__(self):
        return f"{self.Title}"

class Bid(models.Model):
    Current_Bid=models.BigIntegerField(blank=True)
    auc_list=models.ForeignKey(Auction_listings,on_delete=models.CASCADE,null=True,related_name='bids')
    Bid_Added_By=models.CharField(max_length=64,null=True)
    def __str__(self):
        return f"{self.auc_list.id} & {self.auc_list.Title}"


class Comments(models.Model):
    Comment=models.TextField()
    auc_list=models.ForeignKey(Auction_listings,on_delete=models.CASCADE,null=True,related_name='comments')
    Comment_Added_By=models.CharField(max_length=64,null=True)
    def __str__(self):
        return f"{self.auc_list.id} & {self.auc_list.Title}"


class Notifications(models.Model):
    Title=models.CharField(blank=False,max_length=24)
    Description=models.TextField(blank=False,max_length=500,null=True)
    Price=models.BigIntegerField(null=True)
    Display_Image=models.TextField(null=True)
    Notified_User=models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='notific')
    Status=models.TextField(null=True)

    def __str__(self):
        return f"{self.Title}"


class Watchlist(models.Model):
    List=models.ForeignKey(Auction_listings,on_delete=models.SET_NULL,null=True,related_name='watchlist')
    Watchlist_user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='watchlist')
    
    def __str__(self):
        return f"{self.List} & {self.Watchlist_user}"