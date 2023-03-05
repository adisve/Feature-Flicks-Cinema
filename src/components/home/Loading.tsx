import React from 'react'
import { Spinner } from 'react-bootstrap';

/**
 * Custom loading animation component.
 * Built with react-bootstrap.
 * @returns Loading animation
 */
export const Loading = () => {
  return (
    <Spinner animation="border" variant='light' role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}