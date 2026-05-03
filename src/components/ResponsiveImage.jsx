import React from 'react';

/**
 * ResponsiveImage - A component that provides WebP images with PNG/JPG/GIF fallbacks
 * for maximum browser support and performance.
 *
 * This component uses the picture element with source tags for WebP and img for fallback,
 * ensuring modern browsers get the smaller, faster-loading WebP format while all browsers
 * maintain full compatibility.
 */
export default function ResponsiveImage({
  webpSrc,
  fallbackSrc,
  alt,
  loading = 'lazy',
  className = '',
  ...props
}) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        className={className}
        {...props}
      />
    </picture>
  );
}