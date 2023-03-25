import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { TicketType } from '../../../domain/interfaces/TicketType';
import { calculateDiscountPercentage } from '../../../data/utils/ticket_utils';

interface TicketSelectionAmountContainerProps {
  ticketType: TicketType;
  ticketAmount: number;
  totalTicketAmount: number;
  maxTicketPrice: number;
  ticketTypePriceDeduction: number;
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionAmountContainer = ({
  ticketType, 
  ticketAmount, 
  totalTicketAmount, 
  maxTicketPrice,
  ticketTypePriceDeduction,
  handleTicketAmountChange}: TicketSelectionAmountContainerProps) => {

  const decreaseAmount = () => {
    if (totalTicketAmount > 1) {
      handleTicketAmountChange(ticketType, ticketAmount - 1);
    }
  }

  const increaseAmount = () => {
    if (totalTicketAmount < 10) {
      handleTicketAmountChange(ticketType, ticketAmount + 1);
    }
  }

  return (
    <div className='d-flex ticket-select-amount-container'>
      <div>
      <p className='ticket-type'>{ticketType.name}</p>
        {/* Special message in case senior/child ticket */}
        {
          ticketType.price < maxTicketPrice && (
            <p>{calculateDiscountPercentage(ticketTypePriceDeduction, maxTicketPrice)}%</p>
          )
        }
      </div>
      {/* Ticket amount selection container */}
      <div className='d-flex ticket-btn-container'>
        <Button onClick={decreaseAmount} disabled={ticketAmount < 1}>
          <span><FontAwesomeIcon className='icon' icon={faMinus}/></span>
        </Button>
        <p className='ticket-amount'>{ticketAmount}</p>
        <Button disabled={totalTicketAmount >= 2} onClick={increaseAmount}>
          <span><FontAwesomeIcon className='icon' icon={faPlus}/></span>
        </Button>
      </div>
    </div>
  )
}
