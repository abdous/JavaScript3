'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }
  // added per me
  let header= document.createElement('header');
    header.setAttribute("class", "header");
    root.appendChild(header);
      let p = document.createElement('p');
        let text =document.createTextNode("HYF Repositories");
        p.appendChild(text);
        header.appendChild(p);
      let select = document.createElement('select');
        select.setAttribute('class', "repo-selector");
        header.appendChild(select);
  let container = document.createElement('div');
      container.setAttribute('id','container');
      root.appendChild(container);
      let left = document.createElement('div');
          left.setAttribute('class', 'lef-div whiteframe');
          container.appendChild(left);
      let right = document.createElement('div');
          right.setAttribute('class', 'right-div whiteframe');
          container.appendChild(right);
// end of first add
      function createAndAppend(name, parent, options = {}) {
        const elem = document.createElement(name);
        select.appendChild(elem);
        Object.keys(options).forEach((key) => {
          const value = options[key];
          if (key === 'html') {
            elem.innerHTML = value;
          } else {
            elem.setAttribute(key, value);
          }
        });
    return elem;
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { html: err.message, class: 'alert-error' });
      } else {
        createAndAppend('option', root, { html: JSON.stringify(data, null, 2) });
      }
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
