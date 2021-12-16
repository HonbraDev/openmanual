/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  redirects: [
    {
      source: "/",
      destination: "/o-projektu",
      permanent: true,
    },
  ],
};
