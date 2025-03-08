package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class VisaCardDetails {

    private String cardHolderName;
    private int cardNumber;
    private int bookingId;
    private int paymentId;

    public VisaCardDetails(String cardHolderName, int cardNumber, int bookingId) {
        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.bookingId = bookingId;
    }
    public VisaCardDetails() {}


    public String getCardHolderName() {
        return cardHolderName;
    }

    public int getCardNumber() {
        return cardNumber;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public void setCardNumber(int cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
}
