export const requestUnits = async () => {
  const response = await fetch('https://raw.githubusercontent.com/satyakresna/scraping-bravefrontier/master/data/omniunits.json');
  const text = await response.text();
  return JSON.parse(text);
}