from django.urls import path
from . import views


urlpatterns=[
    path('',views.index,name='index'),
    path('login',views.login_view,name='log-in'),
    path('register',views.register,name='register'),
    path('logout',views.logout_,name='logout'),

    path('compose',views.compose,name='compose'),
    path('<str:action>',views.fetchMails,name='fetch'),
    path('updateMail/<str:id>',views.updateMail,name='updateMail'),
]
