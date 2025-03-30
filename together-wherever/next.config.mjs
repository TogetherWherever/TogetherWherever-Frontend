/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'letsenhance.io', 
      'd3h1lg3ksw6i6b.cloudfront.net',
      'plus.unsplash.com',
      'ik.imgkit.net',
      'lh3.googleusercontent.com',
      'wallpapercat.com',
      'lh5.googleusercontent.com',
      'dynamic-media-cdn.tripadvisor.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
