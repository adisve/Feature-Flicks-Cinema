
/**
 * This function checks whether or not the status code 
 * indicates a successful operation. If not, we throw an error.
 * @param response: HTTP response
 * @returns 
 */
export const checkStatus = (response: any) => {
  if (response.status >= 400) {
    throw new Error(`Request failed with status code ${response.status}`);
  }
  return response;
}
