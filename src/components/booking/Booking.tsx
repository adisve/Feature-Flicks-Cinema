import React, { useEffect } from 'react';
import { Movie } from '../../domain/models/Movie';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningById } from '../../data/services/movie_service';
import { mapToMovie, mapToScreenings } from '../../data/utils/mapping_utils';
import '../../scss/Booking.scss'

interface ScreeningState {
  movie?: Movie;
}

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = React.useState<ScreeningState>({
    movie: undefined,
  });

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchMovieById(id), 
        fetchScreeningById(id)
      ])
        .then((responses) => {
          const movieDataArray: any = responses[0];
          const screeningsData = responses[1];
          const screenings = mapToScreenings(screeningsData);
          const movie = mapToMovie(movieDataArray[0], screenings);
          setState(prevState => ({ ...prevState, movie: movie }));
        })
        .catch(error => {
          console.error('Error fetching movie and screenings', error);
        });
    }
  }, [id]);

  return (
    <div className='booking'>
      <p>Booking page</p>
    </div>
  );
  
};
