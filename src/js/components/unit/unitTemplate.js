import renderSPRecommendation from "./renderSPRecommendation.js";

export default function unitTemplate(unit) {
  return `
  <article class="flex flex-col items-center m-auto w-full md:w-1/2 p-4 bg-white my-8">
    <img src="${unit.artwork}" alt="${unit.name}'s artwork" width="300" height="300" />
    <h1>${unit.name}</h1>
    <p>${unit.gender}</p>
    ${unit.hasOwnProperty('spRecommendation') ? renderSPRecommendation(unit.spRecommendation) : ''}
  </article>`
}