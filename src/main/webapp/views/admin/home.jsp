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
          <table class="ctable table" style="text-align: center;">
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
                    <th scope="col" style="width: 15%; vertical-align: middle;">Status</th>
                    <th scope="col" style="width: 5%; vertical-align: middle;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td style="vertical-align: middle;">45875</td>
                    <td style="vertical-align: middle;">Instant Ride</td>
                    <td style="vertical-align: middle;">Mark</td>
                    <td style="vertical-align: middle;">GEF 4581</td>
                    <td style="vertical-align: middle;">Kandy</td>
                    <td style="vertical-align: middle;">Colombo</td>
                    <td style="vertical-align: middle;">02-March-2025 08:00 AM</td>
                    <td style="vertical-align: middle;">03-March-2025 08:00 AM</td>
                    <td style="vertical-align: middle;">2500.00</td>
                    <td class="status status-completed" style="vertical-align: middle;">Completed</td>
                    <td style="vertical-align: middle;">
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>45876</td>
                    <td>Instant Ride</td>
                    <td>Mark</td>
                    <td>GEF 4581</td>
                    <td>Kandy</td>
                    <td>Colombo</td>
                    <td>02-March-2025 08:00 AM</td>
                    <td>03-March-2025 08:00 AM</td>
                    <td>2500.00</td>
                    <td class="status status-scheduled">03-March-2025 08:00 AM</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>45877</td>
                    <td>Scheduled Ride</td>
                    <td>Mark</td>
                    <td>GEF 4581</td>
                    <td>Kandy</td>
                    <td>Colombo</td>
                    <td>02-March-2025 08:00 AM</td>
                    <td>03-March-2025 08:00 AM</td>
                    <td>2500.00</td>
                    <td class="status status-canceled">Canceled</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>45877</td>
                    <td>Scheduled Ride</td>
                    <td>Mark</td>
                    <td>GEF 4581</td>
                    <td>Kandy</td>
                    <td>Colombo</td>
                    <td>02-March-2025 08:00 AM</td>
                    <td>03-March-2025 08:00 AM</td>
                    <td>2500.00</td>
                    <td class="status status-ongoing">On Going</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        
    </body>
</html>










