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
            .datepicker,
            .timepicker,
            .datetimepicker {
                .form-control {
                    background: #fff;
                }
            }
        </style>
    </head>
    <body id="page-top"  style="padding-top: 5px;">

        <a href="home.jsp" class="btn btn-dark" style="margin-left: 5px;"><i class="zmdi zmdi-arrow-left"></i></a>

        <div class="d-flex justify-content-end align-items-center" style="gap: 10px; padding-bottom: 5px; padding-right: 10px;">
            <input class="form-control ml-2 border border-primary" type="search" placeholder="Search" aria-label="Search" style="width: 200px;" oninput="fetchCustomers(this.value)">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#customerForm">Add New Customer</button>
        </div>

        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>

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

        <!--New Booking form-->
        <div class="modal fade" id="bookingForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel1">New Booking</h5>
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

        <!--New Customer Form-->
        <div class="modal fade" id="customerForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newCustomerForm">
                            <input type="hidden" name="action" value="customer_new" required>
                            <div class="mb-3">
                                <label for="new_customer_name" class="form-label">Customer Name</label>
                                <input type="text" class="form-control" id="new_customer_name" name="new_customer_name" placeholder="Enter your name">
                            </div>

                            <div class="mb-3">
                                <label for="new_customer_nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="new_customer_nic" name="new_customer_nic" placeholder="Enter your NIC">
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="new_phone" name="new_phone" placeholder="Enter your phone number">
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="new_address" name="new_address" placeholder="Enter your Address">
                            </div>

                            <div class="mb-3">
                                <label for="new_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="new_email" name="new_email" placeholder="Enter your Email">
                            </div>

                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username" placeholder="Enter your Username">
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Enter your Password">
                            </div>

                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--Edit Customer Form-->
        <div class="modal fade" id="editCustomerModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel2">Update Customer</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editCustomerForm">
                            <input type="hidden" name="action" value="customer_update" required>
                            <input type="hidden" name="customer_id" id="customer_id" required>
                            <div class="mb-3">
                                <label for="new_customer_name" class="form-label">Customer Name</label>
                                <input type="text" class="form-control" id="update_customer_name" name="update_customer_name" placeholder="Enter your name">
                            </div>

                            <div class="mb-3">
                                <label for="new_customer_nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="update_customer_nic" name="update_customer_nic" placeholder="Enter your NIC">
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="update_phone" name="update_phone" placeholder="Enter your phone number">
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="update_address" name="update_address" placeholder="Enter your Address">
                            </div>

                            <div class="mb-3">
                                <label for="new_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="update_email" name="update_email" placeholder="Enter your Email">
                            </div>

                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="update_username" name="update_username" placeholder="Enter your Username" readonly>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="update_password" name="update_password" placeholder="Enter your Password">
                            </div>

                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-spinner fa-spin" id="uc_btn_loading" style="display: none;"></i> Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <jsp:include page="../../js/customer.js" />

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
