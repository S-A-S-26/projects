import re
import os

filenames=os.listdir(r'E:\web win\cs50\project 1\wiki\entries')
print(filenames)

a=[]
for filename in filenames:
    print(filename) 
    if filename.endswith(".md"):
        a.append(re.sub(r"\.md$", "", filename))
print(a)