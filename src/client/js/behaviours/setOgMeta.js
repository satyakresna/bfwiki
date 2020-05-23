export default function (ctx) {
    let artwork = ctx.state.unit.artwork;
    artwork = artwork.substring(0, artwork.indexOf('/revision/latest?cb'));
    document.querySelector('meta[property="og:title"]').setAttribute('content', `${ctx.title}`);
    document.querySelector('meta[property="og:description"]').setAttribute('content', `SP recommendation for ${ctx.state.unit.name}`);
    document.querySelector('meta[property="og:image"]').setAttribute('content', `${artwork}`);
}