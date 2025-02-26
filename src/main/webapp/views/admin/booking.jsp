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
    <style>
        .overlay {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: rgba(255, 255, 255, 0.7);
           display: flex;
           justify-content: center;
           align-items: center;
           z-index: 10;
       }
    </style>
</head>
<body id="page-top"  style="padding-top: 5px; padding-bottom: 10px;">

    <a href="customer_booking.jsp" class="btn btn-dark" style="margin-left: 5px;"><i class="zmdi zmdi-arrow-left"></i></a>

    <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
    <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>


    <!--New Booking form-->
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel1">New Booking</h5>
            </div>
            <div class="modal-body position-relative">
                <!-- Overlay (Hidden Initially) -->
                <div id="formOverlay" class="overlay d-none">
                    <i class="fa fa-spinner fa-spin" style="font-size:35px;"></i>
                </div>
                <form id="newBookingForm">
                    <input type="hidden" name="action" value="vehicle_list_by_seat">

                    <div class="row">
                        <!-- Booking Details (Left Side) -->
                        <div class="col-md-6">
                            <h5 class="mb-3">Booking Details</h5>
                            <input type="hidden" name="action" value="new_booking">

                            <div class="mb-3">
                                <label for="from_date" class="form-label">From Date</label>
                                <input type="datetime-local" class="form-control" id="from_date" name="from_date" onchange="validateChange(this.id ,this.value)">
                            </div>

                            <div class="mb-3">
                                <label for="to_date" class="form-label">To Date</label>
                                <input type="datetime-local" class="form-control" id="to_date" name="to_date" onchange="validateChange(this.id ,this.value)">
                            </div>

                            <div class="mb-3">
                                <label for="from" class="form-label">From Destination</label>
                                <input type="text" class="form-control" id="from" name="from" placeholder="Enter From Destination" oninput="validateChange(this.id ,this.value)">
                            </div>

                            <div class="mb-3">
                                <label for="to" class="form-label">To Destination</label>
                                <input type="text" class="form-control" id="to" name="to" placeholder="Enter To Destination" oninput="validateChange(this.id ,this.value)">
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="100" class="form-control" id="seat_count" name="seat_count" placeholder="Enter seat count" oninput="validateVehicle(this.value)">
                            </div>

                            <div class="mb-3">
                                <label for="select_vehicle" class="form-label">Select a Vehicle</label>
                                <select class="form-select" id="select_vehicle" name="select_vehicle">
                                    <option value="" selected disabled>Select Vehicle</option>
                                </select>
                            </div>
                        </div>

                        <!-- Customer Details (Right Side) -->
                        <div class="col-md-6">
                            <h5 class="mb-3">Customer Details</h5>

                            <input type="hidden" id="customerId" name="customerId">
                            <div class="mb-3">
                                <label for="customer_name" class="form-label">Customer Name</label>
                                <input type="text" class="form-control" id="customer_name" name="customer_name" placeholder="Enter customer name">
                            </div>

                            <div class="mb-3">
                                <label for="customer_nic" class="form-label">NIC Number</label>
                                <input type="text" class="form-control" id="customer_nic" name="customer_nic" placeholder="Enter NIC" readonly>
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter phone number">
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-3">
                        <button type="submit" class="btn btn-success">
                            <i class="fa fa-spinner fa-spin" id="nb_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <table  id="customersTable" class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col" style="width: 3%">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">NIC</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Username</th>
            <th scope="col" style="width: 5%">Actions</th>
            <th scope="col"> Book </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <jsp:include page="../../WEB-INF/includes/footer.jsp" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script> let customerId = <%= request.getParameter("cid") %>; </script>
    <jsp:include page="../../js/booking.js" />

</body>
</html>
