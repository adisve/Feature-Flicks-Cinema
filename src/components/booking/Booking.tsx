import React, { useEffect } from 'react';
import { Movie } from '../../domain/models/Movie';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningById } from '../../data/services/movie_service';
import { mapToMovie, mapToScreenings } from '../../data/utils/mapping_utils';
import '../../scss/Booking.scss';
import { AuditoriumName, BookingDateContainer } from './BookingDateContainer';
import { pageState } from '../App';
import { groupScreeningsByAuditorium } from '../../data/utils/list_utils';
import { Loading } from '../home/Loading';

interface ScreeningState {
  movie?: Movie;
  pageStatus: pageState;
}

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = React.useState<ScreeningState>({
    movie: undefined,
    pageStatus: pageState.LOADING,
  });

  useEffect(() => {
    setState(prevState => ({...prevState, pageStatus: pageState.LOADING }));
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
          setState(prevState => ({...prevState, pageStatus: pageState.SUCCESS }));
        })
        .catch(error => {
          console.error('Error fetching movie and screenings', error);
        });
    }
  }, [id]);

  if (state.pageStatus === pageState.LOADING) {
    return <div className='text-center'><Loading /></div>
  }

  return (
    <div className='booking'>
      <div className='booking-list-container'>
        <div className="booking-header">
          <img draggable="false" src={`/assets${state.movie?.posterImage}`} alt={state.movie?.title} />
          <div>
          <h2>{state.movie?.title}</h2>
          <div className='booking-movie-categories'>
            {state.movie?.categories.map((category, index) => {
              return (<p key={index.toString()} className='booking-movie-category'>#{category}</p>
              );
            })}
          </div>
          </div>
        </div>
        {state.movie && state.movie.screenings && groupScreeningsByAuditorium(state.movie.screenings).map((screenings, index) => (
          <div className='booking-header-list' key={index}>
            <div className='booking-auditorium-header'>
              <h3>{AuditoriumName[index]}</h3>
            </div>
            <ul>
              {screenings.map(screening => (
                <BookingDateContainer key={screening.id} screening={screening} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
