import os
from PIL import Image, ImageDraw

def process_image(filepath):
    try:
        with Image.open(filepath) as img:
            img = img.convert('RGB')
            width, height = img.size
            draw = ImageDraw.Draw(img)
            
            # The background in the top-left of certificates is usually white or very light.
            # We sample a pixel near the top-left but slightly inset to avoid the very edge (which might be a border).
            # e.g., x = width * 0.15, y = height * 0.05
            sample_color = img.getpixel((int(width * 0.15), int(height * 0.05)))
            
            # Draw a rectangle covering the top-left corner (e.g., width: 35%, height: 18%)
            rect_w = int(width * 0.35)
            rect_h = int(height * 0.18)
            
            # If the image has a thin border we want to preserve, we could start the rectangle at x=5, y=5.
            # For simplicity, drawing from (0,0) is usually fine. Let's start from (2,2) to preserve any outermost 1px border.
            draw.rectangle([2, 2, rect_w, rect_h], fill=sample_color)
            
            img.save(filepath)
            print(f"Successfully removed watermark from {os.path.basename(filepath)}")
    except Exception as e:
        print(f"Error processing {os.path.basename(filepath)}: {e}")

certs_dir = r"c:\Users\ARJUN DUBEY\OneDrive\Desktop\port\public\certificates"
for filename in os.listdir(certs_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        process_image(os.path.join(certs_dir, filename))
