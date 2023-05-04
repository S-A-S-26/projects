import os
import shutil
import time

# print(os.getcwd())
# print(os.listdir())

#to the build folder
src=r'E:\web win\cs50\project 4\vite\vite-project\my'
#to the backend server folder where file needs to be placed
des=r'E:\web win\cs50\project 4\network\socialapp'



src=src.replace("\\","/")
des=des.replace("\\","/")

watch_path=src
watch_path2=f'{src}/static'

print (src)
print(des)


# os.remove('d1')

# this works /to copy template files from vites build dir
if os.path.exists(des + '/templates'):
    shutil.rmtree(des + '/templates')
shutil.copytree(src , des + '/templates/socialapp')
if os.path.exists(des + '/templates/socialapp/static'):
    shutil.rmtree(des + '/templates/socialapp/static')

#this is to copy static files
if os.path.exists(des + '/static'):
    shutil.rmtree(des + '/static')
shutil.copytree(src + '/static', des + '/static')






c1=0
c2=0

modified=os.path.getmtime(watch_path)
modified2=os.path.getmtime(watch_path2)


while True:
    try:
        time.sleep(2)
        if modified != os.path.getmtime(watch_path):
            # time.sleep(2)
            c1+=1
            print('folder1 modified-'+str(c1))
            modified=os.path.getmtime(watch_path)

            if os.path.exists(des + '/templates'):
                shutil.rmtree(des + '/templates')
            shutil.copytree(src , des + '/templates/socialapp')
            if os.path.exists(des + '/templates/socialapp/static'):
                shutil.rmtree(des + '/templates/socialapp/static')

        if modified2 != os.path.getmtime(watch_path2):
            # time.sleep(2)
            c2+=1
            print('folder2 modified-'+str(c2))
            modified2=os.path.getmtime(watch_path2)

            if os.path.exists(des + '/static'):
                shutil.rmtree(des + '/static')
            shutil.copytree(src + '/static', des + '/static')
    except Exception as e:
        print(e)
        time.sleep(5)
        continue