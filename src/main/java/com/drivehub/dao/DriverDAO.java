package com.drivehub.dao;

import com.drivehub.model.Driver;
import com.drivehub.model.LicenseTypes;
import com.drivehub.util.DBConnection;
import com.drivehub.util.Formats;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DriverDAO {

    public List<LicenseTypes> getLicenseTypes() {
        List<LicenseTypes> licenseTypesList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM license_type");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                licenseTypesList.add(new LicenseTypes(rs.getInt("id"), rs.getString("licenseType")));
            }
            return licenseTypesList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<Driver> getDrivers() {
        List<Driver> DriverList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT d.*, lt.id AS lt_id, lt.licenseType AS lt_type " +
                            "FROM drivers d " +
                            "INNER JOIN license_type lt ON d.licenseType = lt.id ORDER BY d.id DESC"
            );
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                DriverList.add(new Driver(
                        rs.getInt("id"),
                        rs.getString("registrationNumber"),
                        rs.getString("fullName"),
                        rs.getString("driverNic"),
                        rs.getString("driverPhone"),
                        rs.getString("driverEmail"),
                        rs.getString("driverAddress"),
                        rs.getInt("lt_id"),
                        rs.getString("lt_type"),
                        rs.getDate("licenseExpireDate"),
                        rs.getInt("isAllocate")
                ));
            }
            return DriverList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<Driver> getAvailableDrivers() {
        List<Driver> DriverList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT id, fullName FROM drivers WHERE isAllocate = ? ORDER BY id DESC"
            );
            stmt.setInt(1, 0);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                DriverList.add(new Driver(
                        rs.getInt("id"),
                        rs.getString("fullName")
                ));
            }
            return DriverList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean registerDriver(Driver newDriver) {

        try {
            Connection conn = DBConnection.getConnection();

            String regNumber = generateRegNumber();

            PreparedStatement stmt = conn.prepareStatement("INSERT INTO `drivers`(registrationNumber, fullName,driverNic,driverPhone,driverEmail,driverAddress,licenseType,licenseExpireDate) VALUES (?,?,?,?,?,?,?,?)");

            stmt.setString(1,regNumber);
            stmt.setString(2, newDriver.getName());
            stmt.setString(3, newDriver.getNic());
            stmt.setString(4, newDriver.getPhone());
            stmt.setString(5, newDriver.getEmail());
            stmt.setString(6, newDriver.getAddress());
            stmt.setInt(7, newDriver.getLicenseTypeId());
            stmt.setDate(8, newDriver.getLicenseExpireDate());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateDriver(Driver driver) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `drivers` SET fullName = ?, driverNic = ?, driverPhone = ?, driverEmail = ?, driverAddress = ?, licenseType = ?, licenseExpireDate = ? WHERE id = ?"
            );

            stmt.setString(1, driver.getName());
            stmt.setString(2, driver.getNic());
            stmt.setString(3, driver.getPhone());
            stmt.setString(4, driver.getEmail());
            stmt.setString(5, driver.getAddress());
            stmt.setInt(6, driver.getLicenseTypeId());
            stmt.setDate(7, driver.getLicenseExpireDate());
            stmt.setInt(8, driver.getId());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    private String generateRegNumber() throws SQLException {
        Connection conn = DBConnection.getConnection();
        String regNum = "D0001";
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT registrationNumber FROM drivers ORDER BY id DESC"
        );
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            String oldRegNum = rs.getString("registrationNumber");
            regNum = Formats.regNumberFormat(oldRegNum, "D", 4);
        }
        return regNum;
    }
}
