/** @type {import('next-sitemap').IConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_URL // Certifique-se de definir isso no .env

module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	exclude: [
		'/submission',
		'/dashboard/posts/published',
		'/dashboard/posts/draft',
		'/dashboard/posts/pending',
		'/dashboard/posts/trash',
		'/dashboard/posts/schedule',
		'/dashboard/edit-profile/general',
		'/dashboard/edit-profile/profile',
		'/dashboard/edit-profile/password',
		'/dashboard/edit-profile/socials',
		'/ncmaz_for_ncmazfc_preview_blocks',
		'/preview',
		'/reset-password',
		'/readinglist',
		'/dashboard',
		'/dashboard/edit-profile',
		'/dashboard/posts',
		'/wordpress-sitemap.xml', // Exclui o sitemap gerado pelo WordPress
	],
	robotsTxtOptions: {
		additionalSitemaps: [`${SITE_URL}/wordpress-sitemap.xml`],
	},
	transform: async (config, path) => {
		// Gerar data no formato correto ISO 8601
		const currentDate = new Date().toISOString()

		// Definir caminhos de baixa prioridade
		const lowPriorityPaths = ['/contact', '/login', '/sign-up']
		const isLowPriority = lowPriorityPaths.includes(path.replace(/\/$/, '')) // Remove barra final antes de verificar
		const isHomePage = path === '/'

		// Ajustar frequência de atualização
		let changefreq = 'daily' // Padrão: diário
		if (isHomePage) {
			changefreq = 'always' // Home atualiza sempre
		} else if (isLowPriority) {
			changefreq = 'monthly' // Baixa prioridade = atualização mensal
		}

		// Ajustar prioridades corretamente
		let priority = 1.0 // Prioridade padrão
		if (path === '/contact') priority = 0.3 // Contato pode ser mais relevante
		if (isLowPriority) priority = 0.1 // Login e Sign-up não são muito importantes

		console.log('Transformando:', path, {
			priority,
			changefreq,
			lastmod: currentDate,
		})

		return {
			loc: `${SITE_URL}${path}`,
			lastmod: currentDate, // Agora no formato ISO 8601
			priority: priority,
			changefreq: changefreq,
		}
	},
}
