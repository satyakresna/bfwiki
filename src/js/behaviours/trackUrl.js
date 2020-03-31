export default function(ctx) {
  if (window.ga !== undefined) {
    ga('set', {
      page: ctx.canonicalPath,
      title: document.title
    });
    ga('send', 'pageview');
  }
}