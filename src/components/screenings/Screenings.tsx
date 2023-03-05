import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { get, createRequestURL } from '../../data/axios/network_manager';
import {  moviesURL, screeningsURL, } from '../../data/configuration/config_url';
import { mapToMovies } from '../../data/utils/mapping_utils';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import '../../scss/Screenings.scss';
import { ScreeningItem } from './ScreeningItem';

/**
 * Component that renders the screenings list.
 * On each render, it fetches the list of screenings from the API.
 * @returns: a list of screenings
 */
export const Screenings = () => {

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  return (
    <div className='screenings'>
        <ListGroup variant='flush'>
          {
            movies.length > 0 ? (
              movies.map((movie) => {
                return <ScreeningItem key={movie.id} movie={movie} />
              })
            ) : <Loading />
          }
        </ListGroup>
      </div>
  );


  function fetchDataAndUpdateState() {
    Promise.all([
      get(createRequestURL(moviesURL, { sort: "title" })),
      get(screeningsURL),
    ])
      .then((responses) => {
        const moviesData = responses[0].data;
        const screeningsData = responses[1].data;

        const movies: Movie[] = mapToMovies(moviesData);
        const screeningsDict: { [id: number]: Date[] } = {};

        screeningsData.forEach((screening: any) => {
          const movieId = screening.movieId;
          if (!screeningsDict[movieId]) {
            screeningsDict[movieId] = [];
          }
          screeningsDict[movieId].push(new Date(screening.time));
        });

        movies.forEach((movie) => {
          if (screeningsDict[movie.id]) {
            movie.screenings = screeningsDict[movie.id];
          } else {
            movie.screenings = [];
          }
        });
        // Sort movies based on the first screening date
        movies.sort((a, b) => a.screenings[0].getTime() - b.screenings[0].getTime());
        setMovies(movies);
      })
      .catch((error) => console.error(error));
    }

}