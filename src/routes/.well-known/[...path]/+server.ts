import { error } from '@sveltejs/kit';

// Chrome DevTools workaround
// fallback for the /.well-known/ directory
export async function GET() {
	error(404, 'Not Found');
}