import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log('🔄 Iniciando revalidação...');
    
    // Revalidar a página inicial e a página de posts
    await res.revalidate('/');
    await res.revalidate('/posts'); // Se houver uma página específica de posts

    console.log('✅ Revalidação concluída.');
    
    return res.json({ revalidated: true });
  } catch (err: any) {
    console.error('❌ Erro ao revalidar:', err);
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}
