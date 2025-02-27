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

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");
        try {
            if ("new_booking".equals(action)) {
                addNewBooking(request, response);
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
            PaymentInfo paymentInfo = new PaymentInfo(
                    Integer.parseInt(request.getParameter("customerId")),
                    Integer.parseInt(request.getParameter("payment_type")),
                    Double.parseDouble(request.getParameter("total_amount")),
                    0//from form
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


}


