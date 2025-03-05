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
    <body id="page-top"  style="padding-top: 5px;">

        <a href="manage_vehicle.jsp" class="btn btn-dark" style="margin-left: 5px;"><i class="zmdi zmdi-arrow-left"></i></a>

        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
        </div>
        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <button type="button" class="btn btn-primary" id="newDriverBtn" data-bs-toggle="modal" data-bs-target="#driverForm">
                <i class="fa fa-spinner fa-spin" id="btn_loading" style="display: none;"></i> Add New Driver
            </button>
        </div>

        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>


        <table id="driversTable" class="table c-table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col" style="width: 10%">Registration Number</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">NIC Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">License Type</th>
                    <th scope="col">License Expire Date</th>
                    <th scope="col" style="width: 5%">Actions</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <!--New Driver From-->
        <div class="modal fade" id="driverForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Driver</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newDriverForm">
                            <input type="hidden" name="action" value="driver_new" required>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name">
                                <span class="error_text" id="admin_new_driver_error_0"></span>
                            </div>

                            <div class="mb-3">
                                <label for="driver_nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="driver_nic" name="driver_nic" placeholder="Enter your NIC">
                                <span class="error_text" id="admin_new_driver_error_1"></span>
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter your phone number">
                                <span class="error_text" id="admin_new_driver_error_2"></span>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                                <span class="error_text" id="admin_new_driver_error_3"></span>
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" name="address" placeholder="Enter your Address">
                                <span class="error_text" id="admin_new_driver_error_4"></span>
                            </div>
                            
                            <div class="mb-3">
                                <label for="license_type" class="form-label">Select License Type</label>
                                <select class="form-select" id="license_type" name="license_type_id" required>
                                    <option value="" selected disabled>Choose an option</option>
                                </select>
                                <span class="error_text" id="admin_new_driver_error_5"></span>
                            </div>

                            <div class="mb-3">
                                <label for="license_expire" class="form-label">License Expire Date</label>
                                <input type="date" class="form-control" id="license_expire" name="license_expire" >
                                <span class="error_text" id="admin_new_driver_error_6"></span>
                            </div>


                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--Update Driver Form-->
        <div class="modal fade" id="driverUpdateForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel1">Update Driver</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="updateDriverForm">
                            <input type="hidden" name="action" value="driver_update" required>
                            <input type="hidden" name="driver_id" id="driver_id" required>

                            <div class="mb-3">
                                <label for="name" class="form-label">Registration Number</label>
                                <input type="text" class="form-control" id="reg_num" name="reg_num" readonly>
                            </div>

                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="update_name" name="update_name" placeholder="Enter your name" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_0"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="update_nic" name="update_driver_nic" placeholder="Enter your NIC" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_1"></span>
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="update_phone" name="update_phone" placeholder="Enter your phone number" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_2"></span>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="update_email" name="update_email" placeholder="Enter your email" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_3"></span>
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="update_address" name="update_address" placeholder="Enter your Address"  oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_4"></span>
                            </div>

                            <div class="mb-3">
                                <label for="license_type" class="form-label">Select License Type</label>
                                <select class="form-select" id="update_license_type" name="update_license_type_id" onchange="enableSubmitButton()">
                                </select>
                                <span class="error_text" id="admin_update_driver_error_5"></span>
                            </div>

                            <div class="mb-3">
                                <label for="license_expire" class="form-label">License Expire Date</label>
                                <input type="date" class="form-control" id="update_license_expire" name="update_license_expire" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_driver_error_6"></span>
                            </div>


                            <button type="submit" class="btn btn-primary" id="updateDriverBtn">
                                <i class="fa fa-spinner fa-spin" id="update_submit_loading" style="display: none;"></i> Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <jsp:include page="../../js/driver.js" />
        <jsp:include page="../../js/validations/validation.js" />

    </body>
</html>
