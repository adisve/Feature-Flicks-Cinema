import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../scss/booking/ConfirmationModal.scss';
import { TicketType } from '../../../domain/interfaces/TicketType';
import { generateUniqueString } from '../../../data/utils/format_utils';
import { calcualteSubTotal, calculateTotalPriceDeductions } from '../../../data/utils/ticket_utils';

interface ConfirmationModalProps {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  selectedSeats: { [id: number]: TicketType };
  priceDeductions: { [id: string]: number };
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  modalOpen,
  toggleModalOpen,
  selectedSeats,
  onConfirm,
  priceDeductions
}: ConfirmationModalProps) => {
  const seats = Object.keys(selectedSeats);
  const bookingId = generateUniqueString();
  const row = seats.map((seatNumber) => Math.floor((parseInt(seatNumber) - 1) / 8) + 1)[0];
  const subtotal: number = calcualteSubTotal(selectedSeats);
  const totalPriceDeductions: number = 
    calculateTotalPriceDeductions(
      selectedSeats, 
      priceDeductions
    );
  return (
    <Modal size='lg' show={modalOpen} onHide={toggleModalOpen}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm your booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Booking number: {bookingId}</h4>
        <h4>Seats: {seats.join(', ')}</h4>
        <h4>Row: {row}</h4>
        <hr />
        <h4>Total price: {subtotal - totalPriceDeductions} kr</h4>
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
