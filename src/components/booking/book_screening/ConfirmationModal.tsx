import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../scss/booking/ConfirmationModal.scss';
import { TicketType } from '../../../domain/interfaces/TicketType';
import { generateUniqueString } from '../../../data/utils/format_utils';
import { calcualteSubTotal, calculateTotalPriceDeductions } from '../../../data/utils/ticket_utils';
import { screeningTimeToString } from '../../../data/utils/mapping_utils';

interface ConfirmationModalProps {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  selectedSeats: { [id: number]: TicketType };
  priceDeductions: { [id: string]: number };
  onConfirm: () => void;
  screeningTime: string;
}

export const ConfirmationModal = ({
  modalOpen,
  toggleModalOpen,
  selectedSeats,
  onConfirm,
  priceDeductions,
  screeningTime
}: ConfirmationModalProps) => {
  const seats = Object.keys(selectedSeats);
  const bookingId = generateUniqueString();
  const row = seats.map((seatNumber) => Math.floor((parseInt(seatNumber) - 1) / 12) + 1)[0];
  const subtotal: number = calcualteSubTotal(selectedSeats);
  const totalPriceDeductions: number = 
    calculateTotalPriceDeductions(
      selectedSeats, 
      priceDeductions
    );
  return (
    <Modal size='lg' show={modalOpen} onHide={toggleModalOpen}>
      <Modal.Header closeButton>
        <Modal.Title>Your booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Date: {screeningTimeToString(new Date(screeningTime))}</h5>
        <h5>Booking number: {bookingId}</h5>
        <h5>Seats: {seats.join(', ')}</h5>
        <h5>Row: {row}</h5>
        <hr />
        <h5>Total price: {subtotal - totalPriceDeductions} kr</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModalOpen}>
          Close
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
