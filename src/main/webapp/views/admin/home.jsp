<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    Integer userId = -1;
    if (sessionObj != null) {
        userId = (Integer) sessionObj.getAttribute("adminId");
        if(userId == null){
            response.sendRedirect("../../index.jsp");
        }
    } else {
        response.sendRedirect("../../index.jsp");
    }
%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/admin_header.jsp" />

    </head>
    <body id="page-top"  style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />

        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <a href="customer_booking.jsp" class="btn btn-primary">New Customer Booking</a>
        </div>
        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>s

        <table id="bookingsTable" class="ctable table" style="text-align: center;">
            <thead class="thead-dark">
            <tr>
                <th scope="col" style="width: 3%; vertical-align: middle;">#</th>
                <th scope="col" style="vertical-align: middle;">Booking Number</th>
                <th scope="col" style="vertical-align: middle;">Booking Type</th>
                <th scope="col" style="vertical-align: middle;">Customer Name</th>
                <th scope="col" style="vertical-align: middle;">Customer NIC</th>
                <th scope="col" style="vertical-align: middle;">Vehicle Number</th>
                <th scope="col" style="vertical-align: middle;">From</th>
                <th scope="col" style="vertical-align: middle;">To</th>
                <th scope="col" style="vertical-align: middle;">Start Date</th>
                <th scope="col" style="vertical-align: middle;">End Date</th>
                <th scope="col" style="vertical-align: middle;">Total Amount (LKR)</th>
                <th scope="col" style="width: 15%; vertical-align: middle;">Status</th>
                <th scope="col" style="width: 5%; vertical-align: middle;">Actions</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <!-- Status Change Confirmation-->
        <div class="modal fade" id="confirmStatusChangeModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="statusLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <p style="margin-left:15px;">Are you sure you want to <span id="subtitle" style="font-weight: bold;"> </span> this ?</p>
                    <div class="modal-body">
                        <form id="changeStatusForm">
                            <input type="hidden" name="action" value="change_change" required>
                            <input type="hidden" name="status" id="status" required>
                            <input type="hidden" name="booking_id" id="booking_id" required>

                            <div class="row justify-content-center">
                                <button type="submit" class="btn btn-success me-2" style="width: 40%;">
                                    <i class="fa fa-spinner fa-spin" id="cs_btn_loading" style="display: none; margin-right: 5px;"></i>Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <jsp:include page="../../js/home.js" />
        
    </body>
</html>










