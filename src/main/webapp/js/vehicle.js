<script>

    fetchVehicles();
    fetchAvailableDrivers();

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
                    emptyFields();
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
                                        <button type="button" class="icon-btn" onclick='openEditModal(${jsonVehicle})'><i class="zmdi zmdi-edit"></i></button>
                                        <button type="button" class="icon-btn" style="color: red" onclick='openDeleteModal(${vehicle.id},${vehicle.driverId},"${vehicle.vehicleImage}")'><i class="zmdi zmdi-delete"></i></button>
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

    //update vehicle form
    function openEditModal(vehicle) {
        $("#updateVehicleBtn").attr("disabled", true);
        document.getElementById(`admin_update_vehicle_error_6`).innerHTML = "";
        setOldValues(vehicle);

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

    //delete vehicle model
    function openDeleteModal(v_id, d_id, d_image) {
        document.getElementById("d_v_id").value = v_id;
        document.getElementById("d_driver_id").value = d_id;
        document.getElementById("d_image_name").value = d_image;

        let modal = new bootstrap.Modal(document.getElementById("deleteVehicleForm"));
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
         document.getElementById('v_description').value = '';
         document.getElementById('driver').selectedIndex = 0;
    }

    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->
    let originalValues;

    function setOldValues(vehicle){
        originalValues = {
            type: vehicle.vehicleTypeId,
            name: vehicle.vehicleName,
            number: vehicle.vehicleNumber,
            seatCount: vehicle.seatCount,
            description: vehicle.description,
            driver: vehicle.driverId
        };
    }

    function enableSubmitButton(){
        let btnId = '#'+'updateVehicleBtn';
        let type = document.getElementById("update_v_type").value;
        let name = document.getElementById("update_v_name").value;
        let number = document.getElementById("update_v_number").value;
        let seatCount = document.getElementById("update_seat_count").value;
        let description = document.getElementById("update_v_description").value;
        let driver = document.getElementById("update_driver").value;

        let image = document.getElementById("update_v_image");

        if(type != originalValues.type){
            $(btnId).attr("disabled", false);
        }else if(name != originalValues.name){
            $(btnId).attr("disabled", false);
        }else if(number != originalValues.number){
            $(btnId).attr("disabled", false);
        }else if(seatCount != originalValues.seatCount){
            $(btnId).attr("disabled", false);
        }else if(description != originalValues.description){
            $(btnId).attr("disabled", false);
        }else if(driver != originalValues.driver){
            $(btnId).attr("disabled", false);
        }else if (image.files.length) {
            $(btnId).attr("disabled", false);
        }else{
            $(btnId).attr("disabled", true);
        }
    }
    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->

</script>