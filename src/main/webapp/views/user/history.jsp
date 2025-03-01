<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    Integer userId = -1;
    if (sessionObj != null) {
        userId = (Integer) sessionObj.getAttribute("userId");
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
        <jsp:include page="includes/user_header.jsp" />
    <style>

        .hide-text {
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .crb input[type="radio"][id^="cb"] {
          display: none;
        }
        .crb input[type="radio"][id^="pt"] {
          display: none;
        }

        .crb label {
          border: 1px solid #fff;
          padding: 5px;
          display: block;
          position: relative;
          cursor: pointer;
          text-align: left;
        }

        .crb label:before {
          background-color: white;
          color: white;
          content: " ";
          display: block;
          border-radius: 50%;
          border: 1px solid grey;
          position: absolute;
          top: -5px;
          left: -5px;
          width: 25px;
          height: 25px;
          text-align: center;
          line-height: 28px;
          transition-duration: 0.4s;
          transform: scale(0);
        }

        crb label .cimg .p-img {
          transition-duration: 0.2s;
          transform-origin: 50% 50%;
        }

        .crb input[type="radio"]:checked + label {
          border-color: #2154a6;
        }

        .crb input[type="radio"]:checked + label:before {
          content: "✓";
          text-align: center;
          background-color: grey;
          transform: scale(1);
          z-index:1;
        }

    </style>
    </head>
    <body id="page-top" style="padding-top: 110px; padding-bottom: 10px; ">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />

        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>

        <table id="userBookingTable" class="ctable table" style="text-align: center;">
            <thead class="thead-dark">
            <tr>
                <th scope="col" style="width: 3%; vertical-align: middle;">#</th>
                <th scope="col" style="vertical-align: middle;">Booking Number</th>
                <th scope="col" style="vertical-align: middle;">Booking Type</th>
                <th scope="col" style="vertical-align: middle;">Customer Name</th>
                <th scope="col" style="vertical-align: middle;">Vehicle Number</th>
                <th scope="col" style="vertical-align: middle;">From</th>
                <th scope="col" style="vertical-align: middle;">To</th>
                <th scope="col" style="vertical-align: middle;">Start Date</th>
                <th scope="col" style="vertical-align: middle;">End Date</th>
                <th scope="col" style="vertical-align: middle;">Total Amount (LKR)</th>
                <th scope="col" style="vertical-align: middle;">Is Paid</th>
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

        <!--Booking update From-->
        <div class="modal fade" id="editBookingModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel5">Update Booking</h5>
                    </div>
                    <div class="modal-body position-relative">
                        <!-- Overlay (Hidden Initially) -->
                        <div id="formOverlay1" class="overlay d-none">
                            <i class="fa fa-spinner fa-spin" style="font-size:35px;"></i>
                        </div>
                        <form id="updateBookingForm">
                            <input type="hidden" name="action" value="update_booking">
                            <input type="hidden" name="update_booking_id" id="update_booking_id">
                            <input type="hidden" name="update_payment_type" id="update_payment_type">
                            <input type="hidden" name="update_selected_vehicle" id="update_selected_vehicle">

                            <input type="hidden" name="selected_vehicle" id="old_selected_vehicle">
                            <input type="hidden" name="selected_v_type" id="old_selected_v_type">

                            <input type="hidden" name="update_provided_amount" id="update_provided_amount">
                            <input type="hidden" name="update_is_paid" id="update_is_paid">
                            <input type="hidden" id="enable" value="0">

                            <div class="row">
                                <!-- Booking Details (Left Side) -->
                                <div class="col-md-6">
                                    <h5 class="mb-3">Booking Details</h5>

                                    <div class="mb-3">
                                        <label for="update_v_type" class="form-label">Select Vehicle Type</label>
                                        <select class="form-select" id="update_v_type" name="v_type" onchange="validateChange(this.id ,this.value, true)">
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_from_date" class="form-label">From Date</label>
                                        <input type="datetime-local" class="form-control" id="update_from_date" name="update_from_date" onchange="validateChange(this.id ,this.value, true)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_to_date" class="form-label">To Date</label>
                                        <input type="datetime-local" class="form-control" id="update_to_date" name="update_to_date" onchange="validateChange(this.id ,this.value, true)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_from" class="form-label">From Destination</label>
                                        <input type="text" class="form-control" id="update_from" name="update_from" placeholder="Enter From Destination" oninput="validateChange(this.id ,this.value, true)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_to" class="form-label">To Destination</label>
                                        <input type="text" class="form-control" id="update_to" name="update_to" placeholder="Enter To Destination" oninput="validateChange(this.id ,this.value, true)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_seat_count" class="form-label">Seat Count</label>
                                        <input type="number" min="2" max="100" class="form-control" id="update_seat_count" name="update_seat_count" placeholder="Enter seat count" oninput="updateValidateVehicle()">
                                    </div>

                                    <div class="mb-3" id="updateSelectVehicle" style="display:block;">
                                        <label for="updateVehicleList" class="form-label">Select a Vehicle</label>
                                        <div class="row g-4 crb" id="updateVehicleList"></div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_total_distance" class="form-label">Total Distance (Approximately) (KM)</label>
                                        <input type="number" min="5" class="form-control" id="update_total_distance" step="0.1" name="update_total_distance" placeholder="Enter Distance(KM)" oninput="calculateTotalAmount(this.value, true)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_total_distance" class="form-label">Total Amount(LKR)</label>
                                        <input type="text" class="form-control" id="update_total_amount" name="update_total_amount" placeholder="Total Amount (LKR)" readonly>
                                    </div>
                                </div>

                                <!-- Customer Details (Right Side) -->
                                <div class="col-md-6">
                                    <h5 class="mb-3">Passenger Details</h5>

                                    <input type="hidden" id="updateCustomerId" name="customerId">
                                    <div class="mb-3">
                                        <label for="update_customer_name" class="form-label">Passenger Name</label>
                                        <input type="text" class="form-control" id="update_customer_name" name="update_customer_name" placeholder="Enter customer name">
                                    </div>

                                    <div class="mb-3">
                                        <label for="update_customer_nic" class="form-label">User NIC Number</label>
                                        <input type="text" class="form-control" id="update_customer_nic" name="customer_nic" placeholder="Enter NIC" readonly>
                                    </div>

                                    <div class="mb-3">
                                        <label for="phone" class="form-label">Passenger Phone</label>
                                        <input type="text" class="form-control" id="update_phone" name="update_phone" placeholder="Enter phone number">
                                    </div>
                                </div>
                            </div>

                            <div class="text-center mt-3" id="update_btn">
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Choose payment Type / Cash payment-->
        <div class="modal fade" id="paymentTypeModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel3">Choose Payment Type</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="paymentType1Form">
                            <input type="hidden" name="action" value="cash_payment" required>
                            <input type="hidden" name="action" id="balance_amount" value="-1" required>
                            <input type="hidden" id="is_update" value="false" required>


                            <div class="row justify-content-center">
                                <div class="mb-3" id="selectPaymentType">
                                    <div class="row g-4 crb" id="paymentType">
                                        <div style="width:50%;" class="p-img">
                                            <input type="radio" id="pt1" name="paymentTypeSelection" value="1" onclick="paymentTypeChanged(this.value)">
                                            <label for="pt1">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h6 class="card-title">Cash</h6>
                                                        <p class="card-text"> Cash on the spot</p>
                                                    </div>
                                                </div>
                                                <div class="form-check" id="payNow" style="display: none;">
                                                    <label class="form-check-label">
                                                        <input type="checkbox" class="form-check-input" id="isPayNow" onclick="payNowValidation()">Pay Now
                                                    </label>
                                                </div>
                                            </label>

                                        </div>
                                        <div style="width:50%;" class="p-img">
                                            <input type="radio" id="pt2" name="paymentTypeSelection" value="2" checked onclick="paymentTypeChanged(this.value)">
                                            <label for="pt2">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h6 class="card-title">Card</h6>
                                                        <p class="card-text"> Online Payment</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3" id="payNowAmountField" style="display: none;">
                                    <label for="phone" class="form-label">Enter Amount(LKR)</label>
                                    <input type="number" step="0.1" min="1" class="form-control" id="payNowAmount" name="payNowAmount" placeholder="Enter Amount">
                                </div>
                            </div>
                            <div class="row justify-content-center" id="paymentTypeBtn">
                                <button type="button" class="btn btn-primary" style="width: 40%;"  data-bs-toggle="modal" data-bs-target="#cardPaymentModel">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card payment-->
        <div class="modal fade" id="cardPaymentModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel2">Online Payment Gateway</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="cardPaymentTypeForm">
                            <input type="hidden" name="action" value="card_payment" required>
                            <input type="hidden" name="payment_type" value="2" required>

                            <div class="row justify-content-center" id="cardPaymentBtn">
                                <button type="submit" class="btn btn-success" style="width: 40%;">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <!--New Booking form-->
        <div class="modal fade" id="bookingForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Booking</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Customer Name</label>
                                <input type="text" class="form-control" id="customer_name" name="customer_name" placeholder="Enter your name" value="Mark">
                            </div>

                            <div class="mb-3">
                                <label for="nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="customer_nic" name="customer_nic" placeholder="Enter your NIC" readonly="" value="1234567890 V">
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="phone" placeholder="Enter your phone number" value="0771234567">
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" address="address" placeholder="Enter your Address" value="Kandy">
                            </div>

                            <div class="mb-3">
                                <label for="from" class="form-label">From Destination</label>
                                <input type="text" class="form-control" id="from" name="from" placeholder="Enter your From Destination">
                            </div>

                            <div class="mb-3">
                                <label for="from" class="form-label">To Destination</label>
                                <input type="text" class="form-control" id="to" name="to" placeholder="Enter your To Destination">
                            </div>

                            <div class="mb-3">
                                <label for="from_date" class="form-label">From Time</label>
                                <input type="datetime-local" class="form-control" id="from_date" name="from_date">
                            </div>

                            <div class="mb-3">
                                <label for="to_date" class="form-label">To Time</label>
                                <input type="datetime-local" class="form-control" id="to_date" name="to_date" >
                            </div>


                            <div class="mb-3">
                                <label for="select_vehical" class="form-label">Select an Vehicle</label>
                                <select class="form-select" id="select_vehical" name="select_vehical">
                                    <option value="" selected disabled>Choose an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>

                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
            let customerId = <%= userId %>;
            var contextPath = '${pageContext.request.contextPath}' + '/uploads/';
        </script>
        <jsp:include page="../../js/user/booking.js" />
        <script>
            function onMouseOver(id) {
             document.getElementById(id).style.whiteSpace = "wrap";
             document.getElementById(id).style.overflow = "visible";
            }
            function onMouseLeave(id) {
                document.getElementById(id).style.whiteSpace = "nowrap";
                document.getElementById(id).style.overflow = "hidden";
            }
        </script>

    </body>
</html>










