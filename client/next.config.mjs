/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", 
      },
    ];
  },

  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
