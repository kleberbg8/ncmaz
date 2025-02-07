export default async function handler(req, res) {
	if (req.query.secret !== process.env.REVALIDATE_SECRET) {
	  return res.status(401).json({ message: 'Unauthorized' });
	}
  
	try {
	  // Revalidar a página inicials
	  await res.revalidate('/');
	  return res.json({ revalidated: true });
	} catch (err) {
	  return res.status(500).json({ message: 'Error revalidating' });
	}
  }
  