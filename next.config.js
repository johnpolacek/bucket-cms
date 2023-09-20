/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
}

module.exports = nextConfig
