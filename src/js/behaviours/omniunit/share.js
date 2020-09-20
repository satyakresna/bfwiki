import { Notyf } from 'notyf';

export default function (unit) {
  const title = document.title;
  const text = unit.name;
  const url = document.querySelector('link[rel=canonical]') && document.querySelector('link[rel=canonical]').href || window.location.href;
  if (navigator.share) {
    navigator.share({
      title,
      text,
      url
    })
      .then(() => {
        const notyf = new Notyf({
          position: {
            x: 'center',
            y: 'bottom'
          }
        });
        notyf.success('Share url success');
      })
      .catch(error => {
        const notyf = new Notyf({
          position: {
            x: 'center',
            y: 'bottom'
          }
        });
        notyf.error('Share url failed');
      })
  } else {
    navigator.clipboard.writeText(`${title} ${url}`)
      .then(() => {
        const notyf = new Notyf({
          position: {
            x: 'center',
            y: 'bottom'
          }
        });
        notyf.success('Copy url success');
      })
      .catch(err => {
        const notyf = new Notyf({
          position: {
            x: 'center',
            y: 'bottom'
          }
        });
        notyf.error('Copy url failed');
      })
  }
}