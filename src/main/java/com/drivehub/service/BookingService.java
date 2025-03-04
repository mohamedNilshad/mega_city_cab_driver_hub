package com.drivehub.service;
import com.drivehub.dao.BookingDAO;
import com.drivehub.model.Booking;
import com.drivehub.model.PaymentInfo;
import com.drivehub.model.Vehicle;

import java.sql.Timestamp;
import java.util.List;

public class BookingService {

    private final BookingDAO bookingDAO = new BookingDAO();

    public List<Vehicle> getVehiclesBySeat(int vType, Timestamp startDate, Timestamp endDate) {
        return bookingDAO.getVehicleListBySeat(vType, startDate, endDate);
    }

    public List<Booking> getUserBookings(int customerId) {
        return bookingDAO.getUserBookings(customerId);
    }

    public Booking getBookingInvoice(int bookingId) {
        return bookingDAO.getBookingInvoice(bookingId);
    }

    public List<Booking> getScheduledBookings() {
        return bookingDAO.getScheduledBookings();
    }

    public List<Booking> getAllBookings() {
        return bookingDAO.getAllBookings();
    }

    public Boolean addNewBooking(Booking booking, PaymentInfo paymentInfo) {
        return bookingDAO.addNewBooking(booking, paymentInfo);
    }

    public Boolean updateBooking(Booking booking, PaymentInfo paymentInfo) {
        return bookingDAO.updateBooking(booking, paymentInfo);
    }

    public Boolean changeBookingStatus(int status, int bookingId, String meterReading) {
        return bookingDAO.changeBookingStatus( status, bookingId, meterReading);
    }
}
