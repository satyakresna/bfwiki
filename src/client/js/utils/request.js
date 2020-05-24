export const requestUnits = async (querystring = '') => {
  const URL = 'https://bravefrontier.satyakresna.io/api/omniunits';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}

export const requestUnit = async (name) => {
  const URL = `https://bravefrontier.satyakresna.io/api/omniunits/${name}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}