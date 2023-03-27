from http.client import HTTPResponse
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse
from . import util
from .models import ImageEntry,textdata
from .forms import NewEntryform
from django.contrib import messages


# Create your views here.

# def index (request):
#     return HttpResponse("hello,world")

def greet (request,name):
    return HttpResponse(f"hello,{name}")

def create_new(request):
    # return render(request,"mywikiapp/create_new.html")
    image_from_form=NewEntryform
    return render(request,"mywikiapp/create_new.html",{"formimg":image_from_form})

def index (request):
    return render(request,"mywikiapp/index.html",{"entries":util.list_entries()})

def save (request):
    if request.method == "POST":        
        print(request.POST)       
        img=NewEntryform(request.POST,request.FILES)
        print(img.errors)
        print(img.errors.as_data())
        if img.is_valid():
            img.save()
            valid_img=request.FILES.getlist('Upload_Images')
            print(valid_img)
            for i in valid_img:
                temp=ImageEntry(Upload_Images=i)
                print(temp)
                temp.save()
        else:
            print("Invalid data")



    Title=request.POST.get('Title')
    Content=request.POST.get('content')            
    newentry=textdata(Content=Content,Title=Title)
    
    try:
        newentry.save()
        messages.success(request,"Saved Successfully!")
    except IntegrityError:
        messages.info(request,"Title already exists!")

    return render(request,"mywikiapp/create_new.html")  

def add_images(request):
    image_from_form=NewEntryform
    return render(request,"mywikiapp/add_images.html",{"formimg":image_from_form})

def save_image(request):
    if request.method == "POST":        
        print(request.POST)       
        img=NewEntryform(request.POST,request.FILES)
        print(img.errors)
        print(img.errors.as_data())
        if img.is_valid():
            img.save()
            valid_img=request.FILES.getlist('Upload_Images')
            print(valid_img)
            for i in valid_img:
                temp=ImageEntry(Upload_Images=i)
                print(temp)
                temp.save()
        else:
            print("Invalid data")
    # return render(request,"mywikiapp/add_images.html")
    return HttpResponse("done")