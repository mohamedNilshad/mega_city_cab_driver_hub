package com.drivehub.controller;

import com.drivehub.model.Booking;
import com.drivehub.model.PaymentInfo;
import com.drivehub.model.Vehicle;
import com.drivehub.service.BookingService;
import com.drivehub.util.Formats;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;

@WebServlet("/booking")
public class BookingController extends HttpServlet {

    private final BookingService bookingService = new BookingService();

    public BookingController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("vehicle_list_by_seat".equals(action)) {
            getVehicleListBySeat(request, response);
        }else if ("get_customer_bookings".equals(action)) {
            getUserBookings(request, response);
        }else if ("get_all_scheduled_bookings".equals(action)) {
            getScheduledBookings(response);
        }
    }

    private void getVehicleListBySeat(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            int vType = Integer.parseInt(request.getParameter("vehicle_type"));
            int seatCount = Integer.parseInt(request.getParameter("seat_count"));
            Timestamp startDate = Formats.dateTimeFormat(request.getParameter("start_date"));
            Timestamp endDate = Formats.dateTimeFormat(request.getParameter("end_date"));

            List<Vehicle> vehicles = bookingService.getVehiclesBySeat(vType, seatCount, startDate, endDate);

            if(vehicles != null){

                JSONArray vehicleArray = new JSONArray();

                for (Vehicle v : vehicles) {
                    vehicleArray.put(v.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Fetched Successfully");
                jsonResponse.put("data", vehicleArray);
            }else{
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "No Data");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getUserBookings(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            int customerId = Integer.parseInt(request.getParameter("customer_id"));

            List<Booking> bookings = bookingService.getUserBookings(customerId);

            if(bookings != null){

                JSONArray bookingArray = new JSONArray();

                for (Booking b : bookings) {
                    bookingArray.put(b.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "User Bookings Fetched Successfully");
                jsonResponse.put("data", bookingArray);
            }else{
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "No Data");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getScheduledBookings( HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {

            List<Booking> bookings = bookingService.getScheduledBookings();

            if(bookings != null){

                JSONArray bookingArray = new JSONArray();

                for (Booking b : bookings) {
                    bookingArray.put(b.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Bookings Fetched Successfully");
                jsonResponse.put("data", bookingArray);
            }else{
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "No Data");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");
        try {
            if ("new_booking".equals(action)) {
                addNewBooking(request, response);
            }else if ("change_change".equals(action)) {
                changeBookingStatus(request, response);
            }else if ("update_booking".equals(action)) {
                updateBooking(request, response);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private void addNewBooking(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            Booking newBooking = new Booking(
                    Integer.parseInt(request.getParameter("customerId")),
                    Integer.parseInt(request.getParameter("selected_vehicle")),
                    1,//from payment form
                    request.getParameter("from"),
                    request.getParameter("to"),
                    Formats.dateTimeFormat(request.getParameter("from_date")),
                    Formats.dateTimeFormat(request.getParameter("to_date")),
                    Double.parseDouble(request.getParameter("total_amount")),
                    Integer.parseInt(request.getParameter("seat_count")),
                    Double.parseDouble(request.getParameter("total_distance")),
                    request.getParameter("customer_name"),
                    request.getParameter("phone"),
                    0
            );
            System.out.println(request.getParameter("provided_amount"));
            System.out.println(request.getParameter("is_paid"));
            System.out.println(request.getParameter("payment_type"));
            System.out.println(request.getParameter("total_amount"));
            PaymentInfo paymentInfo = new PaymentInfo(
                    Integer.parseInt(request.getParameter("customerId")),
                    Integer.parseInt(request.getParameter("payment_type")),
                    Double.parseDouble(request.getParameter("total_amount")),
                    Double.parseDouble(request.getParameter("provided_amount")),
                    Integer.parseInt(request.getParameter("is_paid"))
            );


            boolean isAdded= bookingService.addNewBooking(newBooking,paymentInfo);

            if (isAdded) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "New Booking Added Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "New Booking Adding Failed!");
            }

        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateBooking(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            Booking booking = new Booking(
                    Integer.parseInt(request.getParameter("update_booking_id")),
                    Integer.parseInt(request.getParameter("update_selected_vehicle")),
                    request.getParameter("update_from"),
                    request.getParameter("update_to"),
                    Formats.dateTimeFormat(request.getParameter("update_from_date")),
                    Formats.dateTimeFormat(request.getParameter("update_to_date")),
                    Double.parseDouble(request.getParameter("update_total_amount")),
                    Integer.parseInt(request.getParameter("update_seat_count")),
                    Double.parseDouble(request.getParameter("update_total_distance")),
                    request.getParameter("update_customer_name"),
                    request.getParameter("update_phone"),
                    0
            );


            PaymentInfo paymentInfo = new PaymentInfo(
                    Integer.parseInt(request.getParameter("customerId")),
                    Integer.parseInt(request.getParameter("update_payment_type")),
                    Double.parseDouble(request.getParameter("update_total_amount")),
                    Double.parseDouble(request.getParameter("update_provided_amount")),
                    Integer.parseInt(request.getParameter("update_is_paid"))
            );


            boolean isUpdated= bookingService.updateBooking(booking, paymentInfo);


            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Booking Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Booking Updating Failed!");
            }

        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void changeBookingStatus(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            int status = Integer.parseInt(request.getParameter("status"));
            int bookingId = Integer.parseInt(request.getParameter("booking_id"));

            boolean isAdded= bookingService.changeBookingStatus(status,bookingId);

            if (isAdded) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Booking Status Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Booking Status Updating Failed!");
            }

        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

}


