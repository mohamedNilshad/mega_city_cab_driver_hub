<%@ page import="com.driverhub.utils.ConstantStrings" %>
<%@ page import="com.driverhub.utils.ConstantImage" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/user_header.jsp" />

    </head>
    <body id="page-top" style="padding-top: 110px; padding-bottom: 10px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingForm">Schedule Booking</a>
            <a href="instant_ride.jsp" class="btn btn-secondary">Instant Ride</a>
        </div>

        <table class="table" style="text-align: center;">
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










