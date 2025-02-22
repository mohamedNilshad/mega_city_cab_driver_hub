package com.drivehub.model;

public class User {

    private int id;
    private int userType; //1,2
    private String name;
    private String email;
    private String nic;
    private String address;
    private String phone;
    private String userName;
    private String password;



    public User(int id, int userType, String name, String email, String nic, String address, String phone, String userName, String password) {
        this.id = id;
        this.userType = userType;
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.phone = phone;
        this.userName = userName;
        this.password = password;
    }

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
    public int getUserType() {return userType;}

    public String getEmail() {return email;}

    public String getName() {return name;}

    public String getNic() {return nic;}

    public String getAddress() {return address;}

    public String getPhone() {return phone;}

    public String getUserName() {return userName;}

    public String getPassword() {return password;}

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
}
