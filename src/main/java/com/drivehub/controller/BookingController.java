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
        }else if ("get_all_bookings".equals(action)) {
            getAllBookings(response);
        }else if ("get_invoice_data".equals(action)) {
            getBookingInvoice(request, response);
        }else if ("get_all_readings".equals(action)) {
            getAllReadings(request, response);
        }
    }

    private void getAllReadings(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            int bookingId = Integer.parseInt(request.getParameter("book_id"));

            Booking bookingDetails = bookingService.getAllReadings(bookingId);

            if(bookingDetails != null){

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Readings Fetched Successfully");
                jsonResponse.put("data", bookingDetails.toJson());
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

    private void getVehicleListBySeat(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            int vType = Integer.parseInt(request.getParameter("vehicle_type"));
            Timestamp startDate = Formats.dateTimeFormat(request.getParameter("start_date"));
            Timestamp endDate = Formats.dateTimeFormat(request.getParameter("end_date"));

            List<Vehicle> vehicles = bookingService.getVehiclesBySeat(vType, startDate, endDate);

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

    private void getBookingInvoice(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            int bookingId = Integer.parseInt(request.getParameter("bookingId"));

            Booking bookingDetails = bookingService.getBookingInvoice(bookingId);

            if(bookingDetails != null){

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Booking Invoice Fetched Successfully");
                jsonResponse.put("data", bookingDetails.toJson());
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

    private void getAllBookings( HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {

            List<Booking> bookings = bookingService.getAllBookings();

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
            }else if ("change_status".equals(action)) {
                changeBookingStatus(request, response);
            }else if ("update_booking".equals(action)) {
                updateBooking(request, response);
            }else if ("update_final_amount".equals(action)) {
                updateFinalAmount(request, response);
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
                    1,//from form instant or schedule
                    Formats.dateTimeFormat(request.getParameter("from_date")),
                    Formats.dateTimeFormat(request.getParameter("to_date")),
                    Double.parseDouble(request.getParameter("total_amount")),
                    Double.parseDouble(request.getParameter("total_distance")),
                    request.getParameter("customer_name"),
                    request.getParameter("phone"),
                    0
            );

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
                    Formats.dateTimeFormat(request.getParameter("update_from_date")),
                    Formats.dateTimeFormat(request.getParameter("update_to_date")),
                    Double.parseDouble(request.getParameter("update_total_amount")),
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

    private void updateFinalAmount(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            int bookingId = Integer.parseInt(request.getParameter("bookingId"));
            double finalAmount = Double.parseDouble(request.getParameter("finalAmount"));

            boolean isUpdated= bookingService.updateFinalAmount(bookingId, finalAmount);


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
            String meterReading = request.getParameter("meter_reading");

            boolean isAdded= bookingService.changeBookingStatus(status, bookingId, meterReading);

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


