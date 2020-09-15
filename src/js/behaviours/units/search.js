import page from "page";

const formData = new FormData();

export default function () {
  document.getElementById('searchUnitName').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== "") {
        if (formData.has('name')) {
          formData.delete('name');
        }
        formData.append('name', e.target.value);  
      } else {
        formData.delete('name');
      }
      e.preventDefault();
      search(formData); 
    }
  });

  document.getElementById('searchUnitElement').onchange = (e) => {
    if (e.target.value !== "") {
      if (formData.has('element')) {
        formData.delete('element');
      }
      formData.append('element', e.target.value);
    } else {
      formData.delete('element');
    }
    e.preventDefault();
    search(formData);
  }
}

function search (formData) {
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