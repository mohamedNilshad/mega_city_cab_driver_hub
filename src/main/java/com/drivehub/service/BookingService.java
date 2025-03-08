package com.drivehub.service;
import com.drivehub.dao.BookingDAO;
import com.drivehub.model.Booking;
import com.drivehub.model.PaymentInfo;
import com.drivehub.model.Vehicle;
import com.drivehub.model.VisaCardDetails;

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

    public Booking getAllReadings(int bookingId) {
        return bookingDAO.getAllReadings(bookingId);
    }

    public List<Booking> getScheduledBookings(String keyword) {
        return bookingDAO.getScheduledBookings(keyword);
    }

    public List<Booking> getAllBookings(String keyword) {
        return bookingDAO.getAllBookings(keyword);
    }

    public Boolean addNewBooking(Booking booking, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {
        return bookingDAO.addNewBooking(booking, paymentInfo, cardDetails);
    }

    public Boolean customCashPayment(int bookingId, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {
        return bookingDAO.customCashPayment(bookingId, paymentInfo, cardDetails);
    }

    public Boolean updateBooking(Booking booking, PaymentInfo paymentInfo, VisaCardDetails cardDetails) {
        return bookingDAO.updateBooking(booking, paymentInfo, cardDetails);
    }

    public Boolean updateFinalAmount(int bookingId, double finalAmount) {
        return bookingDAO.updateFinalAmount(bookingId, finalAmount);
    }

    public Boolean changeBookingStatus(int status, int bookingId, String meterReading) {
        return bookingDAO.changeBookingStatus( status, bookingId, meterReading);
    }
}
