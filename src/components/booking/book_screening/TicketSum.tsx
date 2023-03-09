import React from 'react';
import '../../../scss/booking/Booking.scss'
import { TicketType } from '../../../domain/interfaces/TicketType';
import { TicketSelection } from '../../../domain/models/TicketSelection';
import { calcualteSubTotal, calculateDiscountPercentage, calculatePriceDeductions, calculateTotalPriceDeductions, maxTicketPrice } from '../../../data/utils/ticket_utils';

interface TicketSumProps {
  ticketTypes: TicketType[];
  ticketSelections: {[id: string]: TicketSelection};
  priceDeductions: {[id: string]: number};
}

const renderDiscountInformation = (
  priceDeductions: {[id: string]: number}, 
  ticketType: TicketType,
  maxTicketPrice: number,
  quantity: number) => {
  if (quantity > 0 && priceDeductions[ticketType.name] > 0) {
    const discountPrice = priceDeductions[ticketType.name] * quantity;
    const discountPercentage = calculateDiscountPercentage(priceDeductions[ticketType.name], maxTicketPrice);
    return (
      <div key={ticketType.id} className='ticket-type-price-container'>
        <p className='ticket-type'>{quantity} {ticketType.name} discount {discountPercentage}%</p>
        <p className='ticket-price'>-{discountPrice} kr</p>
      </div>
    )
  }
}

const renderSubTotalWithPriceReduction = (subTotal: number, totalPriceDeductions: number) => {
  return (
    <div className='ticket-type-price-container'>
      <p className='ticket-type'>Subtotal</p>
      <p className='ticket-price'>{subTotal} kr</p>
      <p className='ticket-type'>Total price deductions</p>
      <p className='ticket-price'>{totalPriceDeductions} kr</p>
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

export const TicketSum = ({ 
  ticketTypes, 
  ticketSelections,
  priceDeductions
 }: TicketSumProps) => {

  const subtotal: number = calcualteSubTotal(ticketSelections);
  const totalPriceDeductions: number = calculateTotalPriceDeductions(ticketSelections, priceDeductions);

  return (
    <div className='ticket-sum-container'>
      <hr />
      {
        ticketTypes.map((ticketType) => {
          return renderDiscountInformation(
            priceDeductions,
            ticketType,
            maxTicketPrice(ticketTypes),
            ticketSelections[ticketType.name].quantity
          );
        })
      }
      { renderSubTotalWithPriceReduction(
          subtotal, 
          totalPriceDeductions
        )}
      { renderTotalSum(subtotal - totalPriceDeductions) }
    </div>
  );
};
