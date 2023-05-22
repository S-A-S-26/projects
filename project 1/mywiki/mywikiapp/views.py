from http.client import HTTPResponse
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from . import util
from .models import ImageEntry,textdata
from .forms import NewEntryform
from django.contrib import messages
from django.urls import reverse
from time import sleep
from markdown2 import markdown,markdown_path
import random



def Display_pages (request,name):

    try:
        conv_html=markdown(util.get_entry(name))
    except TypeError:
        return HttpResponseRedirect("/mywikiapp/",messages.error(request,"Page Not Found"))
    return render(request,f"mywikiapp/wikipages.html",{"pagecontent":conv_html,"title":name})

def create_new(request):    
    return render(request,"mywikiapp/create_new.html")

def Editpage(request,title):
    with open(rf"media/entries/{title}.md","r",encoding='utf-8') as f:
        conv_html=f.read()
    print(f"Editpage-title-->{title}")
    print(f"Editpage-conv_html-->{conv_html}")
    return render(request,"mywikiapp/edit_page.html",{"title":title,"pagecontent":conv_html})

def index (request):
    return render(request,"mywikiapp/index.html",{"entries":util.list_entries()})

def save (request):
    Title=request.POST.get('Title')
    print(f"title--.{Title}")
    Content=request.POST.get('content').encode("utf-8")            
    print(f"content--.{Content}")
    
    if Content and Title:
        newentry=textdata(Content=Content,Title=Title)
        try:
            newentry.save()
            util.save_entry(Title,Content)
            messages.success(request,"Saved Successfully!")

        except IntegrityError:
            messages.info(request,"Title already exists!")
    else:
        messages.error(request,"Title and Content cannot be empty")
    return HttpResponseRedirect(reverse("mywikiapp:create_new")) 

def add_images(request):
    image_from_form=NewEntryform
    return render(request,"mywikiapp/Add_images.html",{"formimg":image_from_form})

def save_image(request):
    if request.method == "POST":        
        print(f"request.post--->{request.POST}")       
        img=NewEntryform(request.POST,request.FILES)
        if img.is_valid():
            valid_img=request.FILES.getlist('Upload_Images')
            for i in valid_img:
                temp=ImageEntry(Upload_Images=i)
                print(temp)
                temp.save()
        else:
            print("Invalid data")
            return HttpResponse("Form data  Invalid please added data")
    return HttpResponseRedirect(reverse("mywikiapp:add_images"))


def Update_Text_Contents(request):
    if request.method == "POST":  
        Updated_Text=request.POST.get("Updated_Content").encode('utf-8')
        Title=request.POST.get("Title")
        print(request.POST)
        print(f"Updated-Text--->{Updated_Text}")
        print(f"Updated-Title--->{Title}")
        util.save_entry(Title,Updated_Text)        
    return HttpResponseRedirect("/mywikiapp/",messages.success(request,"Changes Saved"))


def Random(request):
    random_page=random.choice(util.list_entries())
    return HttpResponseRedirect(f"/mywikiapp/wikipages/{random_page}")

def Search(request):
    title=request.GET["q"]
    print(title)
    return HttpResponseRedirect(f"/mywikiapp/wikipages/{title}")

        