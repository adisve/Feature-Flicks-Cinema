import { faFilter, faImage, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'react-bootstrap';
import '../../scss/screenings/ScreeningsHeader.scss'

interface ScreeningsHeaderProps {
  setViewType: (viewType: string) => void;
  viewType: string;
  toggleOffcanvas: () => void;
}

export const ScreeningsHeader = ({ 
  setViewType,
  viewType,
  toggleOffcanvas,
 }: ScreeningsHeaderProps) => {

  const viewTypes = [
    { label: 'List', icon: faList, value: 'list' },
    { label: 'Posters', icon: faImage, value: 'posters' },
  ];

  return (
    <div className='justify-content-between screenings-header'>
      <h2 id='available-screenings'>Available Screenings</h2>
      <div className="d-flex view-types-filter">
      <div className='view-types'>
        {viewTypes.map((viewtype) => (
          <Button
            key={viewtype.value}
            variant='custom'
            onClick={() => setViewType(viewtype.value)}
            className={`d-flex btn ${
              viewtype.value === viewType ? 'selected-view-type' : ''
            }`}
          >
            <span>
              <FontAwesomeIcon icon={viewtype.icon} />
            </span>
            <p>{viewtype.label}</p>
          </Button>
        ))}
      </div>
        <div>
          <Button onClick={toggleOffcanvas} variant='custom' className="d-flex btn">
            <span><FontAwesomeIcon icon={faFilter} /></span>
            <p>Filters</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
