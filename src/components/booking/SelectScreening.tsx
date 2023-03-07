import React, { useEffect } from 'react';
import { Movie } from '../../domain/models/Movie';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningsByMovieId } from '../../data/services/movie_service';
import { mapToMovie, mapToScreenings } from '../../data/utils/mapping_utils';
import '../../scss/booking/SelectScreening.scss';
import { AuditoriumName, ScreeningDateContainer } from './ScreeningDateContainer';
import { PageStatus } from '../App';
import { groupScreeningsByAuditorium } from '../../data/utils/list_utils';
import { Loading } from '../animations/Loading';
import { ErrorMessage } from '../errors/ErrorMessage';

interface SelectScreeningState {
  movie?: Movie;
  pageStatus: PageStatus;
}

export const SelectScreening = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = React.useState<SelectScreeningState>({
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
    <div className='select-screening'>
      <div className='list-container'>
        <div className="header">
          <img draggable="false" src={`/assets${state.movie?.posterImage}`} alt={state.movie?.title} />
          <div>
            <h2>{state.movie?.title}</h2>
            <div className='movie-categories'>
              {state.movie?.categories.map((category, index) => {
                return (<p key={index.toString()} className='movie-category'>#{category}</p>
                );
              })}
            </div>
          </div>
        </div>
        {state.movie && state.movie.screenings && groupScreeningsByAuditorium(state.movie.screenings).map((screenings, index) => (
          <div className='header-list' key={index}>
            <div className='auditorium-header'>
              <h3>{AuditoriumName[index]}</h3>
            </div>
            <ul>
              {screenings.map(screening => (
                <ScreeningDateContainer key={screening.id} movie={state.movie!} screening={screening} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
