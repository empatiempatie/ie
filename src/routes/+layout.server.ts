export const prerender = 'auto';

export function load({ url }) {
    const isEvidenceOrConspire = url.pathname.includes('/conspire') || url.pathname !== '/';
    return {
        backgroundColor: isEvidenceOrConspire ? '#fafafa' : '#e35b52'
    };
}
