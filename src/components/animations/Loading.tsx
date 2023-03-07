import React from 'react'
import { Spinner } from 'react-bootstrap';
import '../../scss/Loading.scss'

/**
 * Custom loading animation component.
 * Built with react-bootstrap.
 * @returns Loading animation
 */
export const Loading = () => {
  return (
    <div className='loading'>
      <Spinner animation="border" variant='light' role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}