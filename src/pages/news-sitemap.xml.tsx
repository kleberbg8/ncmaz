import { GetServerSideProps } from 'next';
import { getLatestNews } from '../utils/newsFetcher'; // Importação do fetcher

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const SITE_URL = process.env.NEXT_PUBLIC_URL as string;

  try {
    const articles = await getLatestNews();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${articles
        .map((article) => {
          return `
        <url>
          <loc>${SITE_URL}/posts/${article.slug}</loc>
          <news:news>
            <news:publication>
              <news:name>Jornal do Estado</news:name>
              <news:language>pt</news:language>
            </news:publication>
            <news:publication_date>${article.publishedAt}</news:publication_date>
            <news:title>${article.title}</news:title>
          </news:news>
        </url>`;
        })
        .join('')}
    </urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Erro ao gerar o sitemap do Google News:', error);
    res.statusCode = 500;
    res.end('Erro ao gerar o sitemap do Google News.');
  }

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null; // Este componente nunca será renderizado
}
