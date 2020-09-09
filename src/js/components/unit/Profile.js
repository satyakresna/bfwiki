import SPRecommendation from "./SPRecommendation.js";
import Enhancements from "./Enhancements.js";

export default function (unit) {
  return document.createRange().createContextualFragment(`
  <article class="unit-profile">
    <img src="${unit.artwork}" alt="${unit.name}'s artwork" width="300" height="300" />    
    <div class="text-left">
      <h1 class="text-3xl"><strong>${unit.name}</strong></h1>
      <p class="text-sm">${unit.element}</p>
    </div>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-yellow-500" style="width: 150px;"><strong><em>Leader Skill</em></strong></h2>
      <h3 class="text-2xl mt-2 font-bold">${unit.skills[0].lsName}</h3>
      <p class="mt-2 leading-loose">${unit.skills[0].lsDesc}</p>
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-pink-500" style="width: 150px;"><strong><em>Extra Skill</em></strong></h2>
      <h3 class="text-2xl mt-2 font-bold">${unit.skills[1].esName}</h3>
      <p class="mt-2 leading-loose">${unit.skills[1].esDesc}</p>
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-blue-500" style="width: 150px;"><strong><em>Brave Burst</em></strong></h2>
      <h3 class="text-2xl mt-2 font-bold">${unit.skills[2].bbName}</h3>
      <p class="mt-2 leading-loose">${unit.skills[2].bbDesc}</p>
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-yellow-500" style="width: 250px;"><strong><em>Super Brave Burst</em></strong></h2>
      <h3 class="text-2xl mt-2 font-bold">${unit.skills[3].sbbName}</h3>
      <p class="mt-2 leading-loose">${unit.skills[3].sbbDesc}</p>
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-red-500" style="width: 250px;"><strong><em>Ultimate Brave Burst</em></strong></h2>
      <h3 class="text-2xl mt-2 font-bold">${unit.skills[4].ubbName}</h3>
      <p class="mt-2 leading-loose">${unit.skills[4].ubbDesc}</p>
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-green-600" style="width: 150px;"><strong><em>Enhancements</em></strong></h2>
      ${unit.hasOwnProperty('enhancements') ? Enhancements(unit.enhancements) : ''}
    </section>
    <section class="w-full my-8 border-solid border-4 border-yellow-500 p-4">
      <h2 class="text-lg -mt-8 bg-gray-100 uppercase text-blue-600" style="width: 200px;"><strong><em>Enhancements Recommendation</em></strong></h2>
      ${unit.hasOwnProperty('spRecommendation') ? SPRecommendation(unit.spRecommendation) : ''}
    </section>
  </article>
  <div class="flex flex-col items-end fixed z-1000" style="bottom: 24px; right: 24px;">
    <button type="button" id="shareBtn" class="relative rounded-full shadow border bg-gray-100 hover:bg-gray-100 text-gray-800 border-gray-400 p-4 mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-current w-5 h-5">
        <path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
      </svg>
    </button>
  </div>`);
}