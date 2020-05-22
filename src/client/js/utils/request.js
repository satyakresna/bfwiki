export const requestUnits = async () => {
  const response = await fetch('https://raw.githubusercontent.com/satyakresna/bravefrontier/master/omniunits/data.json');
  const text = await response.text();
  return JSON.parse(text);
}