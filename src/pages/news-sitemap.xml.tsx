import { GetServerSideProps } from 'next';

interface Article {
  slug: string;
  title: string;
  publishedAt: string;
}

const getLatestNews = async (): Promise<Article[]> => {
  const WP_URL = process.env.WORDPRESS_API_URL as string;
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50`);
  const data = await response.json();

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  return data
    .filter((post: any) => new Date(post.date) >= twoDaysAgo)
    .map((post: any) => ({
      slug: post.slug,
      title: post.title.rendered,
      publishedAt: new Date(post.date).toISOString(),
    }));
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const SITE_URL = process.env.NEXT_PUBLIC_URL as string;
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

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null; // Este componente nunca será renderizado
}
