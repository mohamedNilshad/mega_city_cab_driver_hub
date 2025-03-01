package com.drivehub.dao;

import com.drivehub.model.*;
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

            //(seatCount <= selectedVehicle.seatCount + 1) && (seatCount >= selectedVehicle.seatCount - 3)
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
            conn.close();
            return getSortedVehicleList(VehicleList, seatCount, startDate, endDate);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<DefaultAmount> getDefaultAmount(int vType) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM default_amounts"
            );
//            stmt.setInt(1, vType);
            ResultSet rs = stmt.executeQuery();

            List<DefaultAmount> defaultAmountList = new ArrayList<>();

            while (rs.next()) {
                DefaultAmount defaultAmount = new DefaultAmount(
                        rs.getInt("id"),
                        rs.getInt("vehicle_type"),
                        rs.getDouble("per_one_day"),
                        rs.getDouble("discount_full_amount"),
                        rs.getDouble("discount_balance_amount"),
                        rs.getDouble("penalty_extra_km"),
                        rs.getDouble("maximum_km_per_day"),
                        rs.getInt("discount_days")
                );
                defaultAmountList.add(defaultAmount);

            }
            conn.close();
            return defaultAmountList;

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
                    "SELECT b.*, v.*, v.id AS v_id, c.userNic FROM bookings b "+
                            "INNER JOIN users c ON b.customer_id = c.id "+
                            "INNER JOIN vehicles v ON b.vehicle_id = v.id WHERE b.customer_id = ? ORDER BY b.id DESC"
            );
            stmt.setInt(1, customerId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {

                Vehicle v = new Vehicle();
                v.setId(rs.getInt("v_id"));
                v.setVehicleNumber(rs.getString("vehicleNumber"));
                v.setVehicleTypeId(rs.getInt("vehicleTypeId"));
                v.setVehicleName(rs.getString("vehicleName"));
                v.setSeatCount(rs.getInt("seatCount"));
                v.setVehicleImage(rs.getString("vehicleImage"));

                User customer = new User();
                customer.setNic(rs.getString("userNic"));

                List<PaymentInfo> paymentList = getPaymentList(rs.getInt("id"));
                Booking b = new Booking(
                        rs.getInt("id"),
                        rs.getString("booking_number"),
                        paymentList,
                        rs.getInt("booking_type"),
                        rs.getInt("customer_id"),
                        customer,
                        v,
                        rs.getInt("vehicle_id"),
                        rs.getString("from_destination"),
                        rs.getString("to_destination"),
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getInt("status")
                );


                bookingList.add(b);
            }
            conn.close();
            return bookingList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            System.err.println("Error: " + e);
        }
        return null;
    }

    public List<Booking> getScheduledBookings() {
        List<Booking> bookingList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT b.*, v.vehicleNumber, v.vehicleTypeId, c.userNic FROM bookings b "+
                            "INNER JOIN vehicles v ON b.vehicle_id = v.id "+
                            "INNER JOIN users c ON b.customer_id = c.id "+
                            "WHERE b.status = ? ORDER BY b.start_date"
            );
            stmt.setInt(1, 0);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Vehicle v = new Vehicle();
                User customer = new User();
                customer.setNic(rs.getString("userNic"));
                v.setVehicleNumber(rs.getString("vehicleNumber"));
                v.setVehicleTypeId(rs.getInt("vehicleTypeId"));

                List<PaymentInfo> paymentList = getPaymentList(rs.getInt("id"));

                Booking b = new Booking(
                        rs.getInt("id"),
                        rs.getString("booking_number"),
                        paymentList,
                        rs.getInt("booking_type"),
                        rs.getInt("customer_id"),
                        customer,
                        v,
                        rs.getInt("vehicle_id"),
                        rs.getString("from_destination"),
                        rs.getString("to_destination"),
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getInt("status")
                );

                bookingList.add(b);
            }
            conn.close();
            return bookingList;

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Boolean addNewBooking(Booking newBooking, PaymentInfo paymentInfo) {

        try {
            Connection conn = DBConnection.getConnection();

            String bookingNumber = generateBookingNumber();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `bookings`(`booking_number`, `booking_type`, `customer_id`, `vehicle_id`, "+
                            "`from_destination`, `to_destination`, `start_date`, `to_date`, `total_amount`, "+
                            " `requested_seat_count`, `total_requested_distance`, `passenger_name`, `passenger_phone`, `status`)"+
                            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS
            );

            stmt.setString(1,bookingNumber);
            stmt.setInt(2, newBooking.getBookingType());
            stmt.setInt(3, newBooking.getCustomerId());
            stmt.setInt(4, newBooking.getVehicleId());

            stmt.setString(5, newBooking.getFromDestination());
            stmt.setString(6, newBooking.getToDestination());
            stmt.setTimestamp(7, newBooking.getStartDate());
            stmt.setTimestamp(8, newBooking.getEndDate());
            stmt.setDouble(9, newBooking.getTotalAmount());

            stmt.setInt(10, newBooking.getRequestedSeatCount());
            stmt.setDouble(11, newBooking.getTotalRequestedDistance());
            stmt.setString(12, newBooking.getPassengerName());
            stmt.setString(13, newBooking.getPassengerPhone());
            stmt.setInt(14, newBooking.getStatus());

            int rs = stmt.executeUpdate();
            if (rs > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int insertedId = generatedKeys.getInt(1);
                        conn.close();
                        return addPaymentInfo(paymentInfo, insertedId);
                    }
                }
            }


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateBooking(Booking booking, PaymentInfo paymentInfo) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `bookings` SET `vehicle_id` = ? , `from_destination` = ? , `to_destination` = ? , `start_date` = ? , "+
                            "`to_date` = ? , `total_amount` = ? , `requested_seat_count` = ? , `total_requested_distance` = ? , `passenger_name` = ? , "+
                            " `passenger_phone` = ? "+
                            " WHERE id = ?"
            );

            stmt.setInt(1,booking.getVehicleId());
            stmt.setString(2, booking.getFromDestination());
            stmt.setString(3, booking.getToDestination());
            stmt.setTimestamp(4, booking.getStartDate());
            stmt.setTimestamp(5, booking.getEndDate());
            stmt.setDouble(6, booking.getTotalAmount());
            stmt.setInt(7, booking.getRequestedSeatCount());
            stmt.setDouble(8, booking.getTotalRequestedDistance());
            stmt.setString(9, booking.getPassengerName());
            stmt.setString(10, booking.getPassengerPhone());
            stmt.setInt(11, booking.getId());

            int rs = stmt.executeUpdate();
            if (rs > 0) {
                conn.close();
                return addPaymentInfo(paymentInfo, booking.getId());
            }


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean changeBookingStatus(int status, int bookingId)  {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement("UPDATE `bookings` SET status = ? WHERE id = ?");

            stmt.setInt(1, status);
            stmt.setInt(2, bookingId);

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

    private boolean addPaymentInfo(PaymentInfo paymentInfo, int bookingId) throws SQLException {
        Connection conn = DBConnection.getConnection();

        String refNumber = generateReferenceNumber();

        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO `payment_info`(`reference_number`, `booking_id`, `customer_id`, `payment_type`, `total_amount`, `provided_amount`, `is_paid`) VALUES (?,?,?,?,?,?,?)"
        );

        stmt.setString(1,refNumber);
        stmt.setInt(2, bookingId);
        stmt.setInt(3, paymentInfo.getCustomerId());
        stmt.setInt(4, paymentInfo.getPaymentType());
        stmt.setDouble(5, paymentInfo.getTotalAmount());
        stmt.setDouble(6, paymentInfo.getProvidedAmount());
        stmt.setInt(7, paymentInfo.getIsPaid());

        int rs = stmt.executeUpdate();
        conn.close();
        return  rs > 0;
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
        conn.close();
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
        conn.close();
        return list;


    }

    private List<PaymentInfo> getPaymentList(int bookId) throws SQLException {
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM payment_info WHERE booking_id = ?"
        );
        stmt.setInt(1, bookId);
        ResultSet rs = stmt.executeQuery();
        List<PaymentInfo> paymentList = new ArrayList<>();

        while (rs.next()) {
            PaymentInfo p = new PaymentInfo();
            p.setId(rs.getInt("id"));
            p.setProvidedAmount(rs.getDouble("provided_amount"));
            p.setIsPaid(rs.getInt("is_paid"));
            paymentList.add(p);
        }
        conn.close();
        return paymentList;
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
        conn.close();
        return bookingNum;
    }


}
