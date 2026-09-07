/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Servimos WebP ya optimizado desde /public/art. Next genera además
    // los tamaños responsive por breakpoint.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2400],
    // Con el optimizador activo, todo host remoto debe declararse.
    // Aquí vive todavía el vídeo/hero subido a Vercel Blob.
    remotePatterns: [
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
    ],
  },
}

export default nextConfig
