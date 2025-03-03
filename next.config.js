const { withFaust, getWpHostname } = require('@faustwp/core');
const { createSecureHeaders } = require('next-secure-headers');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    domains: ['app.ziao.com.br'], // Permite carregar imagens do WordPress
    unoptimized: true, // 🚀 Desativa globalmente a otimização de imagens do Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.ziao.com.br',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: getWpHostname() || 'app.ziao.com.br', // Garante que o domínio do WordPress está permitido
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '0.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '2.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configurações adicionais
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },

  // 🔐 Cabeçalhos de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ];
  },
});
