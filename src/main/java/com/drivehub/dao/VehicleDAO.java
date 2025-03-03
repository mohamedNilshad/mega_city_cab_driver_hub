package com.drivehub.dao;

import com.drivehub.model.Vehicle;
import com.drivehub.model.VehicleTypes;
import com.drivehub.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



public class VehicleDAO {


    public List<VehicleTypes> getVehicleTypes() {
        List<VehicleTypes> vehicleTypesList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM vehicle_type");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                vehicleTypesList.add(
                        new VehicleTypes(
                                rs.getInt("id"),
                                rs.getString("vehicleType"),
                                rs.getDouble("perOneDay"),
                                rs.getDouble("discountFullAmount"),
                                rs.getDouble("discountBalanceAmount"),
                                rs.getDouble("penaltyExtraKm"),
                                rs.getDouble("maximumKmPerDay"),
                                rs.getInt("discountDays")
                        )
                );
            }

            conn.close();
            return vehicleTypesList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<Vehicle> getVehicle() {
        List<Vehicle> VehicleList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT v.*, vt.id AS vt_id, vt.vehicleType AS vt_type, d.id AS d_id, d.registrationNumber AS d_reg, d.fullName AS d_name " +
                            "FROM vehicles v " +
                            "INNER JOIN vehicle_type vt ON v.vehicleTypeId = vt.id "+
                            "INNER JOIN drivers d ON v.driverId = d.id ORDER BY v.id DESC"
            );
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                VehicleList.add(new Vehicle(
                        rs.getInt("id"),
                        rs.getInt("vt_id"),
                        rs.getString("vt_type"),
                        rs.getInt("d_id"),
                        rs.getString("d_name"),
                        rs.getString("d_reg"),
                        rs.getString("vehicleName"),
                        rs.getString("vehicleNumber"),
                        rs.getInt("seatCount"),
                        rs.getString("vehicleImage"),
                        rs.getString("vehicleDescription")
                ));
            }
            conn.close();
            return VehicleList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean addNewVehicle(Vehicle newVehicle) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `vehicles`(vehicleTypeId,driverId,vehicleName,vehicleNumber,seatCount,vehicleImage,vehicleDescription) VALUES (?,?,?,?,?,?,?)");

            stmt.setInt(1,newVehicle.getVehicleTypeId());
            stmt.setInt(2, newVehicle.getDriverId());
            stmt.setString(3, newVehicle.getVehicleName());
            stmt.setString(4, newVehicle.getVehicleNumber());
            stmt.setInt(5, newVehicle.getSeatCount());
            stmt.setString(6, newVehicle.getVehicleImage());
            stmt.setString(7, newVehicle.getDescription());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                conn.close();
                return updateDriverAllocation(newVehicle.getDriverId(), 1);

            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateVehicle(Vehicle vehicle) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `vehicles` SET vehicleTypeId = ?, driverId = ?, vehicleName = ?, vehicleNumber = ?, seatCount = ?, vehicleImage = ?, vehicleDescription = ? WHERE id = ?"
            );

            stmt.setInt(1, vehicle.getVehicleTypeId());
            stmt.setInt(2, vehicle.getDriverId());
            stmt.setString(3, vehicle.getVehicleName());
            stmt.setString(4, vehicle.getVehicleNumber());
            stmt.setInt(5, vehicle.getSeatCount());
            stmt.setString(6, vehicle.getVehicleImage());
            stmt.setString(7, vehicle.getDescription());
            stmt.setInt(8, vehicle.getId());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                conn.close();
                //update old driver
                boolean updatedOld = updateDriverAllocation(vehicle.getOldDriverId(), 0);
                if (updatedOld) {
                    //update new driver
                    return updateDriverAllocation(vehicle.getDriverId(), 1);
                }
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean deleteVehicle(Vehicle vehicle) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement("DELETE FROM `vehicles` WHERE id = ?");
            stmt.setInt(1, vehicle.getId());
            int rs = stmt.executeUpdate();

            if (rs > 0) {
                conn.close();
                //update driver
                return updateDriverAllocation(vehicle.getDriverId(), 0);
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    private boolean updateDriverAllocation(int driverId, int value){
        try {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement("UPDATE `drivers` SET isAllocate = ? WHERE id = ?");

            stmt.setInt(1, value);
            stmt.setInt(2, driverId);

            int rs = stmt.executeUpdate();
            conn.close();
            return(rs > 0);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public Boolean addNewVehicleType(VehicleTypes newVehicleType) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `vehicle_type`(vehicleType,perOneDay,discountFullAmount,discountBalanceAmount,penaltyExtraKm,maximumKmPerDay,discountDays) VALUES (?,?,?,?,?,?,?)");

            stmt.setString(1,newVehicleType.getType());
            stmt.setDouble(2,newVehicleType.getPerOneDay());
            stmt.setDouble(3,newVehicleType.getDiscountFullAmount());
            stmt.setDouble(4,newVehicleType.getDiscountBalanceAmount());
            stmt.setDouble(5,newVehicleType.getPenaltyExtraKm());
            stmt.setDouble(6,newVehicleType.getMaximumKmPerDay());
            stmt.setInt(7, newVehicleType.getDiscountDays());

            int rs = stmt.executeUpdate();
            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateVehicleType(VehicleTypes vehicleType) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `vehicle_type` SET vehicleType = ?, perOneDay = ?, discountFullAmount = ?, discountBalanceAmount = ?, penaltyExtraKm = ?, maximumKmPerDay = ?, discountDays = ? WHERE id = ?"
            );

            stmt.setString(1,vehicleType.getType());
            stmt.setDouble(2,vehicleType.getPerOneDay());
            stmt.setDouble(3,vehicleType.getDiscountFullAmount());
            stmt.setDouble(4,vehicleType.getDiscountBalanceAmount());
            stmt.setDouble(5,vehicleType.getPenaltyExtraKm());
            stmt.setDouble(6,vehicleType.getMaximumKmPerDay());
            stmt.setInt(7, vehicleType.getDiscountDays());
            stmt.setInt(8, vehicleType.getId());

            int rs = stmt.executeUpdate();

            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean deleteVehicleType(int typeId) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement("DELETE FROM `vehicle_type` WHERE id = ?");

            stmt.setInt(1, typeId);

            int rs = stmt.executeUpdate();

            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

}
