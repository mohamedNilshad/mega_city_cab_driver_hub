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
            <a href="driver.jsp" class="btn btn-primary">Driver</a>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#vehicleFrom" id="newVehicleBtn">
                <i class="fa fa-spinner fa-spin" id="nv_btn_loading" style="display: none; margin-right: 5px;"></i>Add New Vehicle
            </button>
        </div>
        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>

        <table id="vehiclesTable"  class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col">Vehicle Image</th>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col">Vehicle Name</th>
                    <th scope="col">Vehicle Type</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Driver Reg. Number</th>
                    <th scope="col" style="width: 5%">Actions</th>
                </tr>
            </thead>
            <tbody>
<!--                <tr>-->
<!--                    <th scope="row">1</th>-->
<!--                    <td>-->
<!--                        <img src="${pageContext.request.contextPath}/uploads/car_1.jpg" width="50px;" height="30px;">-->
<!--                    </td>-->
<!--                    <td>CFG 2548</td>-->
<!--                    <td>3258</td>-->
<!--                    <td>David</td>-->
<!--                    <td>Toyota Car</td>-->
<!--                    <td>CFG 2548</td>-->
<!--                    <td>-->
<!--                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>-->
<!--                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>-->
<!--                    </td>-->
<!--                </tr>-->

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
                                <label for="driver" class="form-label">Select Vehicle Type</label>
                                <select class="form-select" id="v_type" name="v_type">
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="v_type" class="form-label">Vehicle Name</label>
                                <input type="text" class="form-control" id="v_name" name="v_name" placeholder="Enter Vehicle Type">
                            </div>

                            <div class="mb-3">
                                <label for="v_number" class="form-label">Vehicle Number</label>
                                <input type="text" class="form-control" id="v_number" name="v_number" placeholder="Vehicle Number">
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="100" class="form-control" id="seat_count" name="seat_count" placeholder="Enter Seat Count">
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Vehicle Image</label>
                                <input type="file" min="2" max="100" class="form-control" id="v_image" name="v_image" accept="image/*" placeholder="Select Vehicle Image">
                            </div>
                            
                            <div class="mb-3">
                                <label for="driver" class="form-label">Select an Driver</label>
                                <select class="form-select" id="driver" name="driver">
                                </select>
                            </div>
                            
                            <button type="submit" class="btn btn-success">
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
                            <div class="mb-3">
                                <label for="driver" class="form-label">Select Vehicle Type</label>
                                <select class="form-select" id="update_v_type" name="update_v_type">
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="v_type" class="form-label">Vehicle Name</label>
                                <input type="text" class="form-control" id="update_v_name" name="update_v_name" placeholder="Enter Vehicle Type">
                            </div>

                            <div class="mb-3">
                                <label for="v_number" class="form-label">Vehicle Number</label>
                                <input type="text" class="form-control" id="update_v_number" name="update_v_number" placeholder="Vehicle Number">
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="100" class="form-control" id="update_seat_count" name="update_seat_count" placeholder="Enter Seat Count">
                            </div>

                            <div style="margin-bottom:10px;">
                                <img src="" width="80px;" id="old_image"> <label for="old_image" class="form-label" id="old_image_label"></label>
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">New Vehicle Image</label>
                                <input type="file" min="2" max="100" class="form-control" id="update_v_image" name="update_v_image" accept="image/*" placeholder="Select Vehicle Image">
                            </div>

                            <div class="mb-3">
                                <label for="driver" class="form-label">Select an Driver</label>
                                <select class="form-select" id="update_driver" name="update_driver">
                                </select>
                            </div>

                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-spinner fa-spin" id="unv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>var contextPath = '${pageContext.request.contextPath}' + '/uploads/';</script>
        <jsp:include page="../../js/vehicle.js" />

    </body>
</html>
