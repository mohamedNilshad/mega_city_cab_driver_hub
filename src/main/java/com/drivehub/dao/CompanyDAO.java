package com.drivehub.dao;

import com.drivehub.model.Company;
import com.drivehub.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class CompanyDAO {

    public Company getCompanyProfile(int companyId) {
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM `company_profile` WHERE id = ?"
            );
            stmt.setInt(1, companyId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Company company = new Company(
                        rs.getInt("id"),
                        rs.getString("companyName"),
                        rs.getString("companyAddress"),
                        rs.getString("companyEmail"),
                        rs.getString("companyPhone")
                );
                conn.close();
                return company;
            }


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

}
