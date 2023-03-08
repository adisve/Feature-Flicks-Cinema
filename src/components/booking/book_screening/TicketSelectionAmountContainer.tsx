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
  totalTicketAmount: number;
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionAmountContainer: React.FC<TicketSelectionAmountContainerProps> = (props) => {

  const decreaseAmount = () => {
    props.handleTicketAmountChange(props.ticketType, props.ticketAmount - 1);
  }

  const increaseAmount = () => {
    props.handleTicketAmountChange(props.ticketType, props.ticketAmount + 1);
  }

  return (
    <div className='d-flex ticket-select-amount-container'>
      <div>
      <p className='ticket-type'>{props.ticketType}</p>
        {/* Special message in case senior/child ticket */}
        {props.ticketType === TicketType.CHILD && (<p>- 32% off</p>)}
        {props.ticketType === TicketType.SENIOR && (<p>- 23% off</p>)}
      </div>
      {/* Ticket amount selection container */}
      <div className='d-flex ticket-btn-container'>
        <Button onClick={decreaseAmount} disabled={props.ticketAmount < 1}><span><FontAwesomeIcon className='icon' icon={faMinus}/></span></Button>
        <p className='ticket-amount'>{props.ticketAmount}</p>
        <Button disabled={props.totalTicketAmount >= 10} onClick={increaseAmount}><span><FontAwesomeIcon className='icon' icon={faPlus}/></span></Button>
      </div>
    </div>
  )
}
