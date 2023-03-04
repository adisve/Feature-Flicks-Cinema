import axios from 'axios'

type MiddlewareFn = (response: any) => any;

/**
 * Example usage:
 * get('https://example.com/data.json', [checkStatus])
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
 * @param url 
 * @param middleware 
 * @returns request promise
 */
export const get = (url: string, middleware?: MiddlewareFn[]) => {
  let request = axios.get(url, {
    withCredentials: true
  });
  if (middleware && middleware.length > 0) {
    middleware.forEach(fn => {
      request = request.then(fn);
    });
  }
  return request;
}
