// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["books.google.com", "m.media-amazon.com", "s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
