import React from 'react';
import { useParams } from 'react-router-dom';
import { PageStatus } from '../App';
import { groupScreeningsByAuditorium } from '../../data/utils/list_utils';
import { Loading } from '../animations/Loading';
import { ErrorMessage } from '../errors/ErrorMessage';
import { ScreeningDateContainer, AuditoriumName } from './ScreeningDateContainer';
import { useSelectScreening } from '../../data/hooks/useSelectScreening';
import '../../scss/booking/SelectScreening.scss'

export const SelectScreening = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useSelectScreening(id);

  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }

  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />;
  }

  return (
    <div className='select-screening'>
      <div className='list-container'>
        <div className="header">
          <img draggable="false" src={`/assets${state.movie?.posterImage}`} alt={state.movie?.title} />
          <div>
            <h2>{state.movie?.title}</h2>
            <div className='movie-categories'>
              {state.movie?.categories.map((category, index) => (
                <p key={index.toString()} className='movie-category'>#{category}</p>
              ))}
            </div>
          </div>
        </div>
        {state.movie && state.screenings && groupScreeningsByAuditorium(state.screenings).map((screenings, index) => (
          <div className='header-list' key={index}>
            <div className='auditorium-header'>
              <h3>{AuditoriumName[index]}</h3>
            </div>
            <ul>
              {screenings.map(screening => (
                <ScreeningDateContainer 
                  key={screening.id} 
                  movie={state.movie!} 
                  screening={screening} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
