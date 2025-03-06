package com.drivehub.model;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class PaymentInfo {

    private int id;
    private String referenceNumber;
    private int customerId;
    private User customer;
    private int paymentType; //1<-Cash on the spot, 2<- online payment
    private double totalAmount;
    private double providedAmount;
    private int isPaid; //0,1
    private Timestamp createdDate; //0,1


    //select
    public PaymentInfo(int id, String referenceNumber, int customerId, User customer, int paymentType, double totalAmount, double providedAmount, int isPaid) {
        this.id = id;
        this.referenceNumber = referenceNumber;
        this.customerId = customerId;
        this.customer = customer;
        this.paymentType = paymentType;
        this.totalAmount = totalAmount;
        this.providedAmount = providedAmount;
        this.isPaid = isPaid;
    }

    //update
    public PaymentInfo(int id, double totalAmount, double providedAmount, int isPaid) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.providedAmount = providedAmount;
        this.isPaid = isPaid;
    }

    //insert
    public PaymentInfo(int customerId, int paymentType, double totalAmount, double providedAmount, int isPaid) {
        this.customerId = customerId;
        this.paymentType = paymentType;
        this.totalAmount = totalAmount;
        this.providedAmount = providedAmount;
        this.isPaid = isPaid;
    }

    public PaymentInfo() {}


    //Getters
    public int getId() {
        return id;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public int getCustomerId() {
        return customerId;
    }

    public User getCustomer() {
        return customer;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public double getProvidedAmount() {
        return providedAmount;
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

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setProvidedAmount(double providedAmount) {
        this.providedAmount = providedAmount;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public void setId(int id) {
        this.id = id;
    }


    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("referenceNumber", referenceNumber);
        jsonMap.put("customerId", customerId);
        jsonMap.put("customer", customer == null ? "" : customer.toJson());
        jsonMap.put("paymentType", paymentType);
        jsonMap.put("totalAmount", totalAmount);
        jsonMap.put("providedAmount", providedAmount);
        jsonMap.put("isPaid", isPaid);
        jsonMap.put("createdDate", createdDate);
        return jsonMap;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", isPaid='" + isPaid + '\'' +
                ", referenceNumber='" + referenceNumber + '\'' +
                ", customerId='" + customerId + '\'' +
                ", totalAmount='" + totalAmount + '\'' +
                ", providedAmount='" + providedAmount + '\'' +
                ", isPaid='" + isPaid + '\'' +
                '}';
    }
}
