<script>

    fetchVehicles();

   //fetch vehicle type
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

    fetchAvailableDrivers();

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
                    buildDriverList('driver', drivers, -1);
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

    //add vehicle();
    $("#addNewVehicle").submit(function(event) {
        event.preventDefault();
        var formData = new FormData(this);
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
                emptyFields();
                $(":submit").removeAttr("disabled");
                $('#snv_btn_loading').css('display', 'none');
            }
        });
    });

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
                                    <td>${vehicle.driverName}</td>
                                    <td>${vehicle.driverRegNum}</td>
                                    <td>
                                        <button type="button" class="icon-btn" onclick='openEditModal(${jsonVehicle})'><i class="zmdi zmdi-edit"></i></button>
                                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
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

    //update vehicle
    $("#updateNewVehicle").submit(function(event) {
        event.preventDefault();
           var formData = new FormData(this);
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


    function openEditModal(vehicle) {

        document.getElementById("vehicle_id").value = vehicle.id;
        document.getElementById("old_v_image").value = vehicle.vehicleImage;
        buildVehicleType('update_v_type', vehicleTypes, vehicle.vehicleTypeId);
        document.getElementById("update_v_name").value = vehicle.vehicleName;
        document.getElementById("update_v_number").value = vehicle.vehicleNumber;
        document.getElementById("update_seat_count").value = vehicle.seatCount;
        document.getElementById("old_image").src = contextPath + vehicle.vehicleImage;
        document.getElementById("old_image_label").innerHTML = vehicle.vehicleImage;
        buildDriverList('update_driver', drivers, vehicle.driverId);

        let modal = new bootstrap.Modal(document.getElementById("vehicleUpdateFrom"));
        modal.show();
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

    function emptyFields(){
         document.getElementById('v_type').selectedIndex = 0;
         document.getElementById('v_name').value = '';
         document.getElementById('v_number').value = '';
         document.getElementById('seat_count').value = '';
         document.getElementById('v_image').value = '';

         document.getElementById('driver').selectedIndex = 0;
    }

</script>