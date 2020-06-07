export default function (params) {
    document.querySelector('meta[property="og:title"]').setAttribute('content', params.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', params.description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', params.image);
    document.querySelector('meta[property="og:url"]').setAttribute('content', params.url);
}