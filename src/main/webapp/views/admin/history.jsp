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

        .rubber_stamp {
          font-family: 'Vollkorn', serif;
          font-size: 39px;
          line-height: 45px;
          text-transform: uppercase;
          font-weight: bold;
          color: green;
          border: 7px solid green;
          float: left;
          padding: 10px 20px;
          border-radius: 10px;
          width: auto;
          height: auto;

          opacity: 0.8;
          -webkit-transform: rotate(-10deg);
          -o-transform: rotate(-10deg);
          -moz-transform: rotate(-10deg);
          -ms-transform: rotate(-10deg);
          position:absolute;
          bottom:10%;
          left: 10%;
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
                                <div class="col-sm-6">
                                    <div>
                                        <span style="font-weight: 600;">Booking No :</span><strong><span id="bookingNo"></span></strong>
                                    </div>
                                    <div><span style="font-weight: 600;">Booking Type :</span> <span id="iBookingType"></span></div>
                                    <div><span style="font-weight: 600;">Start Date : </span><span id="iStartDate"></span></div>
                                    <div><span style="font-weight: 600;">End Date : </span><span id="iEndDate"></span></div>
                                    <div><span style="font-weight: 600;">Total Amount : </span><span id="iTotalAmount"></span></div>
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










