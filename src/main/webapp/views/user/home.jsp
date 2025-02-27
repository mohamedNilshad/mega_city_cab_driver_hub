<%@ page import="com.drivehub.util.constant.ConstantImage" %>
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


    </head>
    <body id="page-top" style="padding: 10px; padding-top: 110px; ">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <div style="padding-bottom: 5px; padding-right: 10px; float: right; display:none;">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingForm">Schedule Booking</a>
            <a href="instant_ride.jsp" class="btn btn-secondary">Instant Ride</a>
        </div>


        <div class="navbar navbar-light" style="background-color: #e3f2fd; margin-bottom: 5px;">
            <div class="navbar-brand">Cars</div>
            <a href="#" class="stretched-link" style="float:right;">See All</a>
        </div>
        <div class="row g-4">
            <div style="width:25%;">
                <div class="card">
                    <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                    <div class="card-body">
                        <h5 class="card-title">Ford F-150</h5>
                        <h6 class="card-title">Ford</h6>
                        <p class="card-text">6 Seats</p>
                        <a href="#" class="btn btn-primary">Schedule</a>
                        <a href="#" class="btn btn-success">Get Now</a>
                    </div>
                </div>
            </div>

            <div style="width:25%;">
                <div class="card">
                    <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                    <div class="card-body">
                        <h5 class="card-title">Chevrolet Silverado</h5>
                        <h6 class="card-title">Chevrolet</h6>
                        <p class="card-text">5 Seats</p>
                        <a href="#" class="btn btn-primary">Schedule</a>
                        <a href="#" class="btn btn-success">Get Now</a>
                    </div>
                </div>
            </div>

            <div style="width:25%;">
                <div class="card">
                    <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                    <div class="card-body">
                        <h5 class="card-title">Toyota Tacoma</h5>
                        <h6 class="card-title">Toyota</h6>
                        <p class="card-text">6 Seats</p>
                        <a href="#" class="btn btn-primary">Schedule</a>
                        <a href="#" class="btn btn-success">Get Now</a>
                    </div>
                </div>
            </div>

            <div style="width:25%;">
                <div class="card">
                    <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                    <div class="card-body">
                        <h5 class="card-title">RAM 1500</h5>
                        <h6 class="card-title">RAM</h6>
                        <p class="card-text">4 Seats</p>
                        <a href="#" class="btn btn-primary">Schedule</a>
                        <a href="#" class="btn btn-success">Get Now</a>
                    </div>
                </div>
            </div>
        </div>


        <dive style="margin:10px;"></div>

        <div class="navbar navbar-light" style="background-color: #e3f2fd; margin-bottom: 5px;">
            <div class="navbar-brand">Cabs</div>
                <a href="#" class="stretched-link" style="float:right;">See All</a>
            </div>
            <div class="row g-4">
                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Ford F-150</h5>
                            <h6 class="card-title">Ford</h6>
                            <p class="card-text">6 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Chevrolet Silverado</h5>
                            <h6 class="card-title">Chevrolet</h6>
                            <p class="card-text">5 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                 </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Toyota Tacoma</h5>
                            <h6 class="card-title">Toyota</h6>
                            <p class="card-text">6 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">RAM 1500</h5>
                            <h6 class="card-title">RAM</h6>
                            <p class="card-text">4 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>
            </div>

        <dive style="margin:10px;"></div>

        <div class="navbar navbar-light" style="background-color: #e3f2fd; margin-bottom: 5px;">
            <div class="navbar-brand">Vans</div>
                <a href="#" class="stretched-link" style="float:right;">See All</a>
            </div>
            <div class="row g-4">
                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Ford F-150</h5>
                            <h6 class="card-title">Ford</h6>
                            <p class="card-text">6 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Chevrolet Silverado</h5>
                            <h6 class="card-title">Chevrolet</h6>
                            <p class="card-text">5 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                 </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">Toyota Tacoma</h5>
                            <h6 class="card-title">Toyota</h6>
                            <p class="card-text">6 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>

                <div style="width:25%;">
                    <div class="card">
                        <img class="card-img-top" src="${pageContext.request.contextPath}/assets/images/cab_1.jpg" alt="cab image">
                        <div class="card-body">
                            <h5 class="card-title">RAM 1500</h5>
                            <h6 class="card-title">RAM</h6>
                            <p class="card-text">4 Seats</p>
                            <a href="#" class="btn btn-primary">Schedule</a>
                            <a href="#" class="btn btn-success">Get Now</a>
                        </div>
                    </div>
                </div>
            </div>

            <dive style="margin:10px;"></div>


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
        <script>
            document.addEventListener("DOMContentLoaded", function () {
                let now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone

                let currentDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'

                let dateTimeInput = document.getElementById("from_date");
                dateTimeInput.value = currentDateTime; // Set current date & time
                dateTimeInput.min = currentDateTime; // Disable past date & time
            });

            document.addEventListener("DOMContentLoaded", function () {
                let now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone

                let currentDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'

                let dateTimeInput = document.getElementById("to_date");
                dateTimeInput.value = currentDateTime; // Set current date & time
                dateTimeInput.min = currentDateTime; // Disable past date & time
            });
        </script>

    </body>
</html>










