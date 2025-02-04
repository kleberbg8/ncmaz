interface Article {
  slug: string;
  title: string;
  publishedAt: string;
}

export async function getLatestNews(): Promise<Article[]> {
  const WP_URL = 'https://app.ziao.com.br/wp-json/wp/v2/posts?per_page=50'; // URL do backend WordPress

  try {
    const response = await fetch(WP_URL);

    if (!response.ok) {
      throw new Error(`Erro na API do WordPress: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados brutos da API:', data); // Para depuração

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const filteredArticles = data.filter((post: any) => new Date(post.date) >= twoDaysAgo);
    console.log('Artigos filtrados:', filteredArticles); // Para depuração

    return filteredArticles.map((post: any) => ({
      slug: post.slug,
      title: post.title?.rendered || 'Sem título',
      publishedAt: new Date(post.date).toISOString(), // Formato ISO 8601
    }));
  } catch (error) {
    console.error('Erro ao buscar notícias:', error.message);
    throw error;
  }
}
