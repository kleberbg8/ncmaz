import { GetServerSideProps } from 'next'
import { getServerSideSitemapLegacy } from 'next-sitemap'
import { gql } from '@apollo/client'
import { getApolloClient } from '@faustwp/core'

const client = getApolloClient()

const SITEMAP_QUERY = gql`
	query SitemapQuery($after: String) {
		contentNodes(
			where: { contentTypes: [POST, PAGE] }
			first: 50
			after: $after
		) {
			pageInfo {
				hasNextPage
				endCursor
			}
			nodes {
				uri
				modifiedGmt
			}
		}
	}
`

async function getAllWPContent(after = null, acc: any[] = []) {
	const { data } = await client.query({
		query: SITEMAP_QUERY,
		variables: {
			after,
		},
	})

	acc = [...acc, ...data.contentNodes.nodes]

	if (data.contentNodes.pageInfo.hasNextPage) {
		acc = await getAllWPContent(data.contentNodes.pageInfo.endCursor, acc)
	}

	return acc
}

// ✅ Função corrigida para formatar a data corretamente para ISO 8601
function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toISOString() // Converte para formato ISO 8601
}

// Sitemap component
export default function WPSitemap() {}

// Collect all the posts and pages
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const nodes = await getAllWPContent()

	// Define your WordPress base URL
	const BASE_URL = process.env.NEXT_PUBLIC_URL

	const allRoutes = nodes.reduce((acc, node) => {
		if (!node.uri) {
			return acc
		}

		// Prepend the BASE_URL to the `uri`
		acc.push({
			loc: `${BASE_URL}${node.uri}`, // Garante que a URL completa seja usada
			lastmod: node.modifiedGmt ? formatDate(node.modifiedGmt) : undefined, // ✅ Agora gera ISO 8601
			changefreq: 'daily', // Mantém frequência diária
			priority: 0.8, // Mantém prioridade 0.8
		})

		return acc
	}, [])

	return await getServerSideSitemapLegacy(ctx, allRoutes)
}
