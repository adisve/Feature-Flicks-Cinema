import React, { useState } from 'react';
import { TicketSelectionAmountContainer } from './TicketSelectionAmountContainer';
import '../../../scss/booking/TicketSelection.scss';
import { TicketType } from '../../../domain/interfaces/TicketType';
import {
  maxTicketPrice,
  totalTicketQuantity,
} from '../../../data/utils/ticket_utils';
import { Button } from 'react-bootstrap';
import { ConfirmationModal } from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  selectedSeats: {[id: number]: TicketType};
  priceDeductions: { [id: string]: number };
  screeningTime: string;
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionContainer = ({
  ticketTypes,
  selectedSeats,
  priceDeductions,
  screeningTime,
  handleTicketAmountChange,
}: TicketSelectionProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmBooking = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalConfirm = () => {
    // handle booking confirmation here
    setModalOpen(false);
    navigate('/screenings');
  };

  const amount = (ticketName: String) => {
    var amount = 0;
    for (const ticketTypeId in selectedSeats) {
      if (selectedSeats[ticketTypeId].name === ticketName) {
        amount++;
      }
    }
    return amount;
  }
  console.log(priceDeductions)
  return (
    <div className="ticket-selection">
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer
          key={ticketType.id}
          totalTicketAmount={totalTicketQuantity(selectedSeats)}
          ticketType={ticketType}
          maxTicketPrice={maxTicketPrice(ticketTypes)}
          ticketAmount={amount(ticketType.name)}
          handleTicketAmountChange={handleTicketAmountChange}
          ticketTypePriceDeduction={priceDeductions[ticketType.name]}
        />
      ))}
      <Button
        disabled={Object.keys(selectedSeats).length === 0}
        className="confirm-booking-btn"
        onClick={handleConfirmBooking}
      >
        Confirm booking
      </Button>
      <ConfirmationModal
        modalOpen={modalOpen}
        toggleModalOpen={handleCloseModal}
        selectedSeats={selectedSeats}
        onConfirm={handleModalConfirm}
        priceDeductions={priceDeductions} 
        screeningTime={screeningTime}
        />
    </div>
  );
};
