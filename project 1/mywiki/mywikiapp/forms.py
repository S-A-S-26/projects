from django import forms
from django.forms import ModelForm
from .models import ImageEntry

class NewEntryform(ModelForm):
    Upload_Images=forms.ImageField(widget=forms.ClearableFileInput(attrs={"multiple":True}),)
    
    class Meta:
        model =ImageEntry
        fields=('Upload_Images',)