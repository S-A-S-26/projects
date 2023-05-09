from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import activate
from django.conf import settings
from django.utils import timezone
import pytz

activate(settings.TIME_ZONE)

# Create your models here.

class User(AbstractUser):
    pass


class Email(models.Model):
    user=models.ForeignKey('User',on_delete=models.CASCADE,related_name='emails')
    sender=models.ForeignKey('User',on_delete=models.PROTECT,related_name='emails_sent')
    recipiants=models.ManyToManyField('User',related_name='emails_received')
    subject=models.CharField(max_length=255)
    body=models.TextField(blank=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    read=models.BooleanField(default=False)
    archived=models.BooleanField(default=False)
    rawbody=models.TextField(blank=True,default='')
    replied=models.BooleanField(default=False)
    forward=models.BooleanField(default=False)



    def serialize(self):

        return {
            "id" :self.id,
            "sender": self.sender.email,
            "recipiants":[user.email for user in self.recipiants.all()],
            "subject":self.subject,
            "body":self.body,
            # "timestamp":self.timestamp.strftime("%b %d %Y,%I:%M %p"),
            # "timestamp": self.timestamp.strftime(r"%x %X %p UTC"),
            "timestamp": self.timestamp.strftime(r"%x %I:%M:%S %p UTC"),
            "read":self.read,
            "archived":self.archived,
            "rawbody":self.rawbody,
            "replied":self.replied,
            "forward":self.forward,
        }


    def __str__(self):
        x=str(self.recipiants.values_list('username',flat=True))[11:-2]
        return f'from = {self.sender.username} /to = {x} /  sub : {self.subject}'