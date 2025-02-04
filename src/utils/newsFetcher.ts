interface Article {
  slug: string;
  title: string;
  publishedAt: string;
}

export async function getLatestNews(): Promise<Article[]> {
  const WP_URL = process.env.WORDPRESS_API_URL as string; // Variável de ambiente
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50`);
  const data = await response.json();

  // Filtra os artigos publicados nos últimos 2 dias
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  return data
    .filter((post: any) => new Date(post.date) >= twoDaysAgo)
    .map((post: any) => ({
      slug: post.slug,
      title: post.title.rendered,
      publishedAt: new Date(post.date).toISOString(), // Formato ISO 8601
    }));
}
