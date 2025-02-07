import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await res.revalidate('/');
    return res.json({ revalidated: true });
  } catch (err: any) {
    console.error('Erro ao revalidar:', err);
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}
