import React from 'react';
import { TicketType } from './TicketSelectionAmountContainer';
import { ticketPrice } from './Booking';
import '../../../scss/booking/Booking.scss'
import { getTicketDiscountPercentage, getTicketDiscountPrice } from '../../../data/utils/format_utils';

interface TicketSumProps {
  regular: number;
  child: number;
  senior: number;
}

const renderDiscountInformation = (ticketType: TicketType, quantity: number) => {
  if (quantity > 0) {
    const discountPercentage = getTicketDiscountPercentage(ticketType);
    const discountPrice = getTicketDiscountPrice(ticketType, quantity);
    const totalPrice = quantity * ticketPrice - discountPrice;
    return (
      <div className='ticket-type-price-container'>
        <p className='ticket-type'>{quantity} {ticketType} discount {discountPercentage}%</p>
        <p className='ticket-price'>-{discountPrice} kr</p>
      </div>
    )
  }
}

const renderSubTotalWithPriceReduction = (subTotal: number, priceReduction: number) => {
  return (
    <div className='ticket-type-price-container'>
      <p className='ticket-type'>Subtotal</p>
      <p className='ticket-price'>{subTotal} kr</p>
      <p className='ticket-type'>Total price deductions</p>
      <p className='ticket-price'>{priceReduction}</p>
    </div>
  )
}

const renderTotalSum = (totalPrice: number) => {
  return (
    <div className='ticket-type-price-container'>
      <hr />
      <p className='ticket-type'>Total sum</p>
      <p className='ticket-price'>{totalPrice} kr</p>
      <hr />
    </div>
  )
}

export const TicketSum: React.FC<TicketSumProps> = ({ regular, child, senior }) => {
  return (
    <div className='ticket-sum-container'>
      
      <hr />
      {renderDiscountInformation(TicketType.CHILD, child)}
      {renderDiscountInformation(TicketType.SENIOR, senior)}
      {renderSubTotalWithPriceReduction(
        (regular * 110) + (child * 110) + (senior * 110),
        ((getTicketDiscountPrice(TicketType.CHILD, child) + 
        (getTicketDiscountPrice(TicketType.SENIOR, senior))))
      )}
      {renderTotalSum(
        (regular * 110) + (child * 110) + (senior * 110) - 
        ((getTicketDiscountPrice(TicketType.CHILD, child) + 
        (getTicketDiscountPrice(TicketType.SENIOR, senior)))))
      }
    </div>
  );
};
