package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class VehicleTypes {

    private int id;
    private String type;
    private double perOneDay;
    private double discountFullAmount;
    private double discountBalanceAmount;
    private double penaltyExtraKm;
    private double maximumKmPerDay;
    private int discountDays;

    //insert
    public VehicleTypes(String type, double perOneDay, double discountFullAmount, double discountBalanceAmount, double penaltyExtraKm, double maximumKmPerDay, int discountDays) {
        this.type = type;
        this.perOneDay = perOneDay;
        this.discountFullAmount = discountFullAmount;
        this.discountBalanceAmount = discountBalanceAmount;
        this.penaltyExtraKm = penaltyExtraKm;
        this.maximumKmPerDay = maximumKmPerDay;
        this.discountDays = discountDays;
    }

    //select, update
    public VehicleTypes(int id, String type, double perOneDay, double discountFullAmount, double discountBalanceAmount, double penaltyExtraKm, double maximumKmPerDay, int discountDays) {
        this.id = id;
        this.type = type;
        this.perOneDay = perOneDay;
        this.discountFullAmount = discountFullAmount;
        this.discountBalanceAmount = discountBalanceAmount;
        this.penaltyExtraKm = penaltyExtraKm;
        this.maximumKmPerDay = maximumKmPerDay;
        this.discountDays = discountDays;
    }

    public VehicleTypes() {}


    //Getters
    public int getId() {return id;}

    public String getType() {return type;}

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

    //Setters
    public void setId(int id) {this.id = id;}

    public void setType(String type) {this.type = type;}

    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("type", type);
        jsonMap.put("perOneDay", perOneDay);
        jsonMap.put("discountFullAmount", discountFullAmount);
        jsonMap.put("discountBalanceAmount", discountBalanceAmount);
        jsonMap.put("penaltyExtraKm", penaltyExtraKm);
        jsonMap.put("maximumKmPerDay", maximumKmPerDay);
        jsonMap.put("discountDays", discountDays);
        return jsonMap;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", type='" + type + '\'' +
                '}';
    }
}
