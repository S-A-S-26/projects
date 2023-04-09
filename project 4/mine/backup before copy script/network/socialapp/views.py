from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
from .models import *
from django.db import IntegrityError
import json
from django.contrib.auth import login,authenticate,logout
import os


# Create your views here.
def index(request):
    # return HttpResponse('hello')
    return render(request,'socialapp/index.html')
    # return JsonResponse({"res":"hello"})

def Redirect_to_home(request):
    return HttpResponseRedirect('/socialapp/')

@ensure_csrf_cookie
def getCsrf(request):
    print('getCsrf')
    return JsonResponse({'sucess':'set cookie'})

def register(request):
    if request.method=="POST":
        data=json.loads(request.body)
        username=data['Reg_username']
        password=data['Reg_password']
        print(username,password)
        confirm_password=data['Reg_confpassword']

        if password!=confirm_password:
            return JsonResponse({"Error":"Password dosent match"})

        try:
            user=User.objects.create_user(username=username,password=password)
            user.save()
            userprofile=UserProfile(user=user)
            userprofile.save()
        except IntegrityError:
            return JsonResponse({"message":"username already taken"})
        login(request,user)
        return JsonResponse({"sucess":"logged in sucessfully and registerd"})

# @ensure_csrf_cookie
# @csrf_exempt
def login_user(request):
    print('login')
    if request.method=='POST':
        data=json.loads(request.body)
        username=data['log_username']
        password=data['log_password']
        # username=request.POST['log_username']
        # password=request.POST['log_password']
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
        else:
            return JsonResponse({"error":"invalid credentials"})
        return JsonResponse({"sucess":"logged in sucessfully"})
    return render(request,'socialapp/login.html')
def logout_user(request):
    logout(request)
    return JsonResponse({"sucess":"logged out"})


def newPost(request):
    if request.method=='POST':
        # data=json.loads(request.body)
        print(request.POST)
        print(request.FILES)
        print('request.username',request.user)
        user=User.objects.get(username=request.user.username)
        description=request.POST['post_description']
        if request.FILES:
            image=request.FILES['post_image']
        else:
            image=None
        # print(data)
        # description=data['post_description']
        # image=data['image'] 
        post=Posts(user=user,description=description,image=image)
        post.save()
    return JsonResponse({"sucess":"post added"})

# @csrf_exempt
def updateProfile(request):
    print('updateProfile')
    user=User.objects.get(username=request.user.username)
    if request.method == 'POST':
 
        print(request.user)
        print(request.user.username)
        # print(request.body)
        print(request.FILES)
        print(request.POST)
        status=request.POST.get('user_status')
        file=request.FILES.get('profile_pic')
        fileUploadStatus=request.POST.get('fileUploadedStatus')
        print('update profile')
        try:
            userprofile=request.user.UserProfile
            print('up')
            print(status)
            print(file)
            print(fileUploadStatus)
            if fileUploadStatus == 'yes':
              os.remove(userprofile.profilepic.name  
            # userprofile.profilepic=file
            # userprofile.status=status
            # userprofile.save()
            # userprofile=UserProfile(user=user,status=status,profilepic=file)
            # userprofile.save()
        except Exception as e:
            print(e)
            return JsonResponse({"status":"Failed"})

        return JsonResponse({"status":"Working"})
    else:
        status=False
        if user==request.user:
            status=True
        profile=user.UserProfile
        return JsonResponse(profile.Serialize(status),safe=False)