export const requestOmniUnits = async (querystring = '') => {
  const URL = 'https://bravefrontier.satyakresna.io/api/v1/omniunits';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}

export const requestOmniUnit = async (name) => {
  const URL = `https://bravefrontier.satyakresna.io/api/v1/omniunits/${name}`;
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export const requestDbbs = async (querystring = '') => {
  const URL = 'https://bravefrontier.satyakresna.io/api/v1/dbbs';
  const response = await fetch(`${URL}${querystring ? `?${querystring}` : ''}`);
  const json = await response.json();
  return json;
}