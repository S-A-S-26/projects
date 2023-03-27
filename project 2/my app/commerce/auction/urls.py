from django.urls import path
from . import views

# app_name='auction'
urlpatterns=[
    path("",views.index,name='index'),
    path("login_user",views.login_view,name='log-in'),
    path("logout_user",views.logout_user,name='log-out'),
    path("register",views.register_view,name="register"),
    path("create_listing",views.create_listing,name="create_listing"),
    path("view/<str:ID>",views.list_details,name='view'),
    path("category/view/<str:ID>",views.list_details,name='category_view'),
    path("place_bid",views.place_bid,name='place_bid'),
    path("add_comment",views.add_comment,name='add_comment'),
    path('close_auction',views.close_bid,name='close_auction'),
    path('notification',views.notification,name='notification'),
    path('watchlist',views.watchlist,name='watchlist'),
    path('category/<str:name>',views.categories,name='selected_category'),
    path('category',views.categories,name='category'),
]