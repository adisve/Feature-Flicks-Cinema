export const checkStatus = (response: any) => {
  if (response.status >= 400) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response;
}
