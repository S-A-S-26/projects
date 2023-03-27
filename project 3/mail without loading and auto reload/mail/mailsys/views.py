from django.shortcuts import render,redirect,HttpResponseRedirect
from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate,login,logout
from .models import *
from django.urls import reverse
from django.contrib.auth.decorators import login_required
import json

# Create your views here.

@login_required(login_url='log-in')
def index(request):
    print('login')
    # return HttpResponse('Welcome to django its working')
    return render(request,'mailsys/inbox.html')


def register(request):
    if request.method=='POST':
        print('reg')
        print(request.POST)
        if request.POST['passwordReg']!=request.POST['confpassReg']:
            return render(request,'mailsys/register.html',{'message':'Password dosent match'})
        email=request.POST['emailReg']
        password=request.POST['passwordReg']
        try:
            user=User.objects.create_user(email,email,password)
            user.save()
            login(request,user)
            print('done')
        except:
            return render(request,'mailsys/register.html',{'message':'something went wrong'})
        return render(request,'mailsys/inbox.html')
        # return HttpResponseRedirect(reverse('index'))
    return render(request,'mailsys/register.html')


def login_view(request):
    if request.method=='POST':
        print(request.POST)
        print('req body')
        print(request.body)
        username=request.POST['emailReg']
        password=request.POST['passwordReg']
        user=authenticate(request,username=username,password=password)
        if user!=None:
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request,'mailsys/login.html',{'message':'invalid credentials'})
    return render(request,'mailsys/login.html')

def logout_(request):
    logout(request)
    return render(request,'mailsys/login.html')


# compose

def compose(request):
    if request.method == "POST":
        data=json.loads(request.body)
        print(data)
        recipiants=list(data['recipiants'].split(','))
        subject=data['subject']
        body=data['body']
        rawbody=data['rawbody']
        replied=data['replied']
        forward=data['forward']
        print(recipiants)
        print(subject)
        print(body)
        print(f'forward:{forward}')
        # from_ = request.POST['from']
        # print(from_)
        # recipiants=list(request.POST['recipiants'].split(','))
        # print(recipiants)
        print(request.body)
        # useremail=User.objects.values_list('email',flat=True)
        # print(useremail)
        # for i in recipiants:
        #     print(i)
        #     if i not in useremail:
        #         return JsonResponse({'status':f'not found {i}'}, status=200)

        users_involved=set()
        # Recipiants=[]

        for i in recipiants:
            try:
                user=User.objects.get(email=i)
                users_involved.add(user)
            except Exception as x:
                print(x)
                return JsonResponse({'status':f'not found {i}'}, status=200)  
        Recipiants=list(users_involved)
        users_involved.add(request.user)   
        print(f'users involved {users_involved}')  
        print(f'Recipiants {Recipiants}')
        for user in users_involved:
            email=Email(
                user=user,
                sender=request.user,
                subject=subject,
                body=body,
                read=user==request.user,
                rawbody=rawbody,
                replied=replied,
                forward=forward,
            )
            email.save()
            for recipiant in Recipiants:
                email.recipiants.add(recipiant)
                print(email.recipiants)
            email.save()
        return JsonResponse({"status": "Email Sent Sucessfully"}, status=200)
        return render(request,'mailsys/inbox.html')


def fetchMails(request,action):
    print('FetchMails')
    if action=="inbox":
        emails=request.user.emails_received.filter(user=request.user,recipiants=request.user,archived=False)
    elif action=='sent':
        # user=User.objects.get(id=request.user.id)
        # emails=request.user.emails_received.filter(user=user,sender=user,archived=False)
        emails=request.user.emails_sent.filter(archived=False,user=request.user)
        print(emails)
    elif action=='archive':
        emails=Email.objects.filter(user=request.user,archived=True)
    emails = emails.order_by("-timestamp").all()
    return JsonResponse([email.serialize() for email in emails],safe=False)


def updateMail(request,id):
    print("update "+id)
    try:
        email=Email.objects.get(user=request.user,id=id)
    except Exception as e:
        print(e)
    data=json.loads(request.body)
    print(data)
    if request.method=='PUT':
        if not email.read and data['property']=='read':
            print('updating read')
            email.read=data['state']
            email.save()
        elif not email.archived and data['property']=='archived':
            print('updating archive')
            email.archived=data['state']
            email.save()    
    return JsonResponse({"status":"updated sucessfully"})

