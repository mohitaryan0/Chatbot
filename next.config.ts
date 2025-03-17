/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //appDir: true, // Ensure this is enabled
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
