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

  const screeningsAvailable = (auditoriumId: number) => {
    return screeningsGroupedByAuditorium[auditoriumId] && screeningsGroupedByAuditorium[auditoriumId].length > 0;
  }

  const screeningsGroupedByAuditorium = groupScreeningsByAuditorium(state.screenings!);

  return (
    <div className='select-screening'>
      <div className='list-container'>
        <div className="header">
          <img draggable="false" src={`/assets${state.movie?.description.posterImage}`} alt={state.movie?.title} />
          <div>
            <h2>{state.movie?.title}</h2>
            <div className='movie-categories'>
              {state.movie?.description.categories.map((category, index) => (
                <p key={index} className='movie-category'>#{category}</p>
              ))}
            </div>
          </div>
        </div>
        {
          // For each auditorium
          state.auditoriums.map((auditorium, index) => {
            return screeningsAvailable(auditorium.id) &&
            <div className='header-list' key={index}>
                <div className="auditorium-header">
                  <h3>{auditorium.name}</h3>
                </div>
                <ul>
                  {
                    // For each screening in this auditorium
                    screeningsGroupedByAuditorium[auditorium.id].map((screening) => (
                      <ScreeningDateContainer 
                          key={screening.id}
                          movie={state.movie!}
                          screening={screening}
                          seatsPerAuditorium={state.seatsPerAuditorium![screening.auditoriumId]} 
                          occupiedSeats={state.occupiedSeats![screening.id]} 
                        />
                    ))
                  }
                </ul>
              </div>
          })
        }
      </div>
    </div>
  );
};
