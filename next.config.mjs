/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add any other config options here
};

export default nextConfig;
