package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class PaymentInfo {

    private int id;
    private int referenceNumber;
    private int customerId;
    private User customer;
    private int paymentType;
    private int isPaid;


    //select
    public PaymentInfo(int id, int referenceNumber, int customerId, User customer, int paymentType, int isPaid) {
        this.id = id;
        this.referenceNumber = referenceNumber;
        this.customerId = customerId;
        this.customer = customer;
        this.paymentType = paymentType;
        this.isPaid = isPaid;
    }

    //update
    public PaymentInfo(int id, int isPaid) {
        this.id = id;
        this.isPaid = isPaid;
    }

    //insert
    public PaymentInfo(int referenceNumber, int customerId, int paymentType, int isPaid) {
        this.referenceNumber = referenceNumber;
        this.customerId = customerId;
        this.paymentType = paymentType;
        this.isPaid = isPaid;
    }

    public PaymentInfo() {}


    //Getters
    public int getId() {
        return id;
    }

    public int getReferenceNumber() {
        return referenceNumber;
    }

    public int getCustomerId() {
        return customerId;
    }

    public User getCustomer() {
        return customer;
    }

    public int getPaymentType() {
        return paymentType;
    }

    public int getIsPaid() {
        return isPaid;
    }

    //Setters
    public void setIsPaid(int isPaid) {
        this.isPaid = isPaid;
    }

    public void setPaymentType(int paymentType) {
        this.paymentType = paymentType;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public void setReferenceNumber(int referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public void setId(int id) {
        this.id = id;
    }

    // ✅ Convert User object to a JSON-like format
    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("referenceNumber", referenceNumber);
        jsonMap.put("customerId", customerId);
        jsonMap.put("customer", customer.toJson());
        jsonMap.put("paymentType", paymentType);
        jsonMap.put("isPaid", isPaid);
        return jsonMap; // Excludes password for security
    }

    // ✅ Override toString for debugging
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", isPaid='" + isPaid + '\'' +
                ", referenceNumber='" + referenceNumber + '\'' +
                ", customerId='" + customerId + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", isPaid='" + isPaid + '\'' +
                '}';
    }
}
