import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'

export enum TicketType {
  REGULAR = 'Regular',
  CHILD = 'Child',
  SENIOR = 'Senior'
}

interface TicketSelectionAmountContainerProps {
  ticketType: TicketType,
}

export const TicketSelectionAmountContainer: React.FC<TicketSelectionAmountContainerProps> = (props) => {
  return (
    <div className='d-flex ticket-select-amount-container'>
      <p className='ticket-type'>{props.ticketType}</p>
      
      {/* Ticket amount selection container */}
      <div className='d-flex'>
        <Button><span><FontAwesomeIcon className='icon' icon={faMinus}/></span></Button>
        <p className='ticket-amount'>{/* Amount of tickets */}14</p>
        <Button><span><FontAwesomeIcon className='icon' icon={faPlus}/></span></Button>
      </div>
    </div>
  )
}
