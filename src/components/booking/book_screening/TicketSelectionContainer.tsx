import React, { useState } from 'react';
import { TicketSelectionAmountContainer } from './TicketSelectionAmountContainer';
import '../../../scss/booking/TicketSelection.scss';
import { TicketSelection } from '../../../domain/models/TicketSelection';
import { TicketType } from '../../../domain/interfaces/TicketType';
import {
  hasTicketsSelected,
  maxTicketPrice,
  totalTicketQuantity,
} from '../../../data/utils/ticket_utils';
import { Button } from 'react-bootstrap';
import { ConfirmationModal } from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  ticketSelections: { [id: string]: TicketSelection };
  selectedSeats: {[id: number]: TicketType};
  priceDeductions: { [id: string]: number };
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionContainer = ({
  ticketTypes,
  ticketSelections,
  selectedSeats,
  priceDeductions,
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

  return (
    <div className="ticket-selection">
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer
          key={ticketType.id}
          totalTicketAmount={totalTicketQuantity(ticketSelections)}
          ticketType={ticketType}
          maxTicketPrice={maxTicketPrice(ticketTypes)}
          ticketAmount={ticketSelections[ticketType.name].quantity}
          handleTicketAmountChange={handleTicketAmountChange}
          ticketTypePriceDeduction={priceDeductions[ticketType.name]}
        />
      ))}
      <Button
        disabled={!hasTicketsSelected(ticketSelections)}
        className="confirm-booking-btn"
        onClick={handleConfirmBooking}
      >
        Confirm booking
      </Button>
      <ConfirmationModal
        modalOpen={modalOpen}
        toggleModalOpen={handleCloseModal}
        ticketSelection={ticketSelections}
        selectedSeats={selectedSeats}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};
