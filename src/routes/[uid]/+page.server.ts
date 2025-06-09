import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	try {
		const page = await client.getByUID('evidence', params.uid);
		return { page };
	} catch (prismic_error) {
		error(404, 'Evidence not found');
	}
}

export async function entries() {
	const client = createClient();
	const pages = await client.getAllByType('evidence');
	return pages.map((page) => {
		return { uid: page.uid };
	});
}
