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

    //update drivers
    $("#updateDriverForm").submit(function(event) {
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
                                    <td><button type="button" class="icon-btn" onclick='openEditModal(${jsonDriver})'><i class="zmdi zmdi-edit"></i></button></td>
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

    function openEditModal(driver) {
        console.log(driver.nic);
        document.getElementById("driver_id").value = driver.id;
        document.getElementById("reg_num").value = driver.regNumber;
        document.getElementById("update_name").value = driver.name;
        document.getElementById("update_nic").value = driver.nic;

        document.getElementById("update_phone").value = driver.phone;
        document.getElementById("update_email").value = driver.email;
        document.getElementById("update_address").value = driver.address;

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

    function emptyFields(){
         document.getElementById('name').value = '';
         document.getElementById('driver_nic').value = '';
         document.getElementById('phone').value = '';
         document.getElementById('email').value = '';
         document.getElementById('address').value = '';
         document.getElementById('license_type').selectedIndex = 0;
    }

</script>