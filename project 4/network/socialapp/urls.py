from django.urls import path,re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("" ,views.index ,name='index'),
    path("getCSRF",views.getCsrf,name='getCSRF'),
    path("login_user",views.login_user,name='login_user'),
    path("register_user",views.register,name='register_user'),
    path("logout_user",views.logout_user,name='logout_user'),
    path("newpost",views.newPost,name='newpost'),
    path('update_profile',views.updateProfile,name='update_profile'),
    path('getPosts/<str:type>/<str:pageno>',views.getPosts,name='getPosts'),
    path('updatePost',views.postUpdate,name='updatePost'),
    path('getComments/<str:id>',views.getComments,name='getComments'),
    path('getProfile/<str:type>',views.getProfile,name='getProfile'),
    path('getOtherProfile/<str:type>',views.getOtherProfile,name='getOtherProfile'),
    path('getfollowing',views.getfollowing,name='getfollowing'),
    
    

    re_path(r'^.*',views.Redirect_to_home,name='redirect_home'),
]

# urlpatterns +=[re_path(r'^.*',TemplateView.as_view(template_name='socialapp/index.html'))]