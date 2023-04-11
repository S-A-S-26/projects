from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
from .models import *
from django.db import IntegrityError
import json
from django.contrib.auth import login,authenticate,logout
import os
from django.conf import settings


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
    # print(request.body)
    if request.method=='POST':
        # data=json.loads(request.body)
        print(request.POST)
        print(request.FILES)
        # print('request.username',request.user)
        user=request.user.UserProfile
        description=request.POST['description']
        post=Posts(user=user,description=description)
        post.save()
        if request.FILES:
            for i in request.FILES:
                print(request.FILES.get(i))
                postimages=PostImages(post=post,image=request.FILES.get(i))
                postimages.save()
 
        else:
            postimages=PostImages(post=post,image=None)
            postimages.save()
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
              print('yes to if')
              print(userprofile.profilepic.name)
              if userprofile.profilepic.name == '':
                print('working')
                userprofile.profilepic=file
              else:
                print(settings.MEDIA_ROOT)
                os.remove(os.path.join(settings.MEDIA_ROOT,userprofile.profilepic.name))
                userprofile.profilepic=file  
            userprofile.status=status
            userprofile.save()
   
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
    

def getPosts(request,type):
    try:    
        accountUserName=request.user.username
    except Exception as e:
        print('this is the error')
        print(e)
        accountUserName=''
    if type=='self':
        userprofile=request.user.UserProfile
        profilepic=userprofile.profilepic.name
        posts=userprofile.Posts.all()
        print(posts)
    elif type=='all':
        posts=Posts.objects.all().order_by('-timestamp_created')
    return JsonResponse([post.Serialize(accountUserName) for post in posts],safe=False)

def postUpdate(request):
    user=User.objects.get(id=request.user.id)
    if request.method=="PUT":
        data=json.loads(request.body)
        print(data)
        id=data.get('id')
        actionName=data.get('actionName')
        action=data.get('action')

        if actionName=='like':
            post=Posts.objects.get(id=id)
            if action=='like':
                post.likes.add(user)
            elif action=='dislike':
                post.likes.remove(user)

        if actionName=='follow':
            targetuser=User.objects.get(username=id)
            currentuserPf=UserProfile.objects.get(user=user)
            targetuserPf=UserProfile.objects.get(user=targetuser)
            if action=='follow':
                targetuserPf.followers.add(user)
                currentuserPf.following.add(targetuser)
            elif action=='unfollow':
                targetuserPf.followers.remove(user)
                currentuserPf.following.remove(targetuser)

        if actionName=='comment':
            userComment=data.get('comment')
            if action=='add':
                post=Posts.objects.get(id=id)
                comment=Comments(user=user,post=post,comment=userComment)
                comment.save()
            if action=='delete':
                comment=Comments.objects.get(id=id)
                comment.delete()

    if request.method=='POST':
        print(request.POST)                    
        print(request.FILES)
        id=request.POST.get('id')
        filesToDelete=request.POST.get('filesToDelete')
        description=request.POST.get('edited_description')
        print(description)
        post=Posts.objects.get(id=id)
        post.description=description
        post.save()

        if (filesToDelete):
            delImgList=list(filesToDelete.split(','))  
            print(delImgList)  
            for i in delImgList:
                print(i)
                image=PostImages.objects.get(image=i)
                print(image)
                image.delete()
                os.remove(os.path.join(settings.MEDIA_ROOT,i))
        if request.FILES:
            for i in request.FILES:
                print(request.FILES.get(i))
                postimages=PostImages(post=post,image=request.FILES.get(i))
                postimages.save()    
        
    return JsonResponse({"status":"Working"})

def getComments(request,id):
    print('getComments')
    print(id)
    user=User.objects.get(id=request.user.id)
    post=Posts.objects.get(id=id)
    return JsonResponse([comments.serialize(user.username) for comments in post.comments.all().order_by('-id')],safe=False)
    # return JsonResponse({"status":"Working"})