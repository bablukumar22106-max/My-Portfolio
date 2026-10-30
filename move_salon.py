import os
import shutil

src_items = [
    r"D:\portfolio\scalp-beauty-salon-website-master",
    r"D:\portfolio\scalp-beauty-salon-website-master.zip",
    r"D:\portfolio\Javed Style Luxury Salon Logo.png"
]

dest_dir = r"D:\salon"
os.makedirs(dest_dir, exist_ok=True)

for item in src_items:
    if os.path.exists(item):
        dest = os.path.join(dest_dir, os.path.basename(item))
        print(f"Moving {item} -> {dest}")
        if os.path.exists(dest):
            if os.path.isdir(dest):
                shutil.rmtree(dest)
            else:
                os.remove(dest)
        shutil.move(item, dest)

print("Done moving salon files!")
