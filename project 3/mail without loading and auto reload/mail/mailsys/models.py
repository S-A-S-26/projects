from django.db import models
from django.contrib.auth.models import AbstractUser

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
            "timestamp":self.timestamp.strftime("%b %d %Y,%I:%M %p"),
            "read":self.read,
            "archived":self.archived,
            "rawbody":self.rawbody,
            "replied":self.replied,
            "forward":self.forward,
        }
    def __str__(self):
        x=str(self.recipiants.values_list('username',flat=True))[11:-2]
        return f'from = {self.sender.username} /to = {x} /  sub : {self.subject}'