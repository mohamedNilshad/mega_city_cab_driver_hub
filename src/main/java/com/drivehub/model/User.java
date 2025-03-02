package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class User {

    private int id;
    private int userType; //0<-super admin, 1<-admin, 2<-customer
    private String name;
    private String email;
    private String nic;
    private String address;
    private String phone;
    private String userName;
    private String password;
    private int block;


    //select
    public User(int id, int userType, String name, String email, String nic, String address, String phone, String userName, int block) {
        this.id = id;
        this.userType = userType;
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.phone = phone;
        this.userName = userName;
        this.block = block;
    }

    //update
    public User(int id,  String name, String email, String nic, String address, String phone, String userName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.phone = phone;
        this.userName = userName;
    }


    //insert
    public User(int userType, String name, String email, String nic, String address, String phone, String userName, String password) {
        this.userType = userType;
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.phone = phone;
        this.userName = userName;
        this.password = password;
    }

    public User() {}


    //Getters
    public int getId() {return id;}

    public int getUserType() {return userType;}

    public String getEmail() {return email;}

    public String getName() {return name;}

    public String getNic() {return nic;}

    public String getAddress() {return address;}

    public String getPhone() {return phone;}

    public String getUserName() {return userName;}

    public String getPassword() {return password;}

    public int getBlock() {return block;}


    //Setters
    public void setId(int id) {this.id = id;}

    public void setUserType(int userType) {this.userType = userType;}

    public void setEmail(String email) {this.email = email;}

    public void setName(String name) {this.name = name;}

    public void setNic(String nic) {this.nic = nic;}

    public void setAddress(String address) {this.address = address;}

    public void setPhone(String phone) {this.phone = phone;}

    public void setUserName(String userName) {this.userName = userName;}

    public void setPassword(String password) {this.password = password;}

    public void setBlock(int block) {this.block = block;}

    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("userType", userType);
        jsonMap.put("userName", userName);
        jsonMap.put("address", address);
        jsonMap.put("name", name);
        jsonMap.put("email", email);
        jsonMap.put("nic", nic);
        jsonMap.put("phone", phone);
        jsonMap.put("block", block);
        return jsonMap;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userType=" + userType +
                ", userName='" + userName + '\'' +
                ", address='" + address + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", nic='" + nic + '\'' +
                ", phone='" + phone + '\'' +
                ", block='" + block + '\'' +
                '}';
    }
}
