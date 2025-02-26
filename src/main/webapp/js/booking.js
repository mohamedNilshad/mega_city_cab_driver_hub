<script>
    fetchCustomers();
    disableAllFields();

    document.addEventListener("DOMContentLoaded", function () {
        setDate("from_date");
        setDate("to_date");
    });

    function fetchCustomers(){
        $.ajax({
            type: "GET",
            url: "../../customer",
            data: { action: "customer_info", customer_id: customerId },
            dataType: "json",
            beforeSend: function() {
                document.getElementById("formOverlay").classList.remove("d-none");
            },
            success: function(response) {

                if (response.status === "success") {
                    setCustomerInfo(response.data);
                }else {
                    $("#success_alert").hide();
                        $('#error_alert').html(response.message);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
                    document.getElementById("formOverlay").classList.add("d-none");
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
                document.getElementById("formOverlay").classList.add("d-none");
            }
        });
    }

    function setCustomerInfo(customer){
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customer_name').value = customer.name;
        document.getElementById('customer_nic').value = customer.nic;
        document.getElementById('phone').value = customer.phone;
        document.getElementById("formOverlay").classList.add("d-none");
    }

    function setDate(id){
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone

        let currentDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'

        let dateTimeInput = document.getElementById(id);
        dateTimeInput.value = currentDateTime; // Set current date & time
        dateTimeInput.min = currentDateTime; // Disable past date & time
    }

    function validateVehicle(seatCount){
        if(seatCount == ""){
            document.getElementById("select_vehicle").disabled = true;
            return;
        }
        let startDate = document.getElementById("from_date").value;
        let endDate = document.getElementById("to_date").value;
        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "vehicle_list_by_seat", seat_count: seatCount, start_date: startDate, end_date: endDate},
            dataType: "json",
            beforeSend: function() {
                $("#select_vehicle").empty().append('<option value="" disabled selected>Select Vehicle</option>');
                document.getElementById("select_vehicle").disabled = true;
            },
            success: function(response) {
                document.getElementById("select_vehicle").disabled = false;
                if (response.status === "success") {
                    let dropdown = $("#select_vehicle");
                    dropdown.empty();

                    let vehicle = response.data;

                    dropdown.empty().append('<option value="" disabled selected>Select Vehicle</option>');

                    if(vehicle.length == 0){
                        dropdown.append('<option value="" disabled>No Vehicle</option>');
                    }else{
                        $.each(vehicle, function(index, typeObj) {
                            dropdown.append('<option value="' + typeObj.id + '">' + typeObj.vehicleName + '</option>');
                        });
                    }

                }else {

                   dropdown.empty().append('<option value="" disabled selected>Select Vehicle</option>');
                   dropdown.empty().append('<option value="" disabled>No Vehicle</option>');

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

                   dropdown.empty().append('<option value="" disabled selected>Select Vehicle</option>');
                   dropdown.empty().append('<option value="" disabled>No Vehicle</option>');

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },


        });
    }

    function validateChange(id, value){
        if(value != ""){
            let seatCount = document.getElementById("seat_count").value;
            if(id == "from_date"){
                if(seatCount != ""){
                    validateVehicle(seatCount);
                }
            }else if(id == "to_date"){
                if(seatCount != ""){
                    validateVehicle(seatCount);
                }
                document.getElementById("from").disabled = false;
            }else if(id == "from"){
                document.getElementById("to").disabled = false;
            }else if(id == "to"){
                document.getElementById("seat_count").disabled = false;
            }else if(id == "seat_count"){
                document.getElementById("select_vehicle").disabled = false;
            }
        }else{
            if(id == "to_date"){
                document.getElementById("from").disabled = true;
            }else if(id == "from"){
                document.getElementById("to").disabled = true;
            }else if(id == "to"){
                document.getElementById("seat_count").disabled = true;
            }else if(id == "seat_count"){
                document.getElementById("select_vehicle").disabled = true;
            }
        }
    }

    function disableAllFields(){
        document.getElementById("from").disabled = true;
        document.getElementById("to").disabled = true;
        document.getElementById("seat_count").disabled = true;
        document.getElementById("select_vehicle").disabled = true;
    }

    //add new customer
    $("#newBookingForm").submit(function(event) {
        event.preventDefault();
        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

        $.ajax({
            type: "POST",
            url: "../../booking",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    emptyFields();
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
                $('#nb_btn_loading').css('display', 'none');
                window.scrollTo(0,0);
            }
        });
    });

    function emptyFields(){
        setDate("from_date");
        setDate("to_date");
        document.getElementById('from').value = '';
        document.getElementById('to').value = '';
        document.getElementById('select_vehicle').selectedIndex = 0;
        disableAllFields();
    }

    ///old


    function openEditModal(customer){
         console.log(customer);
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

</script>