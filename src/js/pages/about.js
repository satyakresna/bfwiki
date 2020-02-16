import { closeMenu } from "../utils/utils.js";

export function about() {
  closeMenu();
  document.querySelector('main').textContent = '';
  const $about = document.createRange().createContextualFragment(`
    <article class="my-8 m-auto">
      <h1 class="text-3xl mb-4"><strong>About</strong></h1>
      <p class="mb-4">This website likes a wiki to compile list of omni units and their SP. 
      <br>
      The data source taken from <a href="https://github.com/satyakresna/scraping-bravefrontier" target="_blank" class="underline text-blue-700">scraping Brave Frontier Global Fandom site</a>.
      <br>
      The source code of this website is open. Please visit to <a href="https://github.com/satyakresna/bfwiki" target="_blank" class="underline text-blue-700">bfwiki's Github repository</a>.
      </p>
      <h2 class="text-2xl mb-4"><strong>Courtesy</strong></h2>
      <ul>
        <li>Brave Frontier</li>
        <li>Brave Frontier Global Fandom</li>
      </ul>
    </article>
  `)
  document.querySelector('main').appendChild($about);
}