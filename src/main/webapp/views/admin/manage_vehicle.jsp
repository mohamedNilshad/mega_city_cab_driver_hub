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

<html lang="en">
    <head>
        <jsp:include page="includes/admin_header.jsp" />
        <style>

             .text-container {
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
            }

            .text-container:hover {
                white-space: normal;
                overflow: visible;
                background: white;
                position: absolute;
                z-index: 10;
                padding: 5px;
                border: 1px solid #ccc;
            }
        </style>
    </head>
    <body id="page-top"  style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />


        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <a href="driver.jsp" class="btn btn-primary">Driver</a>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#vehicleFrom" id="newVehicleBtn">
                <i class="fa fa-spinner fa-spin" id="nv_btn_loading" style="display: none; margin-right: 5px;"></i>Add New Vehicle
            </button>
        </div>
        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>

        <table id="vehiclesTable" class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col">Vehicle Image</th>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col">Vehicle Name</th>
                    <th scope="col">Vehicle Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Driver Reg. Number</th>
                    <th scope="col" style="width: 5%">Actions</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <!--Vehicle insert From-->
        <div class="modal fade" id="vehicleFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Vehicle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form enctype="multipart/form-data" id="addNewVehicle">
                            <input type="hidden" name="action" value="vehicle_new" required>
                            <div class="mb-3">
                                <label for="v_type" class="form-label">Select Vehicle Type</label>
                                <select class="form-select" id="v_type" name="v_type" required> </select>
                                <span class="error_text" id="admin_new_vehicle_error_0"></span>
                            </div>

                            <div class="mb-3">
                                <label for="v_name" class="form-label">Vehicle Name</label>
                                <input type="text" class="form-control" id="v_name" name="v_name" placeholder="Enter Vehicle Type">
                                <span class="error_text" id="admin_new_vehicle_error_1"></span>
                            </div>

                            <div class="mb-3">
                                <label for="v_number" class="form-label">Vehicle Number</label>
                                <input type="text" class="form-control" id="v_number" name="v_number" placeholder="Vehicle Number">
                                <span class="error_text" id="admin_new_vehicle_error_2"></span>
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="20" class="form-control" id="seat_count" name="seat_count" placeholder="Enter Seat Count">
                                <span class="error_text" id="admin_new_vehicle_error_3"></span>
                            </div>

                            <div class="mb-3">
                                <label for="v_image" class="form-label">Vehicle Image</label>
                                <input type="file" min="2" max="100" class="form-control" id="v_image" name="v_image" accept="image/*" placeholder="Select Vehicle Image">
                                <span class="error_text" id="admin_new_vehicle_error_6"></span>
                            </div>

                            <div class="mb-3">
                                <label for="v_description" class="form-label">Description</label>
                                <textarea class="form-control" id="v_description" name="v_description" placeholder="Enter Description"></textarea>
                                <span class="error_text" id="admin_new_vehicle_error_4"></span>
                            </div>
                            
                            <div class="mb-3">
                                <label for="driver" class="form-label">Select an Driver</label>
                                <select class="form-select" id="driver" name="driver" required></select>
                                <span class="error_text" id="admin_new_vehicle_error_5"></span>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">
                                <i class="fa fa-spinner fa-spin" id="snv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--Vehicle update From-->
        <div class="modal fade" id="vehicleUpdateFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel1">Update Vehicle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <form enctype="multipart/form-data" id="updateNewVehicle">
                            <input type="hidden" name="action" value="vehicle_update" required>
                            <input type="hidden" name="vehicle_id" id="vehicle_id" required>
                            <input type="hidden" name="old_v_image" id="old_v_image" required>
                            <input type="hidden" name="old_driver_id" id="old_driver_id" required>
                            <div class="mb-3">
                                <label for="update_v_type" class="form-label">Select Vehicle Type</label>
                                <select class="form-select" id="update_v_type" name="update_v_type" onchange="enableSubmitButton()"></select>
                                <span class="error_text" id="admin_update_vehicle_error_0"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_v_name" class="form-label">Vehicle Name</label>
                                <input type="text" class="form-control" id="update_v_name" name="update_v_name" placeholder="Enter Vehicle Name" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_vehicle_error_1"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_v_number" class="form-label">Vehicle Number</label>
                                <input type="text" class="form-control" id="update_v_number" name="update_v_number" placeholder="Vehicle Number" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_vehicle_error_2"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="100" class="form-control" id="update_seat_count" name="update_seat_count" placeholder="Enter Seat Count" oninput="enableSubmitButton()">
                                <span class="error_text" id="admin_update_vehicle_error_3"></span>
                            </div>

                            <div style="margin-bottom:10px;">
                                <img src="" width="80px;" id="old_image"> <label for="old_image" class="form-label" id="old_image_label"></label>
                            </div>

                            <div class="mb-3">
                                <label for="update_v_image" class="form-label">New Vehicle Image</label>
                                <input type="file" min="2" max="100" class="form-control" id="update_v_image" name="update_v_image" accept="image/*" placeholder="Select Vehicle Image" onchange="enableSubmitButton()" >
                                <span class="error_text" id="admin_update_vehicle_error_6"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_v_description" class="form-label">Description</label>
                                <textarea class="form-control" id="update_v_description" name="update_v_description" placeholder="Enter Description" oninput="enableSubmitButton()"></textarea>
                                <span class="error_text" id="admin_update_vehicle_error_4"></span>
                            </div>

                            <div class="mb-3">
                                <label for="update_driver" class="form-label">Select an Driver</label>
                                <select class="form-select" id="update_driver" name="update_driver" onchange="enableSubmitButton()"></select>
                                <span class="error_text" id="admin_update_vehicle_error_5"></span>
                            </div>

                            <button type="submit" class="btn btn-success" id="updateVehicleBtn">
                                <i class="fa fa-spinner fa-spin" id="unv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation-->
        <div class="modal fade" id="deleteVehicleForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel2">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <p style="margin-left:15px;">Are you sure you want to delete this item?</p>
                    <div class="modal-body">
                        <form id="deleteVehicle">
                            <input type="hidden" name="action" value="vehicle_delete" required>
                            <input type="hidden" name="d_v_id" id="d_v_id" required>
                            <input type="hidden" name="d_driver_id" id="d_driver_id" required>
                            <input type="hidden" name="d_image_name" id="d_image_name" required>

                            <div class="row justify-content-center">
                                <button type="submit" class="btn btn-danger me-2" style="width: 40%;">
                                    <i class="fa fa-spinner fa-spin" id="dv_btn_loading" style="display: none; margin-right: 5px;"></i>Delete
                                </button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="width: 40%;">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>var contextPath = '${pageContext.request.contextPath}' + '/uploads/';</script>
        <jsp:include page="../../js/vehicle.js" />
        <jsp:include page="../../js/validations/validation.js" />

    </body>
</html>
