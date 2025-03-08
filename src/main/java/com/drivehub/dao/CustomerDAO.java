package com.drivehub.dao;

import com.drivehub.model.User;
import com.drivehub.util.DBConnection;
import com.drivehub.util.HashUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CustomerDAO {

    public Boolean addNewCustomer(User newUser) {

        try {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO `users`(userType,fullName,userEmail,userNic,userAddress,userPhone,userName,userPassword) VALUES (?,?,?,?,?,?,?,?)");

            stmt.setInt(1, newUser.getUserType());
            stmt.setString(2, newUser.getName());
            stmt.setString(3, newUser.getEmail());
            stmt.setString(4, newUser.getNic());
            stmt.setString(5, newUser.getAddress());
            stmt.setString(6, newUser.getPhone());
            stmt.setString(7, newUser.getUserName());
            stmt.setString(8, HashUtil.toMD5(newUser.getPassword()));
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                conn.close();
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateCustomer(User customer)  {

        try  {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt;
            if(customer.getPassword() == null){
                stmt = conn.prepareStatement(
                        "UPDATE `users` SET fullName = ?, userEmail = ?, userNic = ?, userAddress = ?, userPhone = ?, userName = ? WHERE id = ?"
                );
                stmt.setString(1, customer.getName());
                stmt.setString(2, customer.getEmail());
                stmt.setString(3, customer.getNic());
                stmt.setString(4, customer.getAddress());
                stmt.setString(5, customer.getPhone());
                stmt.setString(6, customer.getUserName());
                stmt.setInt(7, customer.getId());

            }else{
                stmt = conn.prepareStatement(
                        "UPDATE `users` SET fullName = ?, userEmail = ?, userNic = ?, userAddress = ?, userPhone = ?, userName = ?, userPassword = ? WHERE id = ?"
                );

                stmt.setString(1, customer.getName());
                stmt.setString(2, customer.getEmail());
                stmt.setString(3, customer.getNic());
                stmt.setString(4, customer.getAddress());
                stmt.setString(5, customer.getPhone());
                stmt.setString(6, customer.getUserName());
                stmt.setString(7, HashUtil.toMD5(customer.getPassword()));
                stmt.setInt(8, customer.getId());
            }

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                conn.close();
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public List<User> getCustomers(String keyword) {
        List<User> CustomerList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();

            String query = "SELECT * FROM users WHERE userType = 2 ";

            if (keyword != null && !keyword.trim().isEmpty()) {
                query += "AND (fullName LIKE ? OR userEmail LIKE ? OR userNic LIKE ? OR userAddress LIKE ? "+
                        "OR userPhone LIKE ?) ";
            }

            query += "ORDER BY id DESC";

            PreparedStatement stmt = conn.prepareStatement(query);
            if (keyword != null && !keyword.trim().isEmpty()) {
                String searchPattern = "%" + keyword + "%";
                stmt.setString(1, searchPattern);
                stmt.setString(2, searchPattern);
                stmt.setString(3, searchPattern);
                stmt.setString(4, searchPattern);
                stmt.setString(5, searchPattern);
            }
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                CustomerList.add(new User(
                        rs.getInt("id"),
                        rs.getInt("userType"),
                        rs.getString("fullName"),
                        rs.getString("userEmail"),
                        rs.getString("userNic"),
                        rs.getString("userAddress"),
                        rs.getString("userPhone"),
                        rs.getString("userName"),
                        rs.getInt("blockUser")

                ));
            }
            conn.close();
            return CustomerList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public User getCustomer(int customerId) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT id,fullName,userNic,userPhone FROM users WHERE id = ?");
            stmt.setInt(1, customerId);
            ResultSet rs = stmt.executeQuery();

            User customer = new User();

            if (rs.next()) {
                customer.setId(rs.getInt("id"));
                customer.setName(rs.getString("fullName"));
                customer.setNic(rs.getString("userNic"));
                customer.setPhone(rs.getString("userPhone"));
            }
            conn.close();
            return customer;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }
}
