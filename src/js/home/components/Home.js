export default function () {
    return document.createRange().createContextualFragment(`
    <div class="flex flex-col justify-center items-center m-auto">
      <div id="banner" class="bg-indigo-600 w-full" style="margin-top: 80px;">
        <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span class="flex p-2 rounded-lg bg-indigo-800">
                <!-- Heroicon name: speakerphone -->
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p class="ml-3 font-medium text-white truncate">
                <span class="md:hidden">
                  BNC last episode!
                </span>
                <span class="hidden md:inline">
                  I will not update the content of site regarding of Brave News Channel last episode.
                </span>
              </p>
            </div>
            <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a href="https://www.youtube.com/watch?v=cMKAlUoSswE" target="_blank" rel="noopener" rel="noreferrer" class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                Learn more
              </a>
            </div>
            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button type="button" class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                <span class="sr-only">Dismiss</span>
                <!-- Heroicon name: x -->
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <article class="p-4 mt-16">
        <h1 class="text-3xl my-4"><strong>Brave Frontier Wiki (Unofficial)</strong></h1>
        <div class="leading-loose">
          <p>This website provides list of omni units and Dual Brave Burst (DBB) from Brave Frontier Global.</p>
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
          <li><a href="https://bravefrontierglobal.fandom.com/wiki/Brave_Frontier_Wiki" target="_blank" rel="noopener" class="underline text-blue-700">Brave Frontier Global Fandom</a></li>
        </ul>
      </article>
    </div>
  `);
}