export const requestUnits = async (querystring = '') => {
  const URL = 'https://bravefrontier.satyakresna.io/api/omniunits';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const text = await response.text();
  return JSON.parse(text);
}

export const requestUnit = async (name) => {
  const URL = `https://bravefrontier.satyakresna.io/api/omniunits/${name}`;
  const response = await fetch(URL);
  const text = await response.text();
  return JSON.parse(text);
}