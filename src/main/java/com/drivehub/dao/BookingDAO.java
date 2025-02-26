package com.drivehub.dao;

import com.drivehub.model.Booking;
import com.drivehub.model.Vehicle;
import com.drivehub.util.DBConnection;
import com.drivehub.util.Formats;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class BookingDAO {

    public List<Vehicle> getVehicleListBySeat(int seatCount, Timestamp startDate, Timestamp endDate) {
        List<Vehicle> VehicleList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT id, vehicleName, seatCount FROM vehicles WHERE seatCount = ? OR seatCount = ? OR seatCount = ?"
            );
            stmt.setInt(1, seatCount);
            stmt.setInt(2, seatCount + 1);
            stmt.setInt(3, seatCount - 1);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Vehicle v = new Vehicle();
                v.setId(rs.getInt("id"));
                v.setVehicleName(rs.getString("vehicleName"));
                v.setSeatCount(rs.getInt("seatCount"));
                VehicleList.add(v);
            }

            return getSortedVehicleList(VehicleList, seatCount, startDate, endDate);
//            return VehicleList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean addNewBooking(Booking newBooking) {

        try {
            Connection conn = DBConnection.getConnection();

            String bookingNumber = generateBookingNumber();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `bookings`(`booking_number`, `booking_type`, `customer_id`, `vehicle_id`, "+
                            "`payment_id`, `from_destination`, `to_destination`, `start_date`, `to_date`, `total_amount`, `status`)"+
                            " VALUES (?,?,?,?,?,?,?,?,?,?,?)"
            );

            stmt.setString(1,bookingNumber);
            stmt.setInt(2, newBooking.getBookingType());
            stmt.setInt(3, newBooking.getCustomerId());
            stmt.setInt(4, newBooking.getVehicleId());

            stmt.setInt(5, newBooking.getPaymentId());
            stmt.setString(6, newBooking.getFromDestination());
            stmt.setString(7, newBooking.getToDestination());

            stmt.setTimestamp(8, newBooking.getStartDate());
            stmt.setTimestamp(9, newBooking.getEndDate());

            stmt.setDouble(9, newBooking.getTotalAmount());
            stmt.setInt(10, newBooking.getStatus());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    private List<Vehicle> getSortedVehicleList(List<Vehicle> list, int seatCount, Timestamp start_date, Timestamp to_date) throws SQLException {
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT DISTINCT v.id AS v_id FROM bookings AS b "+
                        "INNER JOIN vehicles AS v ON b.vehicle_id = v.id "+
                        "WHERE (? <= b.to_date AND ? >= b.start_date) "+
                        "AND b.status != 0 "+
                        "AND (v.seatCount IN (?, ?, ?))"
        );
        stmt.setTimestamp(1, to_date);
        stmt.setTimestamp(2, start_date);
        stmt.setInt(3, seatCount);
        stmt.setInt(4, seatCount + 1);
        stmt.setInt(5, seatCount - 1);
        ResultSet rs = stmt.executeQuery();

        List<Integer> idList = new ArrayList<>();

        while (rs.next()) {
            idList.add(rs.getInt("v_id"));
        }

        list.removeIf(vehicle -> idList.contains(vehicle.getId()));
        return list;


    }

    private String generateBookingNumber() throws SQLException {
        Connection conn = DBConnection.getConnection();
        String bookingNum = "B00001";
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT booking_number FROM bookings ORDER BY id DESC"
        );
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            String oldBookingNum = rs.getString("booking_number");
            bookingNum = Formats.regNumberFormat(oldBookingNum, "B", 5);
        }
        return bookingNum;
    }
}
