export default function () {
    return document.createRange().createContextualFragment(`
    <div class="flex flex-col justify-center items-center m-auto">
      <article class="p-4 mt-16">
        <h1 class="text-3xl my-4"><strong>Brave Frontier Wiki (Unofficial)</strong></h1>
        <div class="leading-loose">
          <p>This website provides list of omni units and dbbs from Brave Frontier Global.</p>
          <p>The data take from <a href="https://github.com/satyakresna/bravefrontier" target="_blank" rel="noopener" class="underline text-blue-700">unofficial Brave Frontier API that created by myself</a>.</p>
          <p>The source code of this website is available by visit to <a href="https://github.com/satyakresna/bfwiki" target="_blank" rel="noopener" class="underline text-blue-700">github.com/satyakresna/bfwiki</a>.</p>
        </div>
        <h2 class="text-2xl my-4"><strong>Feedback</strong></h2>
        <div class="leading-loose">
          <p>If you have any feedback about feature(s) on this website please submit form in <a href="https://github.com/satyakresna/bfwiki/issues" target="_blank" rel="noopener" class="underline text-blue-700">github.com/satyakresna/bfwiki/issues</a></p>
        </div>
        <h2 class="text-2xl my-4"><strong>Join me</strong></h2>
        <div class="leading-loose">
          <p>Join me on Brave Frontier game. My player ID is 5420823754.</p>
          <img src="../../assets/images/kresna-player-id.jpg" alt="Kresna player ID" />
        </div>
        <h2 class="text-2xl my-4"><strong>Courtesy</strong></h2>
        <ul class="leading-loose">
          <li>Brave Frontier</li>
          <li>Brave Frontier Global Fandom</li>
        </ul>
      </article>
    </div>
  `);
}