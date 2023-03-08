import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export enum TicketType {
  REGULAR = 'Regular',
  CHILD = 'Child',
  SENIOR = 'Senior'
}

interface TicketSelectionAmountContainerProps {
  ticketType: TicketType;
  ticketAmount: number;
  onTicketAmountChange: (amount: number) => void;
}

export const TicketSelectionAmountContainer: React.FC<TicketSelectionAmountContainerProps> = (props) => {

  const [amount, setAmount] = useState(0)
  const increaseAmount = () => {setAmount(amount + 1)}
  const decreaseAmount = () => {setAmount(amount - 1)}

  return (
    <div className='d-flex ticket-select-amount-container'>
      <p className='ticket-type'>{props.ticketType}</p>
      
      {/* Ticket amount selection container */}
      <div className='d-flex ticket-btn-container'>
        <Button onClick={decreaseAmount} disabled={amount < 1}><span><FontAwesomeIcon className='icon' icon={faMinus}/></span></Button>
        <p className='ticket-amount'>{amount}</p>
        <Button onClick={increaseAmount}><span><FontAwesomeIcon className='icon' icon={faPlus}/></span></Button>
      </div>
    </div>
  )
}
