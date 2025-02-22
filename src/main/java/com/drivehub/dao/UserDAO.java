package com.drivehub.dao;
import java.sql.*;
import com.drivehub.model.User;
import com.drivehub.util.DBConnection;
import com.drivehub.util.HashUtil;

public class UserDAO {

    public User login(String uname, String uPassword) {

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE userName = ? AND userPassword = ?");
             ) {
            stmt.setString(1, uname);
            stmt.setString(2, HashUtil.toMD5(uPassword));
            ResultSet rs = stmt.executeQuery();

            User user = new User();
            if (rs.next()) {
                user.setId(rs.getInt("id"));
                user.setUserType(rs.getInt("id"));
                user.setUserName(rs.getInt("id"));
                user.setAddress(rs.getInt("id"));
                user.setName(rs.getInt("id"));
                user.setEmail(rs.getInt("id"));
                user.setNic(rs.getInt("id"));
                user.setPhone(rs.getInt("id"));
                user.setPassword(rs.getInt("id"));

                return user;
            } else {
                // If user is not found, return null or throw an exception
                throw new Exception("Invalid username or password");
            }
//            if (rs.next()) {
//                // User found, login successful
//                response.sendRedirect("dashboard.jsp?user=" + URLEncoder.encode(username, "UTF-8"));
//            } else {
//                // Login failed
//                response.sendRedirect("login.jsp?error=invalid");
//            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public Boolean register(User newUser) {

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
                return true;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
