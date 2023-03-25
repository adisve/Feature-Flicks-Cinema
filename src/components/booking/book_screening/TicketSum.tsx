import React from 'react';
import '../../../scss/booking/Booking.scss'
import { TicketType } from '../../../domain/interfaces/TicketType';
import { calcualteSubTotal, calculateDiscountPercentage, calculatePriceDeductions, calculateTotalPriceDeductions, maxTicketPrice } from '../../../data/utils/ticket_utils';

interface TicketSumProps {
  ticketTypes: TicketType[];
  selectedSeats: {[id : string]: TicketType};
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
  selectedSeats,
  priceDeductions
 }: TicketSumProps) => {

  const subtotal: number = calcualteSubTotal(selectedSeats);
  const totalPriceDeductions: number = 
    calculateTotalPriceDeductions(
      selectedSeats, 
      priceDeductions
    );

  const ticketQuantity = (ticketName: String): number => {
    var quantity = 0;
    for (const id in selectedSeats) {
      const ticket = selectedSeats[id];
      if (ticket.name === ticketName) {
        quantity += 1
      }
    }
    return quantity;
  }

  return (
    <div className='ticket-sum-container'>
      <hr />
      {
        ticketTypes.map((ticketType) => {
          return renderDiscountInformation(
            priceDeductions,
            ticketType,
            maxTicketPrice(ticketTypes),
            ticketQuantity(ticketType.name)
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
