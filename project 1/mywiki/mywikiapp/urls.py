from django.urls import path,re_path
from . import views

app_name="mywikiapp"
urlpatterns=[
    path("",views.index,name="index"),
    path("wikipages/<str:name>",views.Display_pages,name="display_pages"),
    path("create_new/",views.create_new,name="create_new"),
    path("save",views.save,name="save"),
    path("add_images",views.add_images,name="add_images"),
    path("save_image",views.save_image,name="save_image"),
    path("wikipages/wikipageedit/<str:title>",views.Editpage,name="wikipageedit"),
    path("Save_text_changes",views.Update_Text_Contents,name="save_text_changes"),
    path("Random",views.Random,name="random"),
    # re_path(r'Search/(^\?q=.*)',views.Search,name="search"),
    path('Search/',views.Search,name="search"),
]