
const URL = 'http://localhost:3000';

export async function makeRequest(method = "GET", params, body, headers) {
  const query = params.searchParam ? `?${params.searchParam.toString()}` : '';

  const res = await fetch(`${URL}/${params.path + query}`, {
    method,
    body,
  });
  return await res.json();
}