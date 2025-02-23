package com.drivehub.model;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

public class Driver {

    private int id;
    private String name;
    private String nic;
    private String phone;
    private String email;
    private String address;
    private int licenseTypeId;
    private String licenseType;
    private Date licenseExpireDate;
    private int isAllocate;

    public Driver(int id,String name, String nic, String phone, String email, String address, int licenseTypeId, String licenseType, Date licenseExpireDate, int isAllocate) {
        this.id = id;
        this.name = name;
        this.nic = nic;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.licenseTypeId = licenseTypeId;
        this.licenseType = licenseType;
        this.licenseExpireDate = licenseExpireDate;
        this.isAllocate = isAllocate;
    }
    public Driver(String name, String nic, String phone, String email, String address, int licenseTypeId, Date licenseExpireDate) {
        this.name = name;
        this.nic = nic;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.licenseTypeId = licenseTypeId;
        this.licenseExpireDate = licenseExpireDate;
    }

    public Driver() {}


    //Getters
    public int getId() {return id;}

    public String getEmail() {return email;}

    public String getName() {return name;}

    public String getNic() {return nic;}

    public String getAddress() {return address;}

    public String getPhone() {return phone;}

    public String getLicenseType() {return licenseType;}

    public int getLicenseTypeId() {return licenseTypeId;}

    public Date getLicenseExpireDate() {return licenseExpireDate;}


    public int getIsAllocate() {return isAllocate;}

    //Setters
    public void setId(int id) {this.id = id;}

    public void setEmail(String email) {this.email = email;}

    public void setName(String name) {this.name = name;}

    public void setNic(String nic) {this.nic = nic;}

    public void setAddress(String address) {this.address = address;}

    public void setPhone(String phone) {this.phone = phone;}

    public void setLicenseType(String licenseType) {this.licenseType = licenseType;}

    public void setLicenseTypeId(int licenseTypeId) {this.licenseTypeId = licenseTypeId;}

    public void setLicenseExpireDate(Date licenseExpireDate) {this.licenseExpireDate = licenseExpireDate;}

    public void setIsAllocate(int isAllocate) {this.isAllocate = isAllocate;}



    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("address", address);
        jsonMap.put("name", name);
        jsonMap.put("email", email);
        jsonMap.put("nic", nic);
        jsonMap.put("phone", phone);
        jsonMap.put("licenseTypeId", licenseTypeId);
        jsonMap.put("licenseType", licenseType);
        jsonMap.put("licenseExpireDate", licenseExpireDate);
        jsonMap.put("isAllocate", isAllocate);
        return jsonMap; // Excludes password for security
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", nic='" + nic + '\'' +
                ", phone='" + phone + '\'' +
                ", licenseTypeId='" + licenseTypeId + '\'' +
                ", licenseType='" + licenseType + '\'' +
                ", licenseExpireDate='" + licenseExpireDate + '\'' +
                ", isAllocate='" + isAllocate + '\'' +
                '}';
    }
}
