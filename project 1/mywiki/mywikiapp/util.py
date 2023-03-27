import re
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage




def list_entries():
    _,filenames=default_storage.listdir("entries")
    return list(sorted(re.sub(r"\.md$","",filename)for filename in filenames if filename.endswith(".md")))

def save_entry(title,content):
    filename=f"entries/{title}.md"
    print(f"util.title--.{title}")
    print(f"util.content--.{content}")
    if default_storage.exists(filename):
        default_storage.delete(filename)
    default_storage.save(filename,ContentFile(content))


def get_entry(title):
    """
    Retrieves an encyclopedia entry by its title. If no such
    entry exists, the function returns None.
    """
    try:
        f = default_storage.open(f"entries/{title}.md")
        return f.read().decode("utf-8")
    except FileNotFoundError:
        return None