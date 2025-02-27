<script>

    document.addEventListener("DOMContentLoaded", function () {
        fetchVehicleType();
        fetchCustomers();
        disableAllFields();

        setDate("from_date");
        setDate("to_date");
        fetchUserBookings();
    });

    document.addEventListener("change", function () {
            if(document.getElementById("seat_count").value != ""){
                if (event.target.name === "cabSelection") {
    //                console.log("Selected Vehicle ID:", event.target.value);
                    document.getElementById("total_distance").disabled = false;
                }else{
                    let result = readSelectedVehicle("cabSelection");
                    if(result == ""){
                        document.getElementById("total_distance").disabled = true;
                    }
                }
            }
        });

    //db
    function fetchVehicleType(){
        $.ajax({
            type: "GET",
            url: "../../vehicle",
            data: { action: "vehicle_types" },
            dataType: "json",
            beforeSend: function() {
                document.getElementById("formOverlay").classList.remove("d-none");
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
                document.getElementById("formOverlay").classList.add("d-none");
            }
        });
    }

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

    function validateVehicle(){
        let seatCount = document.getElementById("seat_count").value;

        if(seatCount == ""){
            document.getElementById("selectVehicle").style.display = 'none';
            return;
        }
        let startDate = document.getElementById("from_date").value;
        let endDate = document.getElementById("to_date").value;
        let v_type = document.getElementById("v_type").value;
        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "vehicle_list_by_seat", vehicle_type: v_type, seat_count: seatCount, start_date: startDate, end_date: endDate},
            dataType: "json",
            beforeSend: function() {

            },
            success: function(response) {

                if (response.status === "success") {
                    addVehicleList(response.data);
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
                $('#selectVehicle').css('display', 'block');
            }

        });
    }

    function fetchUserBookings(){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_customer_bookings", customer_id: customerId},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#userBookingTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="12" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#userBookingTable tbody");
                tbody.empty();

                if (response.status === "success") {
                     if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="12" style="text-align:center;">No Data</td></tr>`);
                     }else{
                          let i = 0;
                          response.data.forEach((booking) => {
                              i = i+1;
                              let bookingType = booking.bookingType == 1 ? "Schedule Booking" : "Instant Booking";
                              let status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
                              let editButton = `--`;
                              let jsonVehicle = JSON.stringify(booking);


                              if(booking.status == 0){
                                status = `<td class="status status-scheduled" style="vertical-align: middle;">${booking.startDate}</td>`;
                                editButton = `<button type="button" class="icon-btn" onclick='openEditModal(${jsonVehicle})'><i class="zmdi zmdi-edit"></i></button>`;

                              }else if(booking.status == 1){
                                status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
                              }else if(booking.status == 2){
                                status = `<td class="status status-canceled" style="vertical-align: middle;">Canceled</td>`;
                              }else if(booking.status == 3){
                                status = `<td class="status status-ongoing" style="vertical-align: middle;">On Going</td>`;
                              }

                              let newRow = `
                                  <tr>
                                      <td>${i}</td>
                                      <td style="vertical-align: middle;">${booking.bookingNumber}</td>
                                      <td style="vertical-align: middle;">${bookingType}</td>
                                      <td style="vertical-align: middle;">${booking.passengerName}</td>
                                      <td style="vertical-align: middle;">${booking.vehicle.vehicleNumber}</td>
                                      <td style="vertical-align: middle;">${booking.fromDestination}</td>
                                      <td style="vertical-align: middle;">${booking.toDestination}</td>
                                      <td style="vertical-align: middle;">${booking.startDate}</td>
                                      <td style="vertical-align: middle;">${booking.endDate}</td>
                                      <td style="vertical-align: middle;">${booking.totalAmount}</td>
                                      ${status}
                                      <td>
                                            ${editButton}
                                            <button type="button" class="icon-btn" onclick='openEditModal(${jsonVehicle})'><i class="zmdi zmdi-receipt"></i></button>
                                      </td>
                                  </tr>
                              `;
                              tbody.append(newRow);
                          });
                     }
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

                let tbody = $("#userBookingTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="12" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
            complete: function(){
                $('#selectVehicle').css('display', 'block');
            }

        });
    }

    //add new Booking Cash payment
    $("#paymentType1Form").submit(function(event) {
        event.preventDefault();
        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);
        document.getElementById('payment_type').value = '1';
        document.getElementById('selected_vehicle').value = readSelectedVehicle("cabSelection");
        //add all the required values to this

        $.ajax({
            type: "POST",
            url: "../../booking",
            data: $('#newBookingForm').serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    emptyFields();
                    $("#paymentTypeModel").modal("hide");
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

    //form
    function setCustomerInfo(customer){
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customer_name').value = customer.name;
        document.getElementById('customer_nic').value = customer.nic;
        document.getElementById('phone').value = customer.phone;
        document.getElementById("formOverlay").classList.add("d-none");
    }

    function readSelectedVehicle(name){
        var ele = document.getElementsByName(name);

        for (i = 0; i < ele.length; i++) {
            let id = 'cb'+(i+1);
            if (ele[i].checked){
                return ele[i].value;
            }
        }
        return "";
    }

    function setDate(id){
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone

        let currentDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'

        let dateTimeInput = document.getElementById(id);
        dateTimeInput.value = currentDateTime; // Set current date & time
        dateTimeInput.min = currentDateTime; // Disable past date & time
    }

    function addVehicleList(vehicle){
        $("input:radio").removeAttr("checked");
        let vehicleList = document.getElementById('vehicleList');
        vehicleList.innerHTML = "";
        if(vehicle.length == 0){
            let element = `
                <div style="width:100%; text-align:center;">
                       <div class="card">
                          <div class="card-body">
                              <h6 class="card-title">No Vehicle Available!</h6>
                          </div>
                       </div>
                   </div>
                `;
            vehicleList.insertAdjacentHTML('beforeend', element);
        }else{
            let i=1;
            $.each(vehicle, function(index, typeObj) {
                let id = 'cb'+i;
                let titleId = 'title'+i;
                i = i+1;
                let element = `
                    <div style="width:50%;" class="cimg">
                            <input type="radio" id="${id}" name="cabSelection" value="${typeObj.id}">
                            <label for="${id}">
                                <div class="card">
                                    <img class="card-img-top" src="${contextPath}${typeObj.vehicleImage}" alt="${typeObj.vehicleName} Image">
                                    <div class="card-body">
                                        <h5 class="card-title hide-text" style="font-size: 15px;" id="${titleId}"
                                            onmouseover="onMouseOver(this.id)" onmouseleave="onMouseLeave(this.id)">
                                            ${typeObj.vehicleName}
                                        </h5>
                                        <h6 class="card-title">Description</h6>
                                        <p class="card-text">${typeObj.seatCount} Seats</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    `;
                vehicleList.insertAdjacentHTML('beforeend', element);
            });
        }


    }

    function validateChange(id, value){
        if(value != ""){
            let seatCount = document.getElementById("seat_count").value;
            if(id == "v_type"){
                document.getElementById("from_date").disabled = false;
                 document.getElementById("to_date").disabled = false;
                validateVehicle();
                calculateTotalAmount(value);

            }else if(id == "from_date"){
                if(seatCount != ""){
                    validateVehicle(seatCount);
                    calculateTotalAmount(value);
                }
                document.getElementById("to_date").disabled = false;
            }else if(id == "to_date"){
                if(seatCount != ""){
                    validateVehicle(seatCount);
                    calculateTotalAmount(value);
                }
                document.getElementById("from").disabled = false;
            }else if(id == "from"){
                document.getElementById("to").disabled = false;
            }else if(id == "to"){
                document.getElementById("seat_count").disabled = false;
            }
        }else{
            if(id == "v_type"){
                document.getElementById("from_date").disabled = false;
            }else if(id == "from_date"){
                document.getElementById("to_date").disabled = true;
            }else if(id == "to_date"){
                document.getElementById("from").disabled = true;
            }else if(id == "from"){
                document.getElementById("to").disabled = true;
            }else if(id == "to"){
                document.getElementById("seat_count").disabled = true;
            }else if(id == "seat_count"){
                document.getElementById("selectVehicle").style.display = 'none';
            }
        }
    }

    function paymentTypeChanged(value){
        let buttonDiv = document.getElementById("paymentTypeBtn");
        buttonDiv.innerHTML = "";
        let button = `<button type="submit" class="btn btn-success" style="width: 40%;">
                            <i class="fa fa-spinner fa-spin" id="nb_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                      </button>`;
        if(value == "2"){
            button = `<button type="button" class="btn btn-primary" style="width: 40%;" data-bs-toggle="modal" data-bs-target="#cardPaymentModel"> Next </button>`;
        }
        buttonDiv.insertAdjacentHTML('beforeend', button);
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

    function calculateTotalAmount(value){
        let vType = document.getElementById("v_type").value;

        let fromDate = document.getElementById("from_date").value;
        let toDate = document.getElementById("to_date").value;

        let seatCount = document.getElementById("seat_count").value;
        let totalDistance = document.getElementById("total_distance").value;
        if((value != "") && (vType != "") && (fromDate != "") && (toDate != "") && (seatCount != "") && (totalDistance != "")){
            let perHundredKm = 25000.00;//fetch from db
            let perHundredKmForDiscount = 20000.00;//fetch from db
            let totalAmount = 0.0;

            totalAmount = perHundredKm;
//            const date1 = new Date(fromDate);
//            const date2 = new Date(toDate);
//
//            const diffInMs = date2 - date1;
//            const days = diffInMs / (1000 * 60 * 60 * 24);
//
//            if(totalDistance == 100){
//                totalAmount = days >=30 ? perHundredKmForDiscount * days : perHundredKm * days;
//            }else if(totalDistance > 100){
//                totalAmount = days >=30 ? perHundredKmForDiscount * days : perHundredKm * days;
//                totalAmount += (totalDistance - 100) *
//            }else if(totalDistance < 100){
//            }

            document.getElementById("total_amount").value = totalAmount;
        }
    }

    function disableAllFields(){
        document.getElementById("to_date").disabled = true;
        document.getElementById("from_date").disabled = true;
        document.getElementById("from").disabled = true;
        document.getElementById("to").disabled = true;
        document.getElementById("seat_count").disabled = true;

        document.getElementById("total_distance").disabled = true;
    }

    function emptyFields(){
        document.getElementById('v_type').selectedIndex = 0;
        setDate("from_date");
        setDate("to_date");
        document.getElementById('from').value = '';
        document.getElementById('to').value = '';
        document.getElementById('seat_count').value = '';
        document.getElementById('total_amount').value = '';
        document.getElementById('total_distance').value = '';
        document.getElementById('selectVehicle').style.display = 'none';
        disableAllFields();
    }

    ///old

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