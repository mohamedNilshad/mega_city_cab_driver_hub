package com.drivehub.dao;

import com.drivehub.model.Driver;
import com.drivehub.model.LicenseTypes;
import com.drivehub.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
            e.printStackTrace();
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
            e.printStackTrace();
        }
        return null;
    }

    public Boolean registerDriver(Driver newDriver) {

        try {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO `drivers`(fullName,driverNic,driverPhone,driverEmail,driverAddress,licenseType,licenseExpireDate) VALUES (?,?,?,?,?,?,?)");

            stmt.setString(1, newDriver.getName());
            stmt.setString(2, newDriver.getNic());
            stmt.setString(3, newDriver.getPhone());
            stmt.setString(4, newDriver.getEmail());
            stmt.setString(5, newDriver.getAddress());
            stmt.setInt(6, newDriver.getLicenseTypeId());
            stmt.setDate(7, newDriver.getLicenseExpireDate());

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
