import { GetServerSideProps } from "next";

const GRAPHQL_API_URL = "https://app.ziao.com.br/graphql"; // URL do backend WordPress
const SITE_URL = "https://www.jornaldoestado.com.br"; // URL do frontend
const SITE_NAME = "Jornal do Estado"; // Nome do portal
const LANGUAGE = "pt"; // Idioma do site

const fetchRecentArticles = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const formattedDate = twoDaysAgo.toISOString(); // Exemplo: "2025-02-02T00:00:00Z"

  const query = `
    query {
      posts(where: {dateQuery: {after: "${formattedDate}"}}) {
        edges {
          node {
            id
            title
            date
            slug
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar artigos: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data.posts.edges.map((edge: any) => edge.node);
};

const generateNewsSitemap = (posts: any[]) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

  posts.forEach((post) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/${post.slug}</loc>\n`; // URL correta agora!
    xml += `    <news:news>\n`;
    xml += `      <news:publication>\n`;
    xml += `        <news:name>${SITE_NAME}</news:name>\n`;
    xml += `        <news:language>${LANGUAGE}</news:language>\n`;
    xml += `      </news:publication>\n`;
    xml += `      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>\n`;
    xml += `      <news:title><![CDATA[${post.title}]]></news:title>\n`;
    xml += `    </news:news>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

// 🚀 Next.js getServerSideProps para gerar o XML dinamicamente
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const recentPosts = await fetchRecentArticles();
    const sitemap = generateNewsSitemap(recentPosts);

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Erro ao gerar sitemap:", error);
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
