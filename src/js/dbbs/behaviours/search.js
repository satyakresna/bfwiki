import page from "page";

const formData = new FormData();

export default function () {
  document.getElementById('searchOmniUnitName').addEventListener('keydown', (e) => {
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

  document.getElementById('searchElementalSynergy').onchange = (e) => {
    if (e.target.value !== "") {
      if (formData.has('esname')) {
        formData.delete('esname');
      }
      formData.append('esname', e.target.value);
    } else {
      formData.delete('esname');
    }
    e.preventDefault();
    search(formData);
  }

  document.getElementById('searchDbbKeywords').onchange = (e) => {
    var opts = [], opt, optValue;

    for (let i = 0; i < e.target.options.length; i++) {
      opt = e.target.options[i];
      optValue = opt.value;
      if (opt.selected) {
        opts.push(optValue);
      }
    }

    if (Array.isArray(opts) && opts.length > 0) {
      if (formData.has('keywords')) {
        formData.delete('keywords');
      }
      formData.append('keywords', encodeURIComponent(opts.join(",")));
    } else {
      formData.delete('keywords');
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
  if (window.previousOmniUnitsPage) {
    window.previousOmniUnitsPage = 0;
  }
}