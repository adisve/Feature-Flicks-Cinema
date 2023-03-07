import React, { useEffect } from 'react';
import { Movie } from '../../domain/models/Movie';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningsByMovieId } from '../../data/services/movie_service';
import { mapToMovie, mapToScreenings } from '../../data/utils/mapping_utils';
import '../../scss/booking/Booking.scss';
import { AuditoriumName, BookingDateContainer } from './BookingDateContainer';
import { PageStatus } from '../App';
import { groupScreeningsByAuditorium } from '../../data/utils/list_utils';
import { Loading } from '../animations/Loading';
import { ErrorMessage } from '../errors/ErrorMessage';

interface ScreeningState {
  movie?: Movie;
  pageStatus: PageStatus;
}

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = React.useState<ScreeningState>({
    movie: undefined,
    pageStatus: PageStatus.LOADING,
  });

  useEffect(() => {
    setState(prevState => ({...prevState, pageStatus: PageStatus.LOADING }));
    if (id) {
      Promise.all([
        fetchMovieById(id), 
        fetchScreeningsByMovieId(id)
      ])
        .then((responses) => {
          const movieDataArray: any = responses[0];
          const screeningsData = responses[1];
          const screenings = mapToScreenings(screeningsData);
          const movie = mapToMovie(movieDataArray[0], screenings);
          setState(prevState => ({ ...prevState, movie: movie }));
          setState(prevState => ({...prevState, pageStatus: PageStatus.SUCCESS }));
        })
        .catch(error => {
          console.error('Error fetching movie and screenings', error);
          setState(prevState => ({...prevState, pageStatus: PageStatus.ERROR }));
        });
    }
  }, [id]);

  if (state.pageStatus === PageStatus.LOADING) {
    return <Loading />
  }

  if (state.pageStatus === PageStatus.ERROR) {
    return <ErrorMessage />
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
                <BookingDateContainer key={screening.id} movie={state.movie!} screening={screening} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
