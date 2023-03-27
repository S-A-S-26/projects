from django import forms
from django.forms import ModelForm
from .models import *


class Auction_listings_form(ModelForm):
    class Meta:
        model = Auction_listings
        fields=['Title','Description','Category','Display_Image','Price']
        widgets={
            'Price':forms.NumberInput(attrs={'required':'True','Placeholder':'In-Rupees'}),
        }
        