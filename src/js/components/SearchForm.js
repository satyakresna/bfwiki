export default function () {
  return document.createRange().createContextualFragment(`
  <form method="GET" class="w-3/4 mx-auto py-2 my-4">
  <div class="relative mb-4">
    <span>
      <input class="focus:outline-0 bg-transparent border-b border-gray-500 focus:border-green-500 placeholder-gray-600 py-2 pr-4 pl-10 w-full appearance-none leading-normal" type="text" placeholder="Search the unit" id="searchUnitName">
    </span>
    <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
      <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
    </div>
  </div>
  <div class="relative">
    <select id="searchUnitElement" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      <option value="">Element</option>
      <option value="Fire">Fire</option>
      <option value="Water">Water</option>
      <option value="Earth">Earth</option>
      <option value="Thunder">Thunder</option>
      <option value="Light">Light</option>
      <option value="Dark">Dark</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</form>
  `);
}