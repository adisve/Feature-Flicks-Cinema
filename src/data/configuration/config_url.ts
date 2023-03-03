export const request = (baseUrl: string, queryParams: Record<string, any>): string => {
  const urlParams = new URLSearchParams(queryParams);
  return `${baseUrl}?${urlParams}`;
}

/* Static URLs */

/* returns list of ticket types */
export const ticketTypes = '/api/ticketTypes';

/* returns list of movies */
export const movies = '/api/movies';

/* returns the logged in user if one exists. */
export const login = '/api/login';

/* get all records from a table or view. */
export const table = '/api/table';

/* write an id after the table name and /. to retrieve a record with a specific id. 
  (Works for those tables and views that have id column.) */
export const tableById = (id: number) => `/api/table/${id}`;