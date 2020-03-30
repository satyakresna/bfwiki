import page from "../../plugins/page.mjs";

export default function searchUnits(ctx) {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    search(ctx);
  });

  document.getElementById('searchUnitElement').onchange = (e) => {
    e.preventDefault();
    search(ctx);
  }
}

function search(ctx) {
  const formData = new FormData(document.querySelector('form'));
  if (document.getElementById('searchUnitName').value !== '') {
    formData.append('unitname', document.getElementById('searchUnitName').value);  
  }
  if (document.getElementById('searchUnitElement').value !== '') {
    formData.append('unitelement', document.getElementById('searchUnitElement').value);
  }
  const queryString = new URLSearchParams(formData).toString();
  if (queryString !== '') {
    page.show(`${window.location.pathname}?${queryString}`, ctx.state);
  } else {
    page.show(`${window.location.pathname}`, ctx.state);
  }
}