package com.drivehub.dao;

import com.drivehub.model.Company;
import com.drivehub.model.HelpDocument;
import com.drivehub.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

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

    public List<HelpDocument> getHelpList() {
        try  {
            List<HelpDocument> helpList = new ArrayList<>();

            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM `help_document`");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                helpList.add(new HelpDocument(
                        rs.getInt("id"),
                        rs.getString("helpTitle"),
                        rs.getString("helpBody"),
                        rs.getString("helpImage")
                ));
            }
            conn.close();
            return helpList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean addNewHelp(HelpDocument helpDocument) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `help_document`(helpTitle,helpBody,helpImage) VALUES (?,?,?)");

            stmt.setString(1,helpDocument.getHelpTitle());
            stmt.setString(2, helpDocument.getHelpDescription());
            stmt.setString(3, helpDocument.getHelpImage());

            int rs = stmt.executeUpdate();
            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean deleteHelp(int helpId) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement("DELETE FROM `help_document` WHERE id = ?");

            stmt.setInt(1,helpId);
            int rs = stmt.executeUpdate();
            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateHelp(HelpDocument helpDocument) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `help_document` SET helpTitle = ?, helpBody = ?, helpImage = ? WHERE id = ?"
            );

            stmt.setString(1,helpDocument.getHelpTitle());
            stmt.setString(2, helpDocument.getHelpDescription());
            stmt.setString(3, helpDocument.getHelpImage());
            stmt.setInt(4, helpDocument.getId());

            int rs = stmt.executeUpdate();
            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

}
