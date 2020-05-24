import page from "page";

export default function (ctx) {
  const formData = new FormData(document.querySelector('form'));
  if (document.getElementById('searchUnitName').value) {
    formData.append('name', document.getElementById('searchUnitName').value);  
  }
  if (document.getElementById('searchUnitElement').value) {
    formData.append('element', document.getElementById('searchUnitElement').value);
  }
  const queryString = new URLSearchParams(formData).toString();
  if (queryString) {
    page.show(`${window.location.pathname}?${queryString}`, ctx.state);
  } else {
    page.show(`${window.location.pathname}`, ctx.state);
  }
}