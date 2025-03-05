<script>
    document.addEventListener("DOMContentLoaded", function () {
        fetchCustomers();
        $(".nav-tabs a").click(function(){ $(this).tab('show'); });
         $('.nav-tabs a').on('shown.bs.tab', function(event){
           var activeTab = $(event.target).text();         // active tab
           var y = $(event.relatedTarget).text();  // previous tab

           if(activeTab == "Customer"){
              fetchCustomers();
           }else if(activeTab == "Admin"){
              fetchAdmins();
           }else if(activeTab == "Driver"){
              fetchDrivers();
              fetchLicenseType();
           }else if(activeTab == "Vehicle"){
              fetchVehicles();
              fetchVehicleTypes();
              fetchAvailableDrivers();
           }else if(activeTab == "Vehicle Type"){
              fetchAllVehicleType();
           }else if(activeTab == "License Type"){
              fetchAllLicenseType();

           }else{
              fetchCustomers();
           }
         });

    });


    //---------------------------------CUSTOMER-------------->
    function fetchCustomers(){
        $.ajax({
            type: "GET",
            url: "../../customer",
            data: { action: "customer_list", user_type: 2},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#customersTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="9" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#customersTable tbody");
                tbody.empty();
                if (response.status === "success") {

                    if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
                    }else{

                        let i = 0;
                        response.data.forEach((customer) => {
                            i = i+1;
                            let jsonCustomer = JSON.stringify(customer);

                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td>${customer.name}</td>
                                    <td>${customer.address}</td>
                                    <td>${customer.nic}</td>
                                    <td>${customer.email}</td>
                                    <td>${customer.phone}</td>
                                    <td>${customer.userName}</td>
                                    <td><button type="button" class="icon-btn" onclick='openCustomerEditModal(${jsonCustomer})'><i class="zmdi zmdi-edit"></i></button></td>
                                    <td><a href="booking.jsp?cid=${customer.id}" class="btn btn-warning" >Book</a></td>
                                </tr>
                            `;
                            tbody.append(newRow);
                        });
                    }
                }else {
                    tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
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

                    let tbody = $("#customersTable tbody");
                    tbody.empty();
                    tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },

        });
    }

    function openCustomerEditModal(customer){
        $("#updateCustomerBtn").attr("disabled", true);
         setOldCustomerValues(customer);

         document.getElementById("customer_id").value = customer.id;
         document.getElementById("update_customer_name").value = customer.name;
         document.getElementById("update_customer_nic").value = customer.nic;
         document.getElementById("update_phone").value = customer.phone;
         document.getElementById("update_address").value = customer.address;
         document.getElementById("update_email").value = customer.email;
         document.getElementById("update_username").value = customer.userName;

        let modal = new bootstrap.Modal(document.getElementById("editCustomerModel"));
        modal.show();
    }

    //update customer
    $("#editCustomerForm").submit(function(event) {
        event.preventDefault();
        $('#uc_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

        if(validUpdateCustomerForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            $('#uc_btn_loading').css('display', 'none');
            return;
        }
        $.ajax({
            type: "POST",
            url: "../../customer",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#uc_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchCustomers();
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    $("#editCustomerModel").modal("hide");
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#uc_btn_loading').css('display', 'none');

            }
        });
    });

    //add new customer
    $("#newCustomerForm").submit(function(event) {
        event.preventDefault();
        $('#submit_loading').css('visibility', 'visible');
        $(":submit").attr("disabled", true);


        if(validNewCustomerForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            $('#submit_loading').css('visibility', 'hidden');
            return;
        }

        $.ajax({
            type: "POST",
            url: "../../customer",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchCustomers();
                    emptyCustomerFields();
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
                    errorMsg = "Unexpected error occurred "+e;
                }

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#submit_loading').css('visibility', 'hidden');
                window.scrollTo(0,0);
            }
        });
    });

    function emptyCustomerFields(){
         document.getElementById('new_customer_name').value = '';
         document.getElementById('new_customer_nic').value = '';
         document.getElementById('new_phone').value = '';
         document.getElementById('new_address').value = '';
         document.getElementById('new_email').value = '';
         document.getElementById('username').value = '';
         document.getElementById('password').value = '';
    }

    //---------------------VALIDATE Customer SUBMIT BUTTON----------------------------------->
    let originalCustomerValues;

    function setOldCustomerValues(customer){
        originalCustomerValues = {
            name: customer.name,
            nic: customer.nic,
            phone: customer.phone,
            email: customer.email,
            address: customer.address
        };
    }

    function enableCustomerSubmitButton(){
        let name = document.getElementById("update_customer_name").value;
        let nic = document.getElementById("update_customer_nic").value;
        let phone = document.getElementById("update_phone").value;
        let email = document.getElementById("update_email").value;
        let address = document.getElementById("update_address").value;
        let password = document.getElementById("update_password").value;

        let btnId = "#updateCustomerBtn";

        if(name != originalCustomerValues.name){
            $(btnId).attr("disabled", false);
        }else if(email != originalCustomerValues.email){
            $(btnId).attr("disabled", false);
        }else if(phone != originalCustomerValues.phone){
            $(btnId).attr("disabled", false);
        }else if(address != originalCustomerValues.address){
            $(btnId).attr("disabled", false);
        }else if(nic != originalCustomerValues.nic){
            $(btnId).attr("disabled", false);
        }else if(password != ""){
            $(btnId).attr("disabled", false);
        }else{
            $(btnId).attr("disabled", true);
        }
    }
    //---------------------VALIDATE Customer SUBMIT BUTTON----------------------------------->


    //---------------------------------ADMIN----------------->
    function fetchAdmins(){
        $.ajax({
            type: "GET",
            url: "../../user",
            data: { action: "user_list", user_type: 1},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#adminTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="9" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#adminTable tbody");
                tbody.empty();
                if (response.status === "success") {

                    if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
                    }else{

                        let i = 0;
                        response.data.forEach((admin) => {
                            i = i+1;
                            let jsonAdmin = JSON.stringify(admin);
                            let statusBtn = `<button type="button" class="btn btn-danger" onclick='openStatusConfirmModal(${admin.id}, ${admin.block})'>Block</button>`;

                            if(admin.block == 1){
                                statusBtn = `<button type="button" class="btn btn-warning" onclick='openStatusConfirmModal(${admin.id}, ${admin.block})'>Un Block</button>`;
                            }
                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td>${admin.name}</td>
                                    <td>${admin.address}</td>
                                    <td>${admin.nic}</td>
                                    <td>${admin.email}</td>
                                    <td>${admin.phone}</td>
                                    <td>${admin.userName}</td>
                                    <td><button type="button" class="icon-btn" onclick='openAdminEditModal(${jsonAdmin})'><i class="zmdi zmdi-edit"></i></button></td>
                                    <td>${statusBtn}</td>
                                </tr>
                            `;
                            tbody.append(newRow);
                        });
                    }
                }else {
                    tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
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

                    let tbody = $("#adminTable tbody");
                    tbody.empty();
                    tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },

        });
    }

    function openAdminEditModal(admin){

         document.getElementById("admin_id").value = admin.id;
         document.getElementById("update_admin_name").value = admin.name;
         document.getElementById("update_admin_nic").value = admin.nic;
         document.getElementById("update_admin_phone").value = admin.phone;
         document.getElementById("update_admin_address").value = admin.address;
         document.getElementById("update_admin_email").value = admin.email;
         document.getElementById("update_admin_username").value = admin.userName;

        let modal = new bootstrap.Modal(document.getElementById("editAdminModel"));
        modal.show();
    }

    //update customer
    $("#editAdminForm").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../user",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#uc_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAdmins();
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    $("#editAdminModel").modal("hide");
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#uc_btn_loading').css('display', 'none');

            }
        });
    });

    //add new customer
    $("#newAdminForm").submit(function(event) {
        event.preventDefault();
        $('#submit_loading').css('visibility', 'visible');
        $(":submit").attr("disabled", true);

        $.ajax({
            type: "POST",
            url: "../../user",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchAdmins();
                    emptyAdminFields();
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
                    errorMsg = "Unexpected error occurred "+e;
                }

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#submit_loading').css('visibility', 'hidden');
                window.scrollTo(0,0);
            }
        });
    });

    //change admin status
    $("#changeAdminStatusForm").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../user",
            data:  $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#dv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAdmins();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#dv_btn_loading').css('display', 'none');
                $("#AdminStatusConfirm").modal("hide");
            }
        });
    });

    function emptyAdminFields(){
         document.getElementById('new_admin_name').value = '';
         document.getElementById('new_admin_nic').value = '';
         document.getElementById('new_admin_phone').value = '';
         document.getElementById('new_admin_address').value = '';
         document.getElementById('new_admin_email').value = '';
         document.getElementById('admin_username').value = '';
         document.getElementById('admin_password').value = '';
    }

    //block confirmation model
    function openStatusConfirmModal(adminId, status) {
        let label = (status == 0) ? "Block" : "Un Block";
        document.getElementById("adminStatusChangeConfirm").innerHTML = "Confirm "+label;
        document.getElementById("statusLabel").innerHTML = label;
        document.getElementById("status_admin_id").value = adminId;
        document.getElementById("user_status").value = status;

        let modal = new bootstrap.Modal(document.getElementById("AdminStatusConfirm"));
        modal.show();
    }


    //---------------------------------DRIVER------------------>
    //fetch license type
    function fetchLicenseType(){
        $.ajax({
            type: "GET",
            url: "../../driver",
            data: { action: "license_types" },
            dataType: "json",
            beforeSend: function() {
                $('#btn_loading').css('display', 'inline');
                $("#newDriverBtn").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                  licenseTypes = response.data;
                  buildLicenseType('license_type', licenseTypes, -1);
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
    }

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

                        let i = 0;
                        response.data.forEach((driver) => {
                            i = i+1;
                            let jsonDriver = JSON.stringify(driver);

                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td>${driver.regNumber}</td>
                                    <td>${driver.name}</td>
                                    <td>${driver.nic}</td>
                                    <td>${driver.address}</td>
                                    <td>${driver.email}</td>
                                    <td>${driver.phone}</td>
                                    <td>${driver.licenseType}</td>
                                    <td>${driver.licenseExpireDate}</td>
                                    <td><button type="button" class="icon-btn" onclick='openEditDriverModal(${jsonDriver})'><i class="zmdi zmdi-edit"></i></button></td>
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

    //add new driver
    $("#newDriverForm").submit(function(event) {
        event.preventDefault();
        $(":submit").attr("disabled", true);
        $('#submit_loading').css('display', 'inline');

        if(validNewDriverForm(new FormData(this))){
            $(":submit").removeAttr("disabled");
            $('#submit_loading').css('display', 'none');
            return;
        }

        let today = getCurrentDate();
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
                    emptyDriverFields();
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
                $("#license_expire").val(today);
                $(":submit").removeAttr("disabled");
                $('#submit_loading').css('display', 'none');
            }
        });
    });

    //update drivers
    $("#updateDriverForm").submit(function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        if(validUpdateDriverForm(formData)) return;
        $.ajax({
            type: "POST",
            url: "../../driver",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#update_submit_loading').css('display', 'inline');
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#update_submit_loading').css('display', 'none');
                $("#driverUpdateForm").modal("hide");
            }
        });
    });

    function openEditDriverModal(driver) {
        fetchLicenseType();
         $("#updateDriverBtn").attr("disabled", true);
         setOldDriverValues(driver);
        document.getElementById("driver_id").value = driver.id;
        document.getElementById("reg_num").value = driver.regNumber;
        document.getElementById("update_driver_name").value = driver.name;
        document.getElementById("update_driver_nic").value = driver.nic;

        document.getElementById("update_driver_phone").value = driver.phone;
        document.getElementById("update_driver_email").value = driver.email;
        document.getElementById("update_driver_address").value = driver.address;

        buildLicenseType('update_license_type', licenseTypes, driver.licenseTypeId);

        document.getElementById("update_license_expire").value = driver.licenseExpireDate;

        let modal = new bootstrap.Modal(document.getElementById("driverUpdateForm"));
        modal.show();
    }

    function buildLicenseType(idName, lTypes, selectId){
        let dropdown = $("#"+idName);
        dropdown.empty();

        if(selectId == -1){
           dropdown.empty().append('<option value="" disabled selected>Select License Type</option>');
        } else{
           dropdown.empty().append('<option value="" disabled>Select License Type</option>');
        }

        $.each(lTypes, function(index, typeObj) {
            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.type + '</option>');
        });
        if(selectId != -1){
            dropdown.val(selectId);
        }
    }

    function emptyDriverFields(){
         document.getElementById('driver_name').value = '';
         document.getElementById('driver_nic').value = '';
         document.getElementById('driver_phone').value = '';
         document.getElementById('driver_email').value = '';
         document.getElementById('driver_address').value = '';
         document.getElementById('license_type').selectedIndex = 0;
    }

    function getCurrentDate(){
        let today = new Date().toISOString().split("T")[0];

        let dateInput = document.getElementById("license_expire");
        dateInput.min = today;

        dateInput.addEventListener("change", function () {
            if (this.value < today) {
                this.value = today;
            }
        });

        return today;
    }

    //---------------------VALIDATE DRIVER SUBMIT BUTTON----------------------------------->
    let originalDriverValues;

    function setOldDriverValues(driver){
        originalDriverValues = {
            name: driver.name,
            nic: driver.nic,
            phone: driver.phone,
            email: driver.email,
            address: driver.address,
            licenseType: driver.licenseTypeId,
            licenseExpire: driver.licenseExpireDate,
        };
    }

    function enableDriverSubmitButton(){
        let name = document.getElementById("update_driver_name").value;
        let nic = document.getElementById("update_driver_nic").value;
        let phone = document.getElementById("update_driver_phone").value;
        let email = document.getElementById("update_driver_email").value;
        let address = document.getElementById("update_driver_address").value;
        let licenseType = document.getElementById("update_license_type").value;
        let licenseExpire = document.getElementById("update_license_expire").value;

        if(name != originalDriverValues.name){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(email != originalDriverValues.email){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(phone != originalDriverValues.phone){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(address != originalDriverValues.address){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(nic != originalDriverValues.nic){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(licenseType != originalDriverValues.licenseType){
            $("#updateDriverBtn").attr("disabled", false);
        }else if(licenseExpire != originalDriverValues.licenseExpire){
            $("#updateDriverBtn").attr("disabled", false);
        }else{
            $("#updateDriverBtn").attr("disabled", true);
        }
    }
    //---------------------VALIDATE DRIVER SUBMIT BUTTON----------------------------------->


    //---------------------------------LICENSE TYPE--------------->
    function fetchAllLicenseType(){
        $.ajax({
            type: "GET",
            url: "../../driver",
            data: { action: "license_types" },
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#licenseTypeTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="3" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {

                let tbody = $("#licenseTypeTable tbody");
                tbody.empty();
                if (response.status === "success") {

                    if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="3" style="text-align:center;">No Data</td></tr>`);
                    }else{

                        let i = 0;
                        response.data.forEach((licenseType) => {
                            i = i+1;
                            let jsonLicenseType = JSON.stringify(licenseType);

                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td>${licenseType.type}</td>
                                    <td>
                                        <button type="button" class="icon-btn" onclick='openEditLicenseTypeModal(${jsonLicenseType})'><i class="zmdi zmdi-edit"></i></button>
                                        <button type="button" class="icon-btn" onclick='openLTypeDeleteConfirmModal(${licenseType.id})'><i class="zmdi zmdi-delete" style="color:red;"></i></button>
                                    </td>
                                </tr>
                            `;
                            tbody.append(newRow);
                        });
                    }
                }else {
                    tbody.append(`<tr><td colspan="3" style="text-align:center;">No Data</td></tr>`);
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

                let tbody = $("#licenseTypeTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="3" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
        });
    }

    //add new license type
    $("#newLicenseTypeForm").submit(function(event) {
        event.preventDefault();
        let today = getCurrentDate();
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
                    fetchAllLicenseType();
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
                $(":submit").removeAttr("disabled");
                $('#submit_loading').css('display', 'none');
            }
        });
    });

    function openEditLicenseTypeModal(licenseType) {
        document.getElementById("license_type_id").value = licenseType.id;
        document.getElementById("u_license_type").value = licenseType.type;

        let modal = new bootstrap.Modal(document.getElementById("updateLTypeModel"));
        modal.show();
    }

    //update license type
    $("#updateLicenseTypeForm").submit(function(event) {

        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../driver",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#update_submit_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAllLicenseType();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#update_submit_loading').css('display', 'none');
                $("#updateLTypeModel").modal("hide");
            }
        });
    });


    //delete license type
    $("#deleteLicenseTypeForm").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../driver",
            data:  $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#dv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAllLicenseType();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#dv_btn_loading').css('display', 'none');
                $("#LTypeDeleteConfirm").modal("hide");
            }
        });
    });

    function emptyLicenseTypeFields(){
         document.getElementById('new_license_type').value = '';
    }

    //delete confirmation model
    function openLTypeDeleteConfirmModal(typeId) {
        document.getElementById("type_id").value = typeId;
        let modal = new bootstrap.Modal(document.getElementById("LTypeDeleteConfirm"));
        modal.show();
    }


//---------------------------------VEHICLE------------------------->
    //fetch vehicle
    function fetchVehicles(){
        $.ajax({
            type: "GET",
            url: "../../vehicle",
            data: { action: "vehicle_list" },
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#vehiclesTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="8" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {

                let tbody = $("#vehiclesTable tbody");
                tbody.empty();
                if (response.status === "success") {

                    if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="8" style="text-align:center;">No Data</td></tr>`);
                    }else{

                        let i = 0;
                        response.data.forEach((vehicle) => {
                            i = i+1;
                            let jsonVehicle = JSON.stringify(vehicle);

                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td><img src="${contextPath}${vehicle.vehicleImage}" width="50px;" height="30px;"></td>
                                    <td>${vehicle.vehicleNumber}</td>
                                    <td>${vehicle.vehicleName}</td>
                                    <td>${vehicle.vehicleType}</td>
                                    <td><div id="description${i}" class="text-container">${vehicle.description}</div></td>
                                    <td>${vehicle.driverName}</td>
                                    <td>${vehicle.driverRegNum}</td>
                                    <td>
                                        <button type="button" class="icon-btn" onclick='openVehicleEditModal(${jsonVehicle})'><i class="zmdi zmdi-edit"></i></button>
                                        <button type="button" class="icon-btn" style="color: red" onclick='openVehicleDeleteModal(${vehicle.id},${vehicle.driverId},"${vehicle.vehicleImage}")'><i class="zmdi zmdi-delete"></i></button>
                                    </td>
                                </tr>
                            `;
                            tbody.append(newRow);
                        });
                    }
                }else {
                    tbody.append(`<tr><td colspan="8" style="text-align:center;">No Data</td></tr>`);
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

                let tbody = $("#vehiclesTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="8" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

        });
    }

    //fetch vehicle type
    function fetchVehicleTypes(){
        $.ajax({
           type: "GET",
           url: "../../vehicle",
           data: { action: "vehicle_types" },
           dataType: "json",
           beforeSend: function() {
               $('#nv_btn_loading').css('display', 'inline');
               $("#newVehicleBtn").attr("disabled", true);
           },
           success: function(response) {
               if (response.status === "success") {
                   vehicleTypes = response.data;
                   buildVehicleType('v_type', vehicleTypes, -1);
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
               $("#newVehicleBtn").removeAttr("disabled");
               $('#nv_btn_loading').css('display', 'none');
           }
       });
    }

    //fetch available drivers
    function fetchAvailableDrivers(){

        $.ajax({
            type: "GET",
            url: "../../driver",
            data: { action: "available_driver_list" },
            dataType: "json",
            beforeSend: function() {
                $('#nv_btn_loading').css('display', 'inline');
                $("#newVehicleBtn").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    drivers = response.data;
                    buildDriverList('sdriver', drivers, -1);
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
                $("#newVehicleBtn").removeAttr("disabled");
                $('#nv_btn_loading').css('display', 'none');
            }
        });
    }

    function buildDriverList(idName, driverList, selectId){
        let dropdown = $("#"+idName);
        dropdown.empty();

        if(selectId == -1){
           dropdown.empty().append('<option value="" disabled selected>Select A Driver</option>');
        } else{
           dropdown.empty().append('<option value="" disabled>Select A Driver</option>');
        }

        $.each(driverList, function(index, typeObj) {

            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.name + '</option>');
        });
        if(selectId != -1){
            dropdown.val(selectId);
        }
    }

    function buildVehicleType(idName, vTypes, selectId){
        let dropdown = $("#"+idName);
        dropdown.empty();

        if(selectId == -1){
           dropdown.empty().append('<option value="" disabled selected>Select Vehicle Type</option>');
        } else{
           dropdown.empty().append('<option value="" disabled>Select Vehicle Type</option>');
        }

        $.each(vTypes, function(index, typeObj) {
            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.type + '</option>');
        });
        if(selectId != -1){
            dropdown.val(selectId);
        }
    }

    //update vehicle form
    function openVehicleEditModal(vehicle) {
        $("#updateVehicleBtn").attr("disabled", true);
        document.getElementById(`admin_update_vehicle_error_6`).innerHTML = "";
        setOldVehicleValues(vehicle);

        let updateDriver = [...drivers];

        let currentDriver = {
            id: vehicle.driverId,
            isAllocate: 1,
            licenseTypeId: 0,
            name: vehicle.driverName
        };
        updateDriver.unshift(currentDriver);

        document.getElementById("vehicle_id").value = vehicle.id;
        document.getElementById("old_v_image").value = vehicle.vehicleImage;
        document.getElementById("old_driver_id").value = vehicle.driverId;
        buildVehicleType('update_v_type', vehicleTypes, vehicle.vehicleTypeId);
        document.getElementById("update_v_name").value = vehicle.vehicleName;
        document.getElementById("update_v_number").value = vehicle.vehicleNumber;
        document.getElementById("update_seat_count").value = vehicle.seatCount;
        document.getElementById("old_image").src = contextPath + vehicle.vehicleImage;
        document.getElementById("old_image_label").innerHTML = vehicle.vehicleImage;
        document.getElementById("update_v_description").value = vehicle.description;
        buildDriverList('update_driver', updateDriver, vehicle.driverId);

        let modal = new bootstrap.Modal(document.getElementById("vehicleUpdateFrom"));
        modal.show();
    }

    //update vehicle
    $("#updateNewVehicle").submit(function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        $(":submit").attr("disabled", true);
        $('#unv_btn_loading').css('display', 'inline');

        if(validUpdateVehicleForm(formData)){
           $(":submit").removeAttr("disabled");
           $('#unv_btn_loading').css('display', 'none');
           return;
        }
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: function() {
                $('#unv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchVehicles();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#unv_btn_loading').css('display', 'none');
                $("#vehicleUpdateFrom").modal("hide");
            }
        });
    });

    //add vehicle();
    $("#addNewVehicle").submit(function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        $(":submit").attr("disabled", true);
        $('#snv_btn_loading').css('display', 'inline');

        if(validNewVehicleForm(formData)){
            $(":submit").removeAttr("disabled");
            $('#snv_btn_loading').css('display', 'none');
            return;
        }
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: function() {
                $('#snv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    emptyVehicleFields();
                    fetchVehicles();
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
                fetchAvailableDrivers();
                $(":submit").removeAttr("disabled");
                $('#snv_btn_loading').css('display', 'none');
            }
        });
    });

    //delete vehicle
    $("#deleteVehicle").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data:  $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#dv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAvailableDrivers();
                    fetchVehicles();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#dv_btn_loading').css('display', 'none');
                $("#deleteVehicleForm").modal("hide");
            }
        });
    });

    //delete vehicle model
    function openVehicleDeleteModal(v_id, d_id, d_image) {
        document.getElementById("d_v_id").value = v_id;
        document.getElementById("d_driver_id").value = d_id;
        document.getElementById("d_image_name").value = d_image;

        let modal = new bootstrap.Modal(document.getElementById("deleteVehicleForm"));
        modal.show();
    }

    function emptyVehicleFields(){
         document.getElementById('v_type').selectedIndex = 0;
         document.getElementById('v_name').value = '';
         document.getElementById('v_number').value = '';
         document.getElementById('seat_count').value = '';
         document.getElementById('v_image').value = '';
         document.getElementById('v_description').value = '';
         document.getElementById('sdriver').selectedIndex = 0;
    }


    //---------------------VALIDATE VEHICLE SUBMIT BUTTON----------------------------------->
    let originalVehicleValues;

    function setOldVehicleValues(vehicle){
        originalVehicleValues = {
            type: vehicle.vehicleTypeId,
            name: vehicle.vehicleName,
            number: vehicle.vehicleNumber,
            seatCount: vehicle.seatCount,
            description: vehicle.description,
            driver: vehicle.driverId
        };
    }

    function enableVehicleSubmitButton(){
        let btnId = '#'+'updateVehicleBtn';
        let type = document.getElementById("update_v_type").value;
        let name = document.getElementById("update_v_name").value;
        let number = document.getElementById("update_v_number").value;
        let seatCount = document.getElementById("update_seat_count").value;
        let description = document.getElementById("update_v_description").value;
        let driver = document.getElementById("update_driver").value;

        let image = document.getElementById("update_v_image");

        if(type != originalVehicleValues.type){
            $(btnId).attr("disabled", false);
        }else if(name != originalVehicleValues.name){
            $(btnId).attr("disabled", false);
        }else if(number != originalVehicleValues.number){
            $(btnId).attr("disabled", false);
        }else if(seatCount != originalVehicleValues.seatCount){
            $(btnId).attr("disabled", false);
        }else if(description != originalVehicleValues.description){
            $(btnId).attr("disabled", false);
        }else if(driver != originalVehicleValues.driver){
            $(btnId).attr("disabled", false);
        }else if (image.files.length) {
            $(btnId).attr("disabled", false);
        }else{
            $(btnId).attr("disabled", true);
        }
    }
    //---------------------VALIDATE VEHICLE SUBMIT BUTTON----------------------------------->


//---------------------------------VEHICLE TYPE------------------------->
    //fetch vehicle type
    function fetchAllVehicleType(){
        $.ajax({
            type: "GET",
            url: "../../vehicle",
            data: { action: "all_vehicle_types" },
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#vehiclesTypesTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="9" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {

                let tbody = $("#vehiclesTypesTable tbody");
                tbody.empty();
                if (response.status === "success") {

                    if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
                    }else{

                        let i = 0;
                        response.data.forEach((vehicleType) => {
                            i = i+1;
                            let jsonVehicleType = JSON.stringify(vehicleType);

                            let newRow = `
                                <tr>
                                    <td>${i}</td>
                                    <td>${vehicleType.type}</td>
                                    <td>${vehicleType.perOneDay}</td>
                                    <td>${vehicleType.discountFullAmount}</td>
                                    <td>${vehicleType.discountBalanceAmount}</td>
                                    <td>${vehicleType.penaltyExtraKm}</td>
                                    <td>${vehicleType.maximumKmPerDay}</td>
                                    <td>${vehicleType.discountDays}</td>
                                    <td>
                                        <button type="button" class="icon-btn" onclick='openVehicleTypeEditModal(${jsonVehicleType})'><i class="zmdi zmdi-edit"></i></button>
                                        <button type="button" class="icon-btn" style="color: red" onclick='openVehicleTypeDeleteModal(${vehicleType.id})'><i class="zmdi zmdi-delete"></i></button>
                                    </td>
                                </tr>
                            `;
                            tbody.append(newRow);
                        });
                    }
                }else {
                    tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);
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

                let tbody = $("#vehiclesTypesTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="9" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

        });
    }

    //update vehicle type
    $("#updateVehicleType").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#unv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAllVehicleType();
                    $("#vehicleTypeUpdateFrom").modal("hide");
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
                    errorMsg = "Unexpected error occurred "+e;
                }

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#unv_btn_loading').css('display', 'none');
            }
        });
    });

    //add vehicle();
    $("#addNewVehicleType").submit(function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data: formData,
            dataType: "json",
            beforeSend: function() {
                $('#snv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    emptyVehicleTypeFields();
                    fetchAllVehicleType();
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
                fetchAvailableDrivers();
                $(":submit").removeAttr("disabled");
                $('#snv_btn_loading').css('display', 'none');
            }
        });
    });

    //delete vehicle
    $("#deleteVehicleType").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../../vehicle",
            data:  $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#dv_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    fetchAllVehicleType();
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
                        errorMsg = "Unexpected error occurred "+e;
                    }

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },
            complete: function(){
                $(":submit").removeAttr("disabled");
                $('#dv_btn_loading').css('display', 'none');
                $("#deleteVehicleTypeForm").modal("hide");
            }
        });
    });

    //fetch vehicle type
    function fetchVehicleTypes(){
        $.ajax({
           type: "GET",
           url: "../../vehicle",
           data: { action: "vehicle_types" },
           dataType: "json",
           beforeSend: function() {
               $('#nv_btn_loading').css('display', 'inline');
               $("#newVehicleBtn").attr("disabled", true);
           },
           success: function(response) {
               if (response.status === "success") {
                   vehicleTypes = response.data;
                   buildVehicleType('v_type', vehicleTypes, -1);
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
               $("#newVehicleBtn").removeAttr("disabled");
               $('#nv_btn_loading').css('display', 'none');
           }
       });
    }

    //fetch available drivers
    function fetchAvailableDrivers(){

        $.ajax({
            type: "GET",
            url: "../../driver",
            data: { action: "available_driver_list" },
            dataType: "json",
            beforeSend: function() {
                $('#nv_btn_loading').css('display', 'inline');
                $("#newVehicleBtn").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    drivers = response.data;
                    buildDriverList('sdriver', drivers, -1);
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
                $("#newVehicleBtn").removeAttr("disabled");
                $('#nv_btn_loading').css('display', 'none');
            }
        });
    }

    function buildDriverList(idName, driverList, selectId){
        let dropdown = $("#"+idName);
        dropdown.empty();

        if(selectId == -1){
           dropdown.empty().append('<option value="" disabled selected>Select A Driver</option>');
        } else{
           dropdown.empty().append('<option value="" disabled>Select A Driver</option>');
        }

        $.each(driverList, function(index, typeObj) {

            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.name + '</option>');
        });
        if(selectId != -1){
            dropdown.val(selectId);
        }
    }

    function buildVehicleType(idName, vTypes, selectId){
        let dropdown = $("#"+idName);
        dropdown.empty();

        if(selectId == -1){
           dropdown.empty().append('<option value="" disabled selected>Select Vehicle Type</option>');
        } else{
           dropdown.empty().append('<option value="" disabled>Select Vehicle Type</option>');
        }

        $.each(vTypes, function(index, typeObj) {
            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.type + '</option>');
        });
        if(selectId != -1){
            dropdown.val(selectId);
        }
    }

    //update vehicle type form
    function openVehicleTypeEditModal(vehicleType) {

        document.getElementById("update_vehicle_type_id").value = vehicleType.id;
        document.getElementById("update_v_type_name").value = vehicleType.type;
        document.getElementById("update_per_one_day").value = vehicleType.perOneDay;

        document.getElementById("update_discount_full_amount").value = vehicleType.discountFullAmount;
        document.getElementById("update_discount_balance_amount").value = vehicleType.discountBalanceAmount;
        document.getElementById("update_penalty_extra_km").value = vehicleType.penaltyExtraKm;
        document.getElementById("update_maximum_km_per_day").value = vehicleType.maximumKmPerDay;

        document.getElementById("update_discount_days").value = vehicleType.discountDays;

        let modal = new bootstrap.Modal(document.getElementById("vehicleTypeUpdateFrom"));
        modal.show();
    }

    //delete vehicle type model
    function openVehicleTypeDeleteModal(vt_id) {
        document.getElementById("delete_vehicle_type_id").value = vt_id;

        let modal = new bootstrap.Modal(document.getElementById("deleteVehicleTypeForm"));
        modal.show();
    }

    function emptyVehicleTypeFields(){
         document.getElementById("new_v_type_name").value = "";
         document.getElementById("new_per_one_day").value = "";

         document.getElementById("new_discount_full_amount").value = "";
         document.getElementById("new_discount_balance_amount").value = "";
         document.getElementById("new_penalty_extra_km").value = "";
         document.getElementById("new_maximum_km_per_day").value = "";

         document.getElementById("new_discount_days").value = "";
    }


</script>