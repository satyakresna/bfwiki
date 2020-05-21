export default function (ctx) {
  if (navigator.share) {
    const title = document.title;
    const text = ctx.unit.name;
    const url = document.querySelector('link[rel=canonical]') && document.querySelector('link[rel=canonical]').href || window.location.href;
    navigator.share({
      title,
      text,
      url
    })
      .then(() => {
        console.log('Successful share');
      })
      .catch(error => {
        console.log('Error sharing', error);
      })
  } else {
    console.log('Not supported, sorry');
  }
}