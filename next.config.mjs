/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pzbvignsswqmjgadqmov.supabase.co',
        pathname: '/storage/v1/object/public/gatherly-avatar/**',
      }
    ]
  }
};

export default nextConfig;
