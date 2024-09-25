/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: [
        'firebasestorage.googleapis.com',
        'example.com',  // Add more domains as needed
        'another-example.com',
        // Add other domains here
      ],
    },
  };
  

export default nextConfig;
