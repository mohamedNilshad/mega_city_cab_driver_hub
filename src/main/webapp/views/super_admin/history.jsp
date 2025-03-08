<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    Integer userId = -1;
    if (sessionObj != null) {
        userId = (Integer) sessionObj.getAttribute("superAdminId");
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
        <jsp:include page="includes/header.jsp" />

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
            .crb input[type="radio"][id^="cpt"] {
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

        <div id="formOverlay" class="overlay d-none">
            <i class="fa fa-spinner fa-spin" style="font-size:35px;"></i>
        </div>

        <div class="d-flex justify-content-between align-items-center" style="padding-bottom: 5px; padding-right: 10px;">
            <input class="form-control ml-2 border border-primary" type="search" placeholder="Search" aria-label="Search" style="width: 200px;" oninput="fetchAllBookings(this.value)">
        </div>

        <table id="bookingHistoryTable" class="ctable table" style="text-align: center;">
            <thead class="thead-dark">
            <tr>
                <th scope="col" style="width: 3%; vertical-align: middle;">#</th>
                <th scope="col" style="vertical-align: middle;">Booking Number</th>
                <th scope="col" style="vertical-align: middle;">Booking Type</th>
                <th scope="col" style="vertical-align: middle;">Customer Name</th>
                <th scope="col" style="vertical-align: middle;">Vehicle Number</th>
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
                            <input type="hidden" name="action" value="change_status" required>
                            <input type="hidden" name="status" id="status" required>
                            <input type="hidden" name="booking_id" id="booking_id" required>
                            <div class="mb-3" id="meter_reading_div" style="display: none;">
                                <label for="meter_reading" class="form-label">Current Meter Reading</label>
                                <input type="number" min="5" class="form-control" id="meter_reading" step="0.1" name="meter_reading" placeholder="Enter Current Reading">
                            </div>
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

        <!--Invoice Model-->
        <div class="modal fade" id="invoiceModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="padding-top: 15px;padding-bottom: 15px;">
                    <div id="downloadBtn"></div>

                    <div class="container">
                        <div class="card">
                            <div class="card-header">
                                Invoice
                                <strong><span id="currentDate"></span></strong>
                                <span class="float-right"> <strong>Status: </strong><span id="rideStatus"></span></span>

                            </div>
                            <div class="card-body">
                                <div class="row mb-4">
                                    <div class="col-sm-6">
                                        <h6 class="mb-3">From:</h6>
                                        <div>
                                            <strong><span id="companyName"></span></strong>
                                        </div>
                                        <div id="companyAddress"></div>
                                        <div id="companyEmail"></div>
                                        <div id="companyPhone"></div>
                                    </div>

                                    <div class="col-sm-6"  style="text-align: right;">
                                        <h6 class="mb-3">To:</h6>
                                        <div>
                                            <strong><span id="customerName"></span></strong>
                                        </div>
                                        <div id="customerAddress"></div>
                                        <div id="customerEmail"></div>
                                        <div id="customerPhone"></div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row mb-4">
                                    <div class="col-sm-6">
                                        <div>
                                            <span style="font-weight: 600;">Booking No :</span><strong><span id="bookingNo"></span></strong>
                                        </div>
                                        <div><span style="font-weight: 600;">Booking Type : </span> <span id="iBookingType"></span></div>
                                        <div><span style="font-weight: 600;">Start Date : </span><span id="iStartDate"></span></div>
                                        <div><span style="font-weight: 600;">End Date : </span><span id="iEndDate"></span></div>
                                        <div><span style="font-weight: 600;">Total Amount : </span><span id="iTotalAmount"></span></div>
                                    </div>
                                    <div class="col-sm-6" style="text-align: right;">
                                        <div>
                                            <span style="font-weight: 600;">Total Days:</span><strong><span id="iTotalDays"></span></strong>
                                        </div>
                                        <div><span style="font-weight: 600;">Start Meter Reading :</span> <span id="iStartMeterReading"></span></div>
                                        <div><span style="font-weight: 600;">End Meter Reading : </span><span id="iEndMeterReading"></span></div>
                                        <div><span style="font-weight: 600;">Total Distance KM: </span><span id="iTotalDistance"></span></div>
                                    </div>
                                </div>

                                <div class="table-responsive-sm">
                                    <table class="table table-striped" id="invoiceListTable">
                                        <thead>
                                        <tr>
                                            <th class="center">#</th>
                                            <th>Ref. No</th>
                                            <th>Payment Type</th>
                                            <th class="center">Date</th>
                                            <th class="right" style="text-align: right;">Amount(LKR)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="row">
                                    <div class="rubber_stamp" id="rubberStamp"></div>
                                    <div class="col-lg-6 col-sm-5 ml-auto">
                                        <table class="table table-clear">
                                            <tbody>
                                            <tr style="text-align: right;">
                                                <td class="left">
                                                    Total Amount To Pay
                                                </td>
                                                <td class="right">
                                                    <strong id="iTotalAmountToPay"></strong>
                                                </td>
                                            </tr>
                                            <tr style="text-align: right;">
                                                <td class="left">
                                                    Paid Amount
                                                </td>
                                                <td class="right">
                                                    <strong id="iTotalPaidAmount"></strong>
                                                </td>
                                            </tr>
                                            <tr style="text-align: right;">
                                                <td class="left">
                                                    Balance Amount
                                                </td>
                                                <td class="right">
                                                    <strong id="iTotalBalAmount"></strong>
                                                </td>
                                            </tr>
                                            <tr style="text-align: right;">
                                                <td class="left">
                                                    Return Amount
                                                </td>
                                                <td class="right">
                                                    <strong id="iReturnAmount"></strong>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Custom payment-->
        <div class="modal fade" id="customPaymentTypeModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel6">Choose Payment Type</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="customPaymentTypeForm">
                            <input type="hidden" name="action" value="custom_cash_payment" required>
                            <input type="hidden" id="bookingIdForCustomPay" name="bookingIdForCustomPay" required>
                            <input type="hidden" id="customerIdForCustomPay" name="customerIdForCustomPay" required>
                            <input type="hidden" id="paymentTypeForCustomPay" name="paymentTypeForCustomPay" value="1" required>
                            <input type="hidden" id="totalAmountForCustomPay" name="totalAmountForCustomPay" required>
                            <input type="hidden" id="balanceAmountForCustomPay" name="balanceAmountForCustomPay" required>

                            <div class="row justify-content-center">
                                <div class="mb-3" id="selectCPaymentType">
                                    <div class="row g-4 crb" id="cPaymentType">
                                        <div style="width:50%;" class="p-img">
                                            <input type="radio" id="cpt1" name="cPaymentTypeSelection" value="1" onclick="cPaymentTypeChanged(this.value)">
                                            <label for="cpt1">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h6 class="card-title">Cash</h6>
                                                        <p class="card-text"> Cash on the spot</p>
                                                    </div>
                                                </div>
                                                <div class="form-check" id="cPayNow" style="display: none;">
                                                    <label class="form-check-label">
                                                        <input type="checkbox" class="form-check-input" id="cIsPayNow" name="cIsPayNow" onclick="cPayNowValidation()">Pay Now
                                                    </label>
                                                </div>
                                            </label>

                                        </div>
                                        <div style="width:50%;" class="p-img">
                                            <input type="radio" id="cpt2" name="cPaymentTypeSelection" value="2" checked onclick="cPaymentTypeChanged(this.value)">
                                            <label for="cpt2">
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

                                <div class="mb-3" id="balanceAmountField" style="display: block;">
                                    <label for="balanceAmount" class="form-label">Enter Amount(LKR)</label>
                                    <input type="number" step="0.1" min="1" class="form-control" id="balanceAmount" name="balanceAmount" placeholder="Enter Amount" oninput="enablePaymentButtons()" required>
                                    <span class="error_text" id="c_pay_now_amount_error"></span>
                                </div>
                            </div>
                            <div class="row justify-content-center" id="cPaymentTypeBtn">
                                <button type="button" class="btn btn-primary" style="width: 40%;" onclick="openCustomCardPaymentModel()" id="cCardPaymentNextBtn">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Custom Card payment-->
        <div class="modal fade" id="customCardPaymentModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel7">Online Payment Gateway</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="custom-box">
                                <div class="custom-box-inner">
                                    <div>
                                        <p class="fw-bold">Payment Details</p>
                                        <p class="dis mb-3">Complete your purchase by providing your payment details</p>
                                    </div>

                                    <form id="cCardPaymentTypeForm">
                                        <input type="hidden" name="action" value="custom_card_payment" required>
                                        <input type="hidden" name="paymentTypeForCustomPay" value="2" required>
                                        <input type="hidden" id="bookingIdForCustomPayCard" name="bookingIdForCustomPay" required>
                                        <input type="hidden" id="customerIdForCustomPayCard" name="customerIdForCustomPay" required>
                                        <input type="hidden" id="totalAmountForCustomPayCard" name="totalAmountForCustomPay" required>
                                        <input type="hidden" id="balanceAmountForCustomPayCard" name="balanceAmountForCustomPay" required>

                                        <div>
                                            <label class="dis fw-bold mb-2">Card details</label>
                                            <div class="d-flex align-items-center justify-content-between custom-card-with-border">
                                                <i class="fab fa-brands fa-cc-visa"></i>
                                                <input type="text" class="form-control custom-input" placeholder="Card Number" name="cardNumber" pattern="^\d{14,}$" title="Invalid Card Number" minlength="14" required>
                                            </div>

                                            <div class="d-flex justify-content-between mt-2">
                                                <input type="text" class="form-control" placeholder="MM/YY" required>
                                                <div class="w-50"></div>
                                                <input type="password" maxlength="3" class="form-control" placeholder="CVV" required>
                                            </div>
                                            <div class="my-3 custom-cardholder">
                                                <label class="dis fw-bold mb-2">Cardholder Name</label>
                                                <input class="form-control" type="text" placeholder="Full Name" name="cardHolderName" required>
                                            </div>
                                            <div class="custom-address">
                                                <div class="d-flex flex-column dis">
                                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                                        <p class="fw-bold">Total</p>
                                                        <p class="fw-bold">LKR <span id="pay_amount"></span></p>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary custom-btn mt-2">Pay LKR <span id="pay_amount_btn"></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

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
        <jsp:include page="../../js/invoice/invoice.js" />

        <jsp:include page="../../js/history.js" />
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










