package com.drivehub.service;
import com.drivehub.dao.BookingDAO;
import com.drivehub.model.Booking;
import com.drivehub.model.Vehicle;

import java.sql.Timestamp;
import java.util.List;

public class BookingService {

    private final BookingDAO bookingDAO = new BookingDAO();

    public List<Vehicle> getVehiclesBySeat(int seatCount, Timestamp startDate, Timestamp endDate) {
        return bookingDAO.getVehicleListBySeat(seatCount, startDate, endDate);
    }

    public Boolean addNewBooking(Booking booking) {
        return bookingDAO.addNewBooking(booking);
    }
}
