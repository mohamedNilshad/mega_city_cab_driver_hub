package com.drivehub.dao;
import java.sql.*;
import com.drivehub.model.User;
import com.drivehub.util.DBConnection;
import com.drivehub.util.HashUtil;

public class UserDAO {

    public User getProfileInfo(int userId) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");

            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();


            if (rs.next()) {
                return new User(
                        rs.getInt("id"),
                        rs.getInt("userType"),
                        rs.getString("fullName"),
                        rs.getString("userEmail"),
                        rs.getString("userNic"),
                        rs.getString("userAddress"),
                        rs.getString("userPhone"),
                        rs.getString("userName")
                );
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public boolean confirmPassword(int userId, String password) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ? AND userPassword = ?");

            stmt.setInt(1, userId);
            stmt.setString(2, HashUtil.toMD5(password));
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public boolean updateProfile(User user) {

        try  {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt;
            if(user.getPassword() == null){
                stmt = conn.prepareStatement(
                        "UPDATE `users` SET fullName = ?, userEmail = ?, userNic = ?, userAddress = ?, userPhone = ?, userName = ? WHERE id = ?"
                );
                stmt.setString(1, user.getName());
                stmt.setString(2, user.getEmail());
                stmt.setString(3, user.getNic());
                stmt.setString(4, user.getAddress());
                stmt.setString(5, user.getPhone());
                stmt.setString(6, user.getUserName());
                stmt.setInt(7, user.getId());

            }else{
                stmt = conn.prepareStatement(
                        "UPDATE `users` SET fullName = ?, userEmail = ?, userNic = ?, userAddress = ?, userPhone = ?, userName = ?, userPassword = ? WHERE id = ?"
                );

                stmt.setString(1, user.getName());
                stmt.setString(2, user.getEmail());
                stmt.setString(3, user.getNic());
                stmt.setString(4, user.getAddress());
                stmt.setString(5, user.getPhone());
                stmt.setString(6, user.getUserName());
                stmt.setString(7, HashUtil.toMD5(user.getPassword()));
                stmt.setInt(8, user.getId());
            }

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public User login(String uname, String uPassword) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE userName = ? AND userPassword = ?");

            stmt.setString(1, uname);
            stmt.setString(2, HashUtil.toMD5(uPassword));
            ResultSet rs = stmt.executeQuery();

            User user = new User();
            if (rs.next()) {
                user.setId(rs.getInt("id"));
                user.setUserType(rs.getInt("userType"));
                return user;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
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
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }
}
