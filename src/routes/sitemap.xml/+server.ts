// Define your site's base URL
const BASE_URL = 'https://theidest.com';

// Add all your site's routes here
const routes = [
	{
		path: '',
		lastmod: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
		changefreq: 'monthly',
		priority: '1.0'
	}
	// Add more routes as your site grows
	// { path: 'about', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.8' },
	// { path: 'projects', lastmod: '2025-05-01', changefreq: 'monthly', priority: '0.8' },
];

export async function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
		<loc>${BASE_URL}/${route.path}</loc>
		<lastmod>${route.lastmod}</lastmod>
		<changefreq>${route.changefreq}</changefreq>
		<priority>${route.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
