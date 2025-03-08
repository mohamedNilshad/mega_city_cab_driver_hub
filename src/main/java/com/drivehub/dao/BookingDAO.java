package com.drivehub.dao;

import com.drivehub.model.*;
import com.drivehub.util.DBConnection;
import com.drivehub.util.Formats;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class BookingDAO {

    public List<Vehicle> getVehicleListBySeat(int vType, Timestamp startDate, Timestamp endDate) {
        List<Vehicle> VehicleList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT id, vehicleName, seatCount, vehicleImage, vehicleDescription FROM vehicles "+
                            "WHERE vehicleTypeId = ?"
            );

            stmt.setInt(1, vType);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Vehicle v = new Vehicle();
                v.setId(rs.getInt("id"));
                v.setVehicleName(rs.getString("vehicleName"));
                v.setSeatCount(rs.getInt("seatCount"));
                v.setVehicleImage(rs.getString("vehicleImage"));
                v.setDescription(rs.getString("vehicleDescription"));
                VehicleList.add(v);
            }
            conn.close();
            return getSortedVehicleList(VehicleList, startDate, endDate);

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
                v.setDescription(rs.getString("vehicleDescription"));

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
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getDouble("finalTotalAmount"),
                        rs.getTimestamp("finalStartDate"),
                        rs.getTimestamp("finalEndDate"),
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

    public Booking getBookingInvoice(int bookingId) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT b.*, c.* FROM bookings b INNER JOIN users c ON b.customer_id = c.id WHERE b.id = ?"
            );
            stmt.setInt(1, bookingId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {

                User customer = new User();
                customer.setAddress(rs.getString("userAddress"));
                customer.setPhone(rs.getString("userPhone"));
                customer.setEmail(rs.getString("userEmail"));

                Vehicle v = new Vehicle();

                List<PaymentInfo> paymentList = getPaymentList(rs.getInt("id"));

                Booking bookingDetails = new Booking(
                        rs.getInt("id"),
                        rs.getString("booking_number"),
                        paymentList,
                        rs.getInt("booking_type"),
                        rs.getInt("customer_id"),
                        customer,
                        v,
                        rs.getInt("vehicle_id"),
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getDouble("finalTotalAmount"),
                        rs.getTimestamp("finalStartDate"),
                        rs.getTimestamp("finalEndDate"),
                        rs.getInt("status")
                );
                bookingDetails.setStartMeterReading(rs.getInt("startMeterReading"));
                bookingDetails.setEndMeterReading(rs.getInt("endMeterReading"));

                conn.close();
                return bookingDetails;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public Booking getAllReadings(int bookingId) {

        try  {
            Connection conn = DBConnection.getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT b.*, v.vehicleTypeId FROM bookings b INNER JOIN vehicles v ON b.vehicle_id = v.id WHERE b.id = ?"
            );
            stmt.setInt(1, bookingId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {

                Vehicle vehicle = new Vehicle();
                vehicle.setVehicleTypeId(rs.getInt("vehicleTypeId"));

                List<PaymentInfo> paymentInfo = new ArrayList<>();

                Booking booking = new Booking();
                booking.setVehicle(vehicle);
                booking.setStartMeterReading(rs.getInt("startMeterReading"));
                booking.setEndMeterReading(rs.getInt("endMeterReading"));
                booking.setFinalStartDate(rs.getTimestamp("finalStartDate"));
                booking.setFinalEndDate(rs.getTimestamp("finalEndDate"));
                booking.setPaymentInfoList(paymentInfo);

                conn.close();
                return booking;
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    public List<Booking> getScheduledBookings(String keyword) {
        List<Booking> bookingList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();

            String query = "SELECT b.*, v.vehicleNumber, v.vehicleTypeId, c.userNic FROM bookings b "+
                    "INNER JOIN vehicles v ON b.vehicle_id = v.id "+
                    "INNER JOIN users c ON b.customer_id = c.id "+
                    "WHERE b.status = ? ";

            if (keyword != null && !keyword.trim().isEmpty()) {
                query += "AND (v.vehicleNumber LIKE ? OR v.vehicleTypeId LIKE ? OR c.userNic LIKE ? OR b.booking_number LIKE ?) ";
            }

            query += "ORDER BY b.start_date";

            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, 0);

            if (keyword != null && !keyword.trim().isEmpty()) {
                String searchPattern = "%" + keyword + "%";
                stmt.setString(2, searchPattern);
                stmt.setString(3, searchPattern);
                stmt.setString(4, searchPattern);
                stmt.setString(5, searchPattern);
            }

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
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getDouble("finalTotalAmount"),
                        rs.getTimestamp("finalStartDate"),
                        rs.getTimestamp("finalEndDate"),
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


    public List<Booking> getAllBookings(String keyword) {
        List<Booking> bookingList = new ArrayList<>();
        try  {
            Connection conn = DBConnection.getConnection();

            String query = "SELECT b.*, v.vehicleNumber, v.vehicleTypeId, c.userNic FROM bookings b "+
                    "INNER JOIN vehicles v ON b.vehicle_id = v.id "+
                    "INNER JOIN users c ON b.customer_id = c.id "+
                    "WHERE b.status != 0 ";

            if (keyword != null && !keyword.trim().isEmpty()) {
                query += "AND (v.vehicleNumber LIKE ? OR v.vehicleTypeId LIKE ? OR c.userNic LIKE ? OR b.booking_number LIKE ? "+
                        "OR b.passenger_name LIKE ? OR b.passenger_phone LIKE ?) ";
            }

            query += "ORDER BY b.start_date";


            PreparedStatement stmt = conn.prepareStatement(query);
            if (keyword != null && !keyword.trim().isEmpty()) {
                String searchPattern = "%" + keyword + "%";
                stmt.setString(1, searchPattern);
                stmt.setString(2, searchPattern);
                stmt.setString(3, searchPattern);
                stmt.setString(4, searchPattern);
                stmt.setString(5, searchPattern);
                stmt.setString(6, searchPattern);
            }
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
                        rs.getTimestamp("start_date"),
                        rs.getTimestamp("to_date"),
                        rs.getDouble("total_amount"),
                        rs.getInt("requested_seat_count"),
                        rs.getDouble("total_requested_distance"),
                        rs.getString("passenger_name"),
                        rs.getString("passenger_phone"),
                        rs.getDouble("finalTotalAmount"),
                        rs.getTimestamp("finalStartDate"),
                        rs.getTimestamp("finalEndDate"),
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

    public Boolean addNewBooking(Booking newBooking, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {

        try {
            Connection conn = DBConnection.getConnection();

            String bookingNumber = generateBookingNumber();

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO `bookings`(`booking_number`, `booking_type`, `customer_id`, `vehicle_id`, "+
                            "`start_date`, `to_date`, `total_amount`, `total_requested_distance`, `passenger_name`, "+
                            "`passenger_phone`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS
            );

            stmt.setString(1,bookingNumber);
            stmt.setInt(2, newBooking.getBookingType());
            stmt.setInt(3, newBooking.getCustomerId());
            stmt.setInt(4, newBooking.getVehicleId());

            stmt.setTimestamp(5, newBooking.getStartDate());
            stmt.setTimestamp(6, newBooking.getEndDate());
            stmt.setDouble(7, newBooking.getTotalAmount());

            stmt.setDouble(8, newBooking.getTotalRequestedDistance());
            stmt.setString(9, newBooking.getPassengerName());
            stmt.setString(10, newBooking.getPassengerPhone());
            stmt.setInt(11, newBooking.getStatus());

            int rs = stmt.executeUpdate();
            if (rs > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int insertedId = generatedKeys.getInt(1);
                        conn.close();

                        if(paymentInfo.getPaymentType() == 1) {
                            return addPaymentInfo(paymentInfo, insertedId);
                        }
                        int paymentId = addAndGetPaymentInfoId(paymentInfo, insertedId);
                        return cardPayment(cardDetails, insertedId, paymentId);
                    }
                }
            }


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean customCashPayment(int bookingId, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {

        try {
            if(paymentInfo.getPaymentType() == 1) {
                return addPaymentInfo(paymentInfo, bookingId);
            }
            int paymentId = addAndGetPaymentInfoId(paymentInfo, bookingId);
            if(paymentId != -1){
                return cardPayment(cardDetails, bookingId, paymentId);

//                Connection conn = DBConnection.getConnection();
//
//                PreparedStatement stmt = conn.prepareStatement(
//                        "INSERT INTO `card_info`(`cardHolderName`, `cardNumber`, `bookingId`, `paymentId`) VALUES (?,?,?,?)"
//                );
//
//                stmt.setString(1,cardDetails.getCardHolderName());
//                stmt.setInt(2, cardDetails.getCardNumber());
//                stmt.setInt(3, bookingId);
//                stmt.setInt(4, paymentId);
//
//                int rs = stmt.executeUpdate();
//                conn.close();
//                return  rs > 0;
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    private Boolean cardPayment(VisaCardDetails cardDetails, int bookingId, int paymentId ) throws SQLException {
        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO `card_info`(`cardHolderName`, `cardNumber`, `bookingId`, `paymentId`) VALUES (?,?,?,?)"
        );

        stmt.setString(1,cardDetails.getCardHolderName());
        stmt.setString(2, cardDetails.getCardNumber());
        stmt.setInt(3, bookingId);
        stmt.setInt(4, paymentId);

        int rs = stmt.executeUpdate();
        conn.close();
        return  rs > 0;
    }

    public Boolean updateBooking(Booking booking, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `bookings` SET `vehicle_id` = ? , `start_date` = ? , `to_date` = ? , "+
                            "`total_amount` = ? , `total_requested_distance` = ? , `passenger_name` = ? , "+
                            " `passenger_phone` = ? "+
                            " WHERE id = ?"
            );

            stmt.setInt(1,booking.getVehicleId());
            stmt.setTimestamp(2, booking.getStartDate());
            stmt.setTimestamp(3, booking.getEndDate());
            stmt.setDouble(4, booking.getTotalAmount());
            stmt.setDouble(5, booking.getTotalRequestedDistance());
            stmt.setString(6, booking.getPassengerName());
            stmt.setString(7, booking.getPassengerPhone());
            stmt.setInt(8, booking.getId());

            int rs = stmt.executeUpdate();
            if (rs > 0) {
                conn.close();
                if(paymentInfo.getPaymentType() == 1) {
                    return addPaymentInfo(paymentInfo, booking.getId());
                }
                int paymentId = addAndGetPaymentInfoId(paymentInfo, booking.getId());
                return cardPayment(cardDetails, booking.getId(), paymentId);
            }


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean updateFinalAmount(int bookingId, double finalAmount) {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE `bookings` SET `finalTotalAmount` = ?, `total_amount` = ? WHERE id = ?"
            );

            stmt.setDouble(1,finalAmount);
            stmt.setDouble(2, finalAmount);
            stmt.setInt(3, bookingId);

            int rs = stmt.executeUpdate();
            conn.close();
            return (rs > 0);

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return false;
    }

    public Boolean changeBookingStatus(int status, int bookingId, String meterReading)  {

        try {
            Connection conn = DBConnection.getConnection();

            PreparedStatement stmt;

            if(status == 3){
                LocalDateTime lt = LocalDateTime.now();
                Timestamp finalDate = Formats.dateTimeFormat(String.valueOf(lt));

                stmt = conn.prepareStatement("UPDATE `bookings` SET status = ?, startMeterReading = ?, finalStartDate = ? WHERE id = ?");
                stmt.setInt(1, status);
                stmt.setInt(2, Integer.parseInt(meterReading));
                stmt.setTimestamp(3, finalDate);
                stmt.setInt(4, bookingId);

            }else if(status == 1){
                LocalDateTime lt = LocalDateTime.now();
                Timestamp finalDate = Formats.dateTimeFormat(String.valueOf(lt));

                stmt = conn.prepareStatement("UPDATE `bookings` SET status = ?, endMeterReading = ?, finalEndDate = ? WHERE id = ?");
                stmt.setInt(1, status);
                stmt.setInt(2, Integer.parseInt(meterReading));
                stmt.setTimestamp(3, finalDate);
                stmt.setInt(4, bookingId);

            }else{
                stmt = conn.prepareStatement("UPDATE `bookings` SET status = ? WHERE id = ?");
                stmt.setInt(1, status);
                stmt.setInt(2, bookingId);
            }

            int rs = stmt.executeUpdate();

            conn.close();
            return (rs > 0);

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

    private int addAndGetPaymentInfoId(PaymentInfo paymentInfo, int bookingId) throws SQLException {
        Connection conn = DBConnection.getConnection();

        String refNumber = generateReferenceNumber();

        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO `payment_info`(`reference_number`, `booking_id`, `customer_id`, `payment_type`, `total_amount`, `provided_amount`, `is_paid`) VALUES (?,?,?,?,?,?,?)",
                Statement.RETURN_GENERATED_KEYS
        );

        stmt.setString(1,refNumber);
        stmt.setInt(2, bookingId);
        stmt.setInt(3, paymentInfo.getCustomerId());
        stmt.setInt(4, paymentInfo.getPaymentType());
        stmt.setDouble(5, paymentInfo.getTotalAmount());
        stmt.setDouble(6, paymentInfo.getProvidedAmount());
        stmt.setInt(7, paymentInfo.getIsPaid());

        int rs = stmt.executeUpdate();
        if (rs > 0) {
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int insertedId = generatedKeys.getInt(1);
                    conn.close();
                    return insertedId;
                }
            }
        }
        return -1;
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

    private List<Vehicle> getSortedVehicleList(List<Vehicle> list, Timestamp start_date, Timestamp to_date) throws SQLException {
        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "SELECT DISTINCT v.id AS v_id FROM bookings AS b "+
                        "INNER JOIN vehicles AS v ON b.vehicle_id = v.id "+
                        "WHERE (? <= b.to_date AND ? >= b.start_date) "+
                        "AND (b.status = 0 OR b.status = 3)"
        );
        stmt.setTimestamp(1, start_date);
        stmt.setTimestamp(2, to_date);

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
            p.setReferenceNumber(rs.getString("reference_number"));
            p.setPaymentType(rs.getInt("payment_type"));
            p.setCreatedDate(rs.getTimestamp("created_date"));
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
