from django.shortcuts import redirect, render
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import Auction_listings_form
from django.views.generic import CreateView
from django.contrib.humanize.templatetags.humanize import intcomma

# Create your views here.



def index(request):
    listings=Auction_listings.objects.all().order_by('-id')
    return render(request,"auction/index.html",{"listing":listings})



def register_view(request):
    if request.method=='POST':
        Username=request.POST['username']
        Email=request.POST['email']
        Password=request.POST['password']
        Confirmation=request.POST['passwordconfirm']
        if Password!=Confirmation:
            return render(request,'auction/register.html',{'message':"Password Incorrect"})
        else:
            try:
                user=User.objects.create_user(Username,Email,Password)
                user.save()
            except IntegrityError:
                return render(request,'auction/register.html',{'message':"Username taken"}) 
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
            
    return render(request,'auction/register.html')

def login_view(request):
    print("inside login")
    if request.method=='POST':
        Username=request.POST['username']
        Password=request.POST['password']
        user=authenticate(request,username=Username,password=Password)
        print(Username)
        print(Password)
        print(user)
        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request,'auction/login.html',{'message':'Incorrect credentials'})
    return render(request,'auction/login.html')

def logout_user(request):
    logout(request)
    return HttpResponseRedirect (reverse('index'))

@login_required(login_url='log-in')
def create_listing(request):
    if request.method=="POST":
        form=Auction_listings_form(request.POST,request.FILES)
        if form.is_valid():
            print(form)
            instance=form.save(commit=False)
            instance.Posted_By=request.user
            instance.save()
        return redirect("index")
    return render(request,"auction/create_listings.html",{"form":Auction_listings_form})


def list_details(request,ID):
    item_detail=Auction_listings.objects.get(id=ID)
    if item_detail.bids.all().values_list('Current_Bid'):
        highest_bid=max(item_detail.bids.all().values_list('Current_Bid'))[0]
    else:
        highest_bid=None
    print(highest_bid)
    if request.user.is_authenticated:
        wclist=request.user.watchlist.all().values_list('List',flat=True)
    else:
        wclist=[]
    return render(request,'auction/list_details.html',{'item':item_detail,'highest_bid':highest_bid,'watchlist':wclist})

@login_required(login_url='log-in')
def place_bid(request):
    if request.method=='POST':        
        bid=request.POST['set_bid']        
        list_id=request.POST['id_bid']
        auction_list=Auction_listings.objects.get(id=list_id)   
        print(auction_list.bids.all().values_list('Current_Bid'))
        print(auction_list.bids.order_by().values_list('Current_Bid').values_list('Current_Bid'))
        if auction_list.bids.all().values_list('Current_Bid'):
            highest_bid=max(auction_list.bids.all().values_list('Current_Bid'))[0]
        else:
            highest_bid=None
        if int(bid)<auction_list.Price:
            return render(request,'auction/list_details.html',{'item':auction_list,'message_lower_th_price':'Bid should be greater than the price of this item','highest_bid':highest_bid})
        elif highest_bid is not None:
            if int(bid)<highest_bid:
                return render(request,'auction/list_details.html',{'item':auction_list,'message_lower_th_highest_bid':'Bid should be greater than those posted by other users. Highest bid -','highest_bid':highest_bid})
        bid_form=Bid(Current_Bid=bid,auc_list=auction_list,Bid_Added_By=request.user.username)
        bid_form.save()
        return HttpResponseRedirect(f'view/{list_id}')
        
@login_required(login_url='log-in')
def add_comment(request):
    if request.method=='POST':
        comment=request.POST['comment']
        list_id=request.POST['id_comment']
        auction_list=Auction_listings.objects.get(id=list_id)
        bid_form=Comments(Comment=comment,auc_list=auction_list,Comment_Added_By=request.user.username)
        bid_form.save()
        return HttpResponseRedirect(f'view/{list_id}')



def close_bid(request):
    if request.method=='POST':
        item_id=request.POST['id']
        seller_id=request.POST['selling_id']
        Highest_bid=request.POST['Highest_bid']
        print(f"HB---{Highest_bid}")
        print(Highest_bid)
        print(type(Highest_bid))
        print(Highest_bid is None)
        
        item=Auction_listings.objects.get(id=item_id)
        
        if Highest_bid != 'None':
            buyer=item.bids.filter(Current_Bid=Highest_bid,auc_list_id=item_id).values('Bid_Added_By','Current_Bid')
            print(f"{item.Posted_By.id}{type(item.Posted_By.id)}  ==  {seller_id}{type(seller_id)}")
            buyer_obj=User.objects.filter(username=buyer[0]['Bid_Added_By'])[0]

            winner_status=f"Congratulations! You have won the bidding for this item at {intcomma(Highest_bid)}"
            looser_status=f"The item you bid on was sold to {buyer_obj} @ {intcomma(Highest_bid)}"
            print(winner_status)
            print(looser_status)
            for i in set(item.bids.all().values_list('Bid_Added_By')):
                print(f"start-->{buyer_obj}")
                print(i)
                j=User.objects.filter(username=i[0])[0]
                print(j)
                if j != buyer_obj:
                    notification=Notifications(Title=item.Title,Description=item.Description,Price=item.Price,Display_Image=item.Display_Image,Notified_User=j,Status=looser_status)
                    notification.save()
                    print(f'done{i}')
                else:
                    notification=Notifications(Title=item.Title,Description=item.Description,Price=item.Price,Display_Image=item.Display_Image,Notified_User=buyer_obj,Status=winner_status)
                    notification.save()
                    print(f'cannot print {j} won')
        if item.Posted_By.id == int(seller_id):
            print("yes user is the owner of this post")
            item.delete()
    return redirect('index')
#         delete auction


def notification(request):
    list=request.user.notific.all()
    for i in list:
        print(i)
    return render(request,'auction/notifications.html',{'notifications':list})

@login_required(login_url='log-in')
def watchlist(request):
    if request.method=="POST": 
        print('in') 
        ID=request.POST['list_id_watchlist']
        item_object=Auction_listings.objects.get(id=ID)      

        if item_object.id in request.user.watchlist.all().values_list('List',flat=True):
            print(f'Remove {item_object}')
            del_watchlist=item_object.watchlist.filter(Watchlist_user=request.user.id)[0]
            print(del_watchlist)
            print(type(del_watchlist))
            del_watchlist.delete()
        else:
            print('Add')
            watch_list=Watchlist(List=item_object,Watchlist_user=request.user)
            watch_list.save()
        return redirect(f'view/{ID}')
    user_watchlist=request.user.watchlist.filter(Watchlist_user=request.user.id).values_list('List',flat=True)
    watchlist_item=[]
    for i in user_watchlist:
        if i is not None:
            watchlist_item.append(Auction_listings.objects.get(id=i))
        
    return render(request,'auction/watchlist.html',{'listing':watchlist_item})


def categories(request,name=None):
    if name is not None:
        category_list=Auction_listings.objects.filter(Category=name)
        return render(request,"auction/index.html",{"listing":category_list})
    return render(request,'auction/category.html')
