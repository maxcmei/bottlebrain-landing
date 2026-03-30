from PIL import Image
import math
import os

input_dir = "public/frames"
output_dir = "public/frames-transparent"

# Clear old output
if os.path.exists(output_dir):
    for f in os.listdir(output_dir):
        os.remove(os.path.join(output_dir, f))
os.makedirs(output_dir, exist_ok=True)

# Pixels with brightness above HIGH become fully transparent
# Pixels with brightness below LOW stay fully opaque
# Pixels in between get partial transparency (smooth fade)
HIGH = 250  # above this = fully transparent
LOW = 220   # below this = fully opaque

for i in range(118):
    filename = f"frame_{i:03d}.jpg"
    input_path = os.path.join(input_dir, filename)
    output_path = os.path.join(output_dir, f"frame_{i:03d}.png")

    if not os.path.exists(input_path):
        print(f"Skipping {filename} — not found")
        continue

    img = Image.open(input_path).convert("RGBA")
    pixels = img.load()

    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            # Use the MINIMUM of R, G, B — only go transparent
            # if ALL channels are high (i.e. genuinely white/near-white)
            # This protects light pinks, tans, etc.
            min_val = min(r, g, b)
            
            if min_val >= HIGH:
                # Pure white zone — fully transparent
                pixels[x, y] = (r, g, b, 0)
            elif min_val >= LOW:
                # Transition zone — partial transparency (smooth edge)
                alpha = int(255 * (HIGH - min_val) / (HIGH - LOW))
                pixels[x, y] = (r, g, b, alpha)
            # else: keep fully opaque (min_val < LOW)

    img.save(output_path, "PNG", optimize=True)
    print(f"Converted {filename} → frame_{i:03d}.png")

print(f"\nDone! {len(os.listdir(output_dir))} frames in {output_dir}/")