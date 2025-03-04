package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class Company {

    private int id;
    private String companyName;
    private String companyAddress;
    private String companyEmail;
    private String companyPhone;

    //select, update
    public Company(int id, String companyName, String companyAddress, String companyEmail, String companyPhone) {
        this.id = id;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.companyEmail = companyEmail;
        this.companyPhone = companyPhone;
    }

    public Company() {}


    //Getters
    public int getId() {return id;}

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }


    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("companyName", companyName);
        jsonMap.put("companyAddress", companyAddress);
        jsonMap.put("companyEmail", companyEmail);
        jsonMap.put("companyPhone", companyPhone);
        return jsonMap; // Excludes password for security
    }

}
