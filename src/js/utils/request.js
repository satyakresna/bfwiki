export const requestUnits = async () => {
  const response = await fetch('https://raw.githubusercontent.com/satyakresna/scraping-bravefrontier/master/data/omni-units.json');
  const json = await response.json();
  return json;
}