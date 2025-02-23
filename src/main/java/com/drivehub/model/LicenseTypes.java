package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class LicenseTypes {

    private int id;
    private String type;

    public LicenseTypes(int id, String type) {
        this.id = id;
        this.type = type;
    }
    public LicenseTypes(String type) {
        this.type = type;
    }

    public LicenseTypes() {}


    //Getters
    public int getId() {return id;}

    public String getType() {return type;}


    //Setters
    public void setId(int id) {this.id = id;}

    public void setType(String type) {this.type = type;}

    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("type", type);
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
