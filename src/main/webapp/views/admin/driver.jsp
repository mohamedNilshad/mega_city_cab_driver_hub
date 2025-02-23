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
                <i class="fa fa-spinner fa-spin" id="btn_loading"  style="display: none;"></i> Add New Driver
            </button>
        </div>

        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>


        <table  id="driversTable" class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col" style="width: 15%">Registration Number</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">NIC Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">License Type</th>
                    <th scope="col">License Expire Date</th>
                    <th scope="col" style="width: 10%">Actions</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <!--Driver From-->
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
                            </div>

                            <div class="mb-3">
                                <label for="nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="driver_nic" name="driver_nic" placeholder="Enter your NIC">
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter your phone number">
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" name="address" placeholder="Enter your Address">
                            </div>
                            
                            <div class="mb-3">
                                <label for="license_type" class="form-label">Select License Type</label>
                                <select class="form-select" id="license_type" name="license_type_id">
                                    <option value="" selected disabled>Choose an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>


                            <div class="mb-3">
                                <label for="license_expire" class="form-label">License Expire Date</label>
                                <input type="date" class="form-control" id="license_expire" name="license_expire" >
                            </div>
                            


                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
            fetchDrivers();
            document.addEventListener("DOMContentLoaded", function () {
                let today = new Date().toISOString().split("T")[0];

                let dateInput = document.getElementById("license_expire");
                dateInput.min = today;

                dateInput.addEventListener("change", function () {
                    if (this.value < today) {
                        this.value = today;
                    }
                });

                $("#newDriverForm").submit(function(event) {
                    event.preventDefault();

                    $.ajax({
                        type: "POST",
                        url: "../../driver",
                        data: $(this).serialize(),
                        dataType: "json",
                        beforeSend: function() {
                            $('#submit_loading').css('display', 'inline');
                            $(":submit").attr("disabled", true);
                        },
                        success: function(response) {
                            if (response.status === "success") {
                                fetchDrivers();
                                $("#success_alert").hide();
                                    $('#success_alert').html(response.message);
                                    $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#success_alert").slideUp(500);
                                });
                            }else {
                                $("#success_alert").hide();
                                    $('#error_alert').html(response.message);
                                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#error_alert").slideUp(500);
                                });
                            }

                        },
                        error: function(xhr) {
                                let responseText = xhr.responseText;
                                let errorMsg = '';
                                try {
                                    let errorResponse = JSON.parse(responseText);
                                    errorMsg = errorResponse.message;
                                } catch (e) {
                                    errorMsg = "Unexpected error occurred";
                                }

                                $("#success_alert").hide();
                                    $('#error_alert').html(errorMsg);
                                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#error_alert").slideUp(500);
                                });
                        },
                        complete: function(){
                            emptyFields();
                            $("#license_expire").val(today);
                            $(":submit").removeAttr("disabled");
                            $('#submit_loading').css('display', 'none');
                        }
                    });
                });
            });

            //fetch license type
            $.ajax({
                type: "GET",
                url: "../../driver", // Servlet URL
                data: { action: "license_types" }, // Serialize form data
                dataType: "json",
                beforeSend: function() {
                    $('#btn_loading').css('display', 'inline');
                    $("#newDriverBtn").attr("disabled", true);
                },
                success: function(response) {
                    if (response.status === "success") {

                        let dropdown = $("#license_type");
                        dropdown.empty().append('<option value="" disabled selected>Select License Type</option>');
                        let licenseTypes = response.data;

                        $.each(licenseTypes, function(index, typeObj) {
                            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.type + '</option>');
                        });

                    }else {
                        $("#success_alert").hide();
                            $('#error_alert').html(response.message);
                            $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                            $("#error_alert").slideUp(500);
                        });
                    }

                },
                error: function(xhr) {
                        let responseText = xhr.responseText;
                        let errorMsg = '';
                        try {
                            let errorResponse = JSON.parse(responseText);
                            errorMsg = errorResponse.message;
                        } catch (e) {
                            errorMsg = "Unexpected error occurred: "+e;
                        }

                        $("#success_alert").hide();
                            $('#error_alert').html(errorMsg);
                            $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                            $("#error_alert").slideUp(500);
                        });
                },
                complete: function(){
                    $("#newDriverBtn").removeAttr("disabled");
                    $('#btn_loading').css('display', 'none');
                }
            });

            //fetch Drivers
            function fetchDrivers(){
                $.ajax({
                    type: "GET",
                    url: "../../driver",
                    data: { action: "driver_list" },
                    dataType: "json",
                    beforeSend: function() {
                        let tbody = $("#driversTable tbody");
                        tbody.empty();

                        tbody.append(`<tr>
                           <td scope="row" colspan="10" style="text-align: center;">
                             <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                           </td>
                         </tr>`);
                    },
                    success: function(response) {
                        let tbody = $("#driversTable tbody");
                        tbody.empty();
                        if (response.status === "success") {

                            if(response.data.length == 0){
                                tbody.append(`<tr><td colspan="10" style="text-align:center;">No Data</td></tr>`);
                            }else{

                                let regNumber = 45871;
                                let i = 0;

                                response.data.forEach((driver) => {
                                    i = i+1;
                                    let newRow = `
                                        <tr>
                                            <td>`+i+`</td>
                                            <td>`+ regNumber +`</td>
                                            <td>`+ driver.name +`</td>
                                            <td>`+ driver.nic +`</td>
                                            <td>`+ driver.address +`</td>
                                            <td>`+ driver.email +`</td>
                                            <td>`+ driver.phone +`</td>
                                            <td>`+ driver.licenseType +`</td>
                                            <td>`+ driver.licenseExpireDate +`</td>
                                            <td><button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i> ${driver.id}</button></td>
                                        </tr>
                                    `;
                                    tbody.append(newRow);
                                });

                            }
                        }else {
                            tbody.append(`<tr><td colspan="10" style="text-align:center;">No Data</td></tr>`);
                            $("#success_alert").hide();
                                $('#error_alert').html(response.message);
                                $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                                $("#error_alert").slideUp(500);
                            });
                        }

                    },
                    error: function(xhr) {
                            let responseText = xhr.responseText;
                            let errorMsg = '';
                            try {
                                let errorResponse = JSON.parse(responseText);
                                errorMsg = errorResponse.message;
                            } catch (e) {
                                errorMsg = "Unexpected error occurred: "+e;
                            }

                            let tbody = $("#driversTable tbody");
                            tbody.empty();
                            tbody.append(`<tr><td colspan="10" style="text-align:center;">No Data</td></tr>`);

                            $("#success_alert").hide();
                                $('#error_alert').html(errorMsg);
                                $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                                $("#error_alert").slideUp(500);
                            });
                    },

                });
            }

             function emptyFields(){
                 document.getElementById('name').value = '';
                 document.getElementById('driver_nic').value = '';
                 document.getElementById('phone').value = '';
                 document.getElementById('email').value = '';
                 document.getElementById('address').value = '';
                 document.getElementById('license_type').selectedIndex = 0;
            }

        </script>

    </body>
</html>
