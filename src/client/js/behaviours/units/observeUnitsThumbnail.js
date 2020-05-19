export default function () {
  const $images = document.querySelectorAll('[data-src]');
  const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
  };

  let imageObserver = new IntersectionObserver(function (entries, self) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const src = entry.target.getAttribute('data-src');
        if (!src) { return; }
        entry.target.src = src;
        self.unobserve(entry.target);
      }
    });
  }, config);

  $images.forEach(image => {
    imageObserver.observe(image);
  });
}