package com.drivehub.dao;

import com.drivehub.model.Booking;
import com.drivehub.model.PaymentInfo;
import com.drivehub.model.User;
import com.drivehub.model.Vehicle;
import com.drivehub.util.DBConnection;
import com.drivehub.util.Formats;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class BookingDAO {

    public List<Vehicle> getVehicleListBySeat(int vType, int seatCount, Timestamp startDate, Timestamp endDate) {
        List<Vehicle> VehicleList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT id, vehicleName, seatCount, vehicleImage FROM vehicles "+
                            "WHERE vehicleTypeId = ? AND (seatCount IN (?, ?, ?))"
            );
            stmt.setInt(1, vType);
            stmt.setInt(2, seatCount);
            stmt.setInt(3, seatCount + 1);
            stmt.setInt(4, seatCount - 1);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Vehicle v = new Vehicle();
                v.setId(rs.getInt("id"));
                v.setVehicleName(rs.getString("vehicleName"));
                v.setSeatCount(rs.getInt("seatCount"));
                v.setVehicleImage(rs.getString("vehicleImage"));
                VehicleList.add(v);
            }

            return getSortedVehicleList(VehicleList, seatCount, startDate, endDate);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<Booking> getUserBookings(int customerId) {
        List<Booking> bookingList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT b.*, v.vehicleNumber FROM bookings b "+
                            "INNER JOIN vehicles v ON b.vehicle_id = v.id WHERE customer_id  = ?"
            );
            stmt.setInt(1, customerId);
            ResultSet rs = stmt.executeQuery();


            while (rs.next()) {
                Vehicle v = new Vehicle();
                v.setVehicleNumber(rs.getString("vehicleNumber"));
                Booking b = new Booking(
                        rs.getInt("id"),
                        rs.getString("booking_number"),
                        rs.getInt("booking_type"),
                        rs.getInt("customer_id"),
                        v,
                        rs.getInt("vehicle_id"),
                        rs.getInt("payment_id"),
                        rs.getString("from_destination"),
                        rs.getString("to_destination"),
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getInt("status")
                );

                bookingList.add(b);
            }

            return bookingList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean addNewBooking(Booking newBooking, PaymentInfo paymentInfo) {

        try {
            Connection conn = DBConnection.getConnection();

            int paymentId = getPaymentId(paymentInfo);
            String bookingNumber = generateBookingNumber();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `bookings`(`booking_number`, `booking_type`, `customer_id`, `vehicle_id`, "+
                            "`payment_id`, `from_destination`, `to_destination`, `start_date`, `to_date`, `total_amount`, "+
                            " `requested_seat_count`, `total_requested_distance`, `passenger_name`, `passenger_phone`, `status`)"+
                            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            );

            stmt.setString(1,bookingNumber);
            stmt.setInt(2, newBooking.getBookingType());
            stmt.setInt(3, newBooking.getCustomerId());
            stmt.setInt(4, newBooking.getVehicleId());

            stmt.setInt(5, paymentId);
            stmt.setString(6, newBooking.getFromDestination());
            stmt.setString(7, newBooking.getToDestination());
            stmt.setTimestamp(8, newBooking.getStartDate());
            stmt.setTimestamp(9, newBooking.getEndDate());
            stmt.setDouble(10, newBooking.getTotalAmount());

            stmt.setInt(11, newBooking.getRequestedSeatCount());
            stmt.setDouble(12, newBooking.getTotalRequestedDistance());
            stmt.setString(13, newBooking.getPassengerName());
            stmt.setString(14, newBooking.getPassengerPhone());
            stmt.setInt(15, newBooking.getStatus());

            int rs = stmt.executeUpdate();

            if (rs > 0) {
                return true;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    private int getPaymentId(PaymentInfo paymentInfo) throws SQLException {
        Connection conn = DBConnection.getConnection();

        String refNumber = generateReferenceNumber();

        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO `payment_info`(`reference_number`, `customer_id`, `payment_type`, `total_amount`, `is_paid`) VALUES (?,?,?,?,?)",
                Statement.RETURN_GENERATED_KEYS
        );

        stmt.setString(1,refNumber);
        stmt.setInt(2, paymentInfo.getCustomerId());
        stmt.setInt(3, paymentInfo.getPaymentType());
        stmt.setDouble(4, paymentInfo.getTotalAmount());
        stmt.setInt(5, paymentInfo.getIsPaid());

        int rs = stmt.executeUpdate();

        int insertedId = -1;
        if (rs > 0) {
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    insertedId = generatedKeys.getInt(1);
                }
            }
        }
        return  insertedId;
    }

    private String generateReferenceNumber() throws SQLException {
        Connection conn = DBConnection.getConnection();
        int bookingNum = 8000000;
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT reference_number FROM payment_info ORDER BY id DESC"
        );
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            int oldRefNum = Integer.parseInt(rs.getString("reference_number"));
            bookingNum = oldRefNum + 7;
        }
        return String.valueOf(bookingNum);
    }

    private List<Vehicle> getSortedVehicleList(List<Vehicle> list, int seatCount, Timestamp start_date, Timestamp to_date) throws SQLException {
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT DISTINCT v.id AS v_id FROM bookings AS b "+
                        "INNER JOIN vehicles AS v ON b.vehicle_id = v.id "+
                        "WHERE (? <= b.to_date AND ? >= b.start_date) "+
                        "AND b.status = 0 "+
                        "AND (v.seatCount IN (?, ?, ?))"
        );
        stmt.setTimestamp(1, start_date);
        stmt.setTimestamp(2, to_date);
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
