// Utility function to convert YouTube URLs to embed URLs
export function convertToEmbedUrl(urlString) {
    try {
        if (urlString.includes("youtu.be/")) {
            const videoIdMatch = urlString.match(/(?:youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            }
        }

        const url = new URL(urlString);
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
            const videoId = url.searchParams.get('v');
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }

        const pathParts = url.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart.length === 11) return `https://www.youtube.com/embed/${lastPart}`;

        return null;
    } catch {
        return null;
    }
}
