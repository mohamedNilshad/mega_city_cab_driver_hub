package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class DefaultAmount {

    private int id;
    private int vehicleType ;
    private double perOneDay;
    private double discountFullAmount;
    private double discountBalanceAmount;
    private double penaltyExtraKm;
    private double maximumKmPerDay;
    private int discountDays;


    //select, update
    public DefaultAmount(int id, int vehicleType, double perOneDay, double discountFullAmount, double discountBalanceAmount, double penaltyExtraKm, double maximumKmPerDay, int discountDays) {
        this.id = id;
        this.vehicleType = vehicleType;
        this.perOneDay = perOneDay;
        this.discountFullAmount = discountFullAmount;
        this.discountBalanceAmount = discountBalanceAmount;
        this.penaltyExtraKm = penaltyExtraKm;
        this.maximumKmPerDay = maximumKmPerDay;
        this.discountDays = discountDays;
    }

    //insert
    public DefaultAmount(int vehicleType, double perOneDay, double discountFullAmount, double discountBalanceAmount, double penaltyExtraKm, double maximumKmPerDay, int discountDays) {
        this.vehicleType = vehicleType;
        this.perOneDay = perOneDay;
        this.discountFullAmount = discountFullAmount;
        this.discountBalanceAmount = discountBalanceAmount;
        this.penaltyExtraKm = penaltyExtraKm;
        this.maximumKmPerDay = maximumKmPerDay;
        this.discountDays = discountDays;
    }

    public DefaultAmount() {}


    //Getters
    public int getId() {
        return id;
    }

    public int getVehicleType() {
        return vehicleType;
    }

    public double getPerOneDay() {
        return perOneDay;
    }

    public double getDiscountFullAmount() {
        return discountFullAmount;
    }

    public double getDiscountBalanceAmount() {
        return discountBalanceAmount;
    }

    public double getPenaltyExtraKm() {
        return penaltyExtraKm;
    }

    public double getMaximumKmPerDay() {
        return maximumKmPerDay;
    }

    public int getDiscountDays() {
        return discountDays;
    }


    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("vehicleType", vehicleType);
        jsonMap.put("perOneDay", perOneDay);
        jsonMap.put("discountFullAmount", discountFullAmount);
        jsonMap.put("discountBalanceAmount", discountBalanceAmount);
        jsonMap.put("penaltyExtraKm", penaltyExtraKm);
        jsonMap.put("discountDays", discountDays);
        jsonMap.put("maximumKmPerDay", maximumKmPerDay);
        return jsonMap;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", vehicleType='" + vehicleType + '\'' +
                ", perOneDay='" + perOneDay + '\'' +
                ", discountFullAmount='" + discountFullAmount + '\'' +
                ", discountBalanceAmount='" + discountBalanceAmount + '\'' +
                ", penaltyExtraKm='" + penaltyExtraKm + '\'' +
                ", maximumKmPerDay='" + maximumKmPerDay + '\'' +
                '}';
    }
}
