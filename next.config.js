const { withFaust, getWpHostname } = require('@faustwp/core');
const { createSecureHeaders } = require('next-secure-headers');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },

  // 🔹 Configuração para permitir imagens do WordPress
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.ziao.com.br', // 🔹 WordPress Headless CMS
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: getWpHostname() || 'app.ziao.com.br', // 🔹 Garante que o domínio do WordPress está permitido
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
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 || '1.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 🔹 Headers de segurança para proteger a aplicação
  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders({
          xssProtection: false,
          frameGuard: ['allow-from', { uri: process.env.NEXT_PUBLIC_WORDPRESS_URL }],
        }),
      },
      // 🔹 Configuração para garantir que o Sitemap XML seja servido corretamente
      {
        source: "/sitemap-news.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // 🔹 Configuração de idiomas
  i18n: {
    locales: ['en', 'pt-br'], // Idiomas disponíveis
    defaultLocale: 'pt-br',   // Idioma padrão
  },
});
