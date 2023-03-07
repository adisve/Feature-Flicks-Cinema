import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../../scss/booking/BookScreening.scss'
import { fetchMovieById, fetchScreeningById, fetchScreeningsByMovieId } from '../../../data/services/movie_service';
import { Screening } from '../../../domain/models/Screening';
import { Movie } from '../../../domain/models/Movie';
import { mapToMovie, mapToScreening } from '../../../data/utils/mapping_utils';
import { PageStatus } from '../../App';
import { Loading } from '../../animations/Loading';
import { ErrorMessage } from '../../errors/ErrorMessage';
import { TicketSelection } from './TicketSelection';
import { MovieScreeningInformation } from './MovieScreeningInformation';

interface BookScreeningState {
  screening?: Screening
  movie?: Movie
  pageStatus: PageStatus
}

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<BookScreeningState>({
    screening: undefined,
    movie: undefined,
    pageStatus: PageStatus.LOADING
  });

  const setScreening = (screeningData: any) => {
    setState((prevState) => ({ ...prevState, screening: mapToScreening(screeningData) }));
  };

  // Call to movie service to retrieve screening
  // Should return array with one item, so we take [0]
  useEffect(() => {
    if (id) {
      fetchScreeningById(id)
        .then(screeningData => {
          setScreening(screeningData[0]);
        })
        .catch(err => {
          console.log(err);
          setState((prevState) => ({...prevState, pageStatus: PageStatus.ERROR }));
        });
    }
  }, [id]);
  
  // Only called if state.screening has changed,
  // then movieId should be available
  useEffect(() => {
    if (state.screening) {
      fetchMovieById(state.screening.movieId.toString())
        .then(movieData => {
          console.log(movieData);
          setState((prevState) => ({...prevState, movie: mapToMovie(movieData[0])}));
          setState((prevState) => ({...prevState, pageStatus: PageStatus.SUCCESS }));
        })
        .catch(err => {
          console.log(err);
          setState((prevState) => ({...prevState, pageStatus: PageStatus.ERROR }));
        });
    }
  }, [state.screening]);
  

  if (state.pageStatus === PageStatus.LOADING) {
    return <Loading />
  }
  
  if (state.pageStatus === PageStatus.ERROR) {
    return <ErrorMessage />
  }

  return (
    <div>
        {/* Ticket selection (amount), movie information/screening information */}
        <div className='booking-header d-flex'>

          { /* Choose number of tickets (regular, child, senior) */ }
          <TicketSelection />

          { /* Movie information (name, hall name, time/day/date) 
            and amount of tickets and total price */ }
          <MovieScreeningInformation movie={state.movie!} screening={state.screening!}/>
        </div>
        {/* Choose seats (grid) */}
    </div>
  )
}