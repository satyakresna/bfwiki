import page from "page";

export default function () {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    search();
  });

  document.getElementById('searchUnitElement').onchange = (e) => {
    e.preventDefault();
    search();
  }
}

function search () {
  const formData = new FormData(document.querySelector('form'));
  if (document.getElementById('searchUnitName').value) {
    formData.append('name', document.getElementById('searchUnitName').value);  
  }
  if (document.getElementById('searchUnitElement').value) {
    formData.append('element', document.getElementById('searchUnitElement').value);
  }
  const queryString = new URLSearchParams(formData).toString();
  if (queryString) {
    page.show(`${window.location.pathname}?${queryString}`);
  } else {
    page.show(`${window.location.pathname}`);
  }
  // Set previous page position Y to 0 when searching
  if (window.previousPage) {
    window.previousPage = 0;
  }
}