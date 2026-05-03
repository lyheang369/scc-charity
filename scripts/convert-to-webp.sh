#!/bin/bash

# Image optimization script - Convert images to WebP format
# This script converts JPEG, JPG, and PNG images to WebP format for better loading performance

# Set directory paths
IMG_DIR="public/img"
LOGOS_DIR="public/logos"

# Set quality for WebP conversion (0-100)
QUALITY=80

# Function to convert image to WebP
convert_to_webp() {
  local input_path="$1"
  local output_path="$2"

  if [ -f "$input_path" ]; then
    # Get original file size
    original_size=$(stat -f%z "$input_path")

    # Convert to WebP
    cwebp -q $QUALITY "$input_path" -o "$output_path"

    # Get new file size and calculate savings
    new_size=$(stat -f%z "$output_path")
    savings=$(( (original_size - new_size) * 100 / original_size ))

    echo "$(basename "$input_path") → $(basename "$output_path") ($(printf '%.1f' $savings)% smaller)"
  else
    echo "$(basename "$input_path") not found. Skipping..."
  fi
}

# Check if cwebp is available
if ! command -v cwebp &> /dev/null; then
  echo "Error: cwebp is not installed. Please install webp tools:"
  echo "  brew install webp"
  exit 1
fi

# Process images in img directory
if [ -d "$IMG_DIR" ]; then
  echo "Processing images in $IMG_DIR..."

  # Convert specific images in img directory
  images=(
    "$IMG_DIR/All_group_Members_image.JPEG" ".webp"
    "$IMG_DIR/event-poster.jpg" ".webp"
    "$IMG_DIR/khqr-donation.png" ".webp"
  )

  for ((i=0; i<${#images[@]}; i+=2)); do
    input_path="${images[i]}"
    extension="${images[i+1]}"
    output_path="${input_path%.*}$extension"
    convert_to_webp "$input_path" "$output_path"
  done
fi

# Process logos in logos directory
if [ -d "$LOGOS_DIR" ]; then
  echo "\nProcessing images in $LOGOS_DIR..."

  # Convert logos
  logos=(
    "$LOGOS_DIR/CamEd_Logo.png" ".webp"
  )

  for ((i=0; i<${#logos[@]}; i+=2)); do
    input_path="${logos[i]}"
    extension="${logos[i+1]}"
    output_path="${input_path%.*}$extension"
    convert_to_webp "$input_path" "$output_path"
  done
fi

echo "\nImage conversion complete!"
echo "WebP images are now available with preserved file names (only extension changed)."
echo "Original images remain for fallback support."
