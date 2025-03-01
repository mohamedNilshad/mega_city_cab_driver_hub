package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class Vehicle {

    private int id;
    private int vehicleTypeId ;
    private String vehicleType ;
    private int driverId ;
    private int oldDriverId ;
    private String driverName ;
    private String driverRegNum ;
    private String vehicleName;
    private String vehicleNumber;
    private int seatCount;
    private String vehicleImage;
    private String description;
    private int isAvailable;

    //update
    public Vehicle(int id, int vehicleTypeId, int driverId, int oldDriverId, String vehicleName, String vehicleNumber, int seatCount, String vehicleImage, String description) {
        this.id = id;
        this.vehicleTypeId = vehicleTypeId;
        this.driverId = driverId;
        this.oldDriverId = oldDriverId;
        this.vehicleName = vehicleName;
        this.vehicleNumber = vehicleNumber;
        this.seatCount = seatCount;
        this.vehicleImage = vehicleImage;
        this.description = description;
    }

    //insert
    public Vehicle(int vehicleTypeId, int driverId, String vehicleName, String vehicleNumber, int seatCount, String vehicleImage, String description) {
        this.vehicleTypeId = vehicleTypeId;
        this.driverId = driverId;
        this.vehicleName = vehicleName;
        this.vehicleNumber = vehicleNumber;
        this.seatCount = seatCount;
        this.vehicleImage = vehicleImage;
        this.description = description;
    }

    //select
    public Vehicle(int id, int vehicleTypeId, String vehicleType, int driverId, String driverName, String driverRegNum, String vehicleName, String vehicleNumber, int seatCount, String vehicleImage, String description) {
        this.id = id;
        this.vehicleTypeId = vehicleTypeId;
        this.vehicleType = vehicleType;
        this.driverId = driverId;
        this.driverName = driverName;
        this.driverRegNum = driverRegNum;
        this.vehicleName = vehicleName;
        this.vehicleNumber = vehicleNumber;
        this.seatCount = seatCount;
        this.vehicleImage = vehicleImage;
        this.description = description;
    }

    public Vehicle() {}

    //Getters
    public int getId() {
        return id;
    }

    public int getVehicleTypeId() {
        return vehicleTypeId;
    }

    public String getDescription() {
        return description;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public int getDriverId() {
        return driverId;
    }

    public int getOldDriverId() {
        return oldDriverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public String getDriverRegNum() {
        return driverRegNum;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public String getVehicleImage() {
        return vehicleImage;
    }

    public int getIsAvailable() {
        return isAvailable;
    }

//Setters


    public void setId(int id) {
        this.id = id;
    }

    public void setVehicleTypeId(int vehicleTypeId) {
        this.vehicleTypeId = vehicleTypeId;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    public void setOldDriverId(int oldDriverId) {
        this.oldDriverId = oldDriverId;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public void setDriverRegNum(String driverRegNum) {
        this.driverRegNum = driverRegNum;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public void setVehicleImage(String vehicleImage) {
        this.vehicleImage = vehicleImage;
    }
    public void setIsAvailable(int isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("vehicleTypeId", vehicleTypeId);
        jsonMap.put("vehicleType", vehicleType);
        jsonMap.put("driverId", driverId);
        jsonMap.put("oldDriverId", oldDriverId);
        jsonMap.put("driverName", driverName);
        jsonMap.put("driverRegNum", driverRegNum);
        jsonMap.put("vehicleName", vehicleName);
        jsonMap.put("vehicleNumber", vehicleNumber);
        jsonMap.put("seatCount", seatCount);
        jsonMap.put("vehicleImage", vehicleImage);
        jsonMap.put("description", description);
        jsonMap.put("isAvailable", isAvailable);
        return jsonMap; // Excludes password for security
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", vehicleTypeId='" + vehicleTypeId + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", driverId='" + driverId + '\'' +
                ", oldDriverId='" + oldDriverId + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverRegNum='" + driverRegNum + '\'' +
                ", vehicleName='" + vehicleName + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", seatCount='" + seatCount + '\'' +
                ", vehicleImage='" + vehicleImage + '\'' +
                ", description='" + description + '\'' +
                ", isAvailable='" + isAvailable + '\'' +
                '}';
    }
}
