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

        if (event.target.name === "cabSelection") {
            document.getElementById("total_distance").disabled = false;
        }else{
            let result = readSelectedVehicle("cabSelection");
            if(result == ""){
                document.getElementById("total_distance").disabled = true;
            }
        }

    });


    function fetchVehicleType(isUpdate = false, selectId = -1){
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
                    let dropdownId = isUpdate ? 'update_v_type' : 'v_type';
                    buildVehicleType(dropdownId, vehicleTypes, selectId);
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

    function fetchUserBookings(isReset = false){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_customer_bookings", customer_id: customerId},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#userBookingTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="10" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#userBookingTable tbody");
                tbody.empty();

                if (response.status === "success") {
                     if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="10" style="text-align:center;">No Data</td></tr>`);
                     }else{


                          let i = 0;
                          let currentDate = new Date();
                          currentDate = currentDate.toISOString().split('T')[0];
                          response.data.forEach((booking) => {

                              i = i+1;
                              let bookingType = booking.bookingType == 1 ? "Schedule Booking" : "Instant Booking";

                              let status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
                              let editButton = ``;

                              let cancelBtn = ` <button type="button" class="btn btn-danger btn-sm" onclick="changeStatus(${booking.id}, 2, 'Cancellation')">
                                                    <i class="fa fa-spinner fa-spin" id="cnl_btn_loading" style="display: none; margin-right: 5px;"></i>Cancel
                                               </button>` ;

                              let startBtn = ` <button type="button" class="btn btn-warning btn-sm" onclick="changeStatus(${booking.id}, 3, 'Start')">
                                                    <i class="fa fa-spinner fa-spin" id="str_btn_loading" style="display: none; margin-right: 5px;"></i>Start
                                               </button>` ;

                              let completedBtn = `<br> <button type="button" class="btn btn-success btn-sm" onclick="changeStatus(${booking.id}, 1, 'Complete')">
                                                    <i class="fa fa-spinner fa-spin" id="cmt_btn_loading" style="display: none; margin-right: 5px;"></i>Complete
                                               </button>` ;

                              startBtn = (currentDate >= booking.startDate.split(' ')[0] && booking.status == 0) ? startBtn : ``;
                              cancelBtn = (booking.status == 0) ? cancelBtn : ``;
                              completedBtn = (booking.status == 3) ? completedBtn : ``;

                              let payment = booking.paymentInfoList;
                              let isPaid = "Yes";

                              let tempTotalProAmount = 0.0;
                               for(let i=0; i<payment.length; i++){
                                  tempTotalProAmount += payment[i].providedAmount;
                               }

                               if(tempTotalProAmount < booking.totalAmount){
                                  isPaid = "No";
                               }


                              let jsonBooking = JSON.stringify(booking);

                              if(booking.status == 0){
                                status = `<td class="status status-scheduled" style="vertical-align: middle;">
                                    ${booking.startDate}<br>
                                    ${cancelBtn} ${startBtn}
                                </td>`;
                                editButton = `<button type="button" class="icon-btn" onclick='openEditModal(${jsonBooking})'><i class="zmdi zmdi-edit"></i></button>`;

                              }else if(booking.status == 1){
                                status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
                              }else if(booking.status == 2){
                                status = `<td class="status status-canceled" style="vertical-align: middle;">Canceled</td>`;
                              }else if(booking.status == 3){
                                status = `<td class="status status-ongoing" style="vertical-align: middle;">
                                    On Going
                                    ${completedBtn}
                                </td>`;
                              }

                              let newRow = `
                                  <tr>
                                      <td style="vertical-align: middle;">${i}</td>
                                      <td style="vertical-align: middle;">${booking.bookingNumber}</td>
                                      <td style="vertical-align: middle;">${bookingType}</td>
                                      <td style="vertical-align: middle;">${booking.passengerName}</td>
                                      <td style="vertical-align: middle;">${booking.vehicle.vehicleNumber}</td>
                                      <td style="vertical-align: middle;">${booking.startDate}</td>
                                      <td style="vertical-align: middle;">${booking.endDate}</td>
                                      <td style="vertical-align: middle;">${booking.totalAmount}</td>
                                      <td style="vertical-align: middle;">${isPaid}</td>
                                      ${status}
                                      <td style="vertical-align: middle;">
                                            ${editButton}
                                            <button type="button" class="icon-btn" ><i class="zmdi zmdi-receipt"></i></button>
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
                tbody.append(`<tr><td colspan="10" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },
            complete: function(){
               if(isReset){
                    $('#selectVehicle').css('display', 'block');
               }
            }

        });
    }

    //change status
    $("#changeStatusForm").submit(function(event) {
        event.preventDefault();
        $('#cs_btn_loading').css('display', 'inline');
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
                    fetchUserBookings();
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
                $('#cs_btn_loading').css('display', 'none');
                $("#confirmStatusChangeModel").modal("hide");
            }
        });
    });



    //add new Booking Cash payment
    $("#paymentType1Form").submit(function(event) {
        event.preventDefault();

        if(document.getElementById('enable').value == 0){
            updateBooking();
            return;
       }


        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);
        let payNowAmount = document.getElementById('payNowAmount').value;
        document.getElementById('payment_type').value = '1';
        document.getElementById('selected_vehicle').value = readSelectedVehicle("cabSelection");
        document.getElementById('provided_amount').value = payNowAmount == "" ? 0.0 : payNowAmount;
        document.getElementById('is_paid').value = ($("#isPayNow").prop('checked') == true) ? 1 : 0;
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
                    fetchUserBookings();
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

    function validateVehicle(){

        let startDate = document.getElementById("from_date").value;
        let endDate = document.getElementById("to_date").value;
        let v_type = document.getElementById("v_type").value;

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "vehicle_list_by_seat", vehicle_type: v_type, start_date: startDate, end_date: endDate},
            dataType: "json",
            beforeSend: function() {

            },
            success: function(response) {
                if (response.status === "success") {
                    addVehicleList('vehicleList', response.data);
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

    function updateValidateVehicle(svTypeId = "", isUpdate = false){

        let startDate = document.getElementById('update_from_date').value;
        let endDate = document.getElementById('update_to_date').value;
        let v_type = svTypeId != "" ? svTypeId : document.getElementById('update_v_type').value;

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "vehicle_list_by_seat", vehicle_type: v_type, start_date: startDate, end_date: endDate},
            dataType: "json",
            beforeSend: function() {

            },
            success: function(response) {

                if (response.status === "success") {
                    let vehicles = response.data;
                    let temp = document.getElementById("old_selected_v_type").value == v_type;

                    if(temp){
                        vehicles = [...response.data];
                        vehicles.unshift(selectedVehicle);
                        vehicles = removeDuplicateVehicle(vehicles, "id");
                    }

                    addVehicleList('updateVehicleList', vehicles, temp);
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
                $('#updateSelectVehicle').css('display', 'block');
            }

        });
    }

    //update booking form
    $("#updateBookingForm").submit(function(event) {
        event.preventDefault();
        updateBooking();
    });

    //updateBooking Cash Payment
    function updateBooking(){
        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

        document.getElementById('update_payment_type').value = '1';
        let newVehicleId = readSelectedVehicle("cabSelectionUpdate");

        document.getElementById('update_selected_vehicle').value = newVehicleId == 0 ? document.getElementById("old_selected_v_type").value : newVehicleId;
        let payNowAmount = document.getElementById('payNowAmount').value;
        document.getElementById('update_provided_amount').value = payNowAmount == "" ? 0.0 : payNowAmount;
        document.getElementById('update_is_paid').value = ($("#isPayNow").prop('checked') == true) ? 1 : 0;
        //add all the required values to this

        $.ajax({
            type: "POST",
            url: "../../booking",
            data: $('#updateBookingForm').serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchUserBookings(true);
                    $("#editBookingModel").modal("hide");
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
            }
        });
    }


    function openPaymentFormModel(){
        $("#pt2").prop("checked", true);
        document.getElementById("isPayNow").checked = false;

        document.getElementById('payNow').style.display = 'none';
        document.getElementById("payNowAmountField").style.display = "none";

        let modal = new bootstrap.Modal(document.getElementById("paymentTypeModel"));
        modal.show();
    }

    function removeDuplicateVehicle(arr, key) {
        let seen = new Set();

        // Traverse from end to start
        for (let i = arr.length - 1; i >= 0; i--) {
            let value = arr[i][key];  // Use key for uniqueness
            if (seen.has(value)) {
                arr.splice(i, 1); // Remove the last occurrence
            } else {
                seen.add(value);
            }
        }

        return arr;
    }

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
            let id = "cb"+(i+1);
            if (ele[i].checked){
                return ele[i].value;
            }
        }
        return "";
    }

    function setDate(id, updateDate = ""){
        let now = new Date();
        let currentDateTime = ""
        if(updateDate == ""){
             now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone
             currentDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM'
        }else{
            currentDateTime = updateDate;
        }

        let dateTimeInput = document.getElementById(id);
        dateTimeInput.value = currentDateTime; // Set current date & time

        dateTimeInput.min = currentDateTime; // Disable past date & time
    }

    function changeStatus(bid, value, label){
        let subtitle = value == 2 ? "Cancel": label

        document.getElementById('booking_id').value = bid;
        document.getElementById('status').value = value;

        document.getElementById('statusLabel').innerHTML = "";
        document.getElementById('statusLabel').innerHTML = 'Confirm '+label;
        document.getElementById('subtitle').innerHTML = subtitle;
        let modal = new bootstrap.Modal(document.getElementById("confirmStatusChangeModel"));
        modal.show();
    }

    function addVehicleList(id, vehicle, isUpdate){
        $("input:radio").removeAttr("checked");

        let vehicleList = document.getElementById(id);

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
            let sName = isUpdate ? "cabSelectionUpdate" : "cabSelection";
            $.each(vehicle, function(index, typeObj) {

                let id = 'cb'+i;
                let titleId = 'title'+i;
                i = i+1;
                let element = `
                    <div style="width:50%;" class="cimg">
                            <input type="radio" id="${id}" name="${sName}" value="${typeObj.id}">
                            <label for="${id}">
                                <div class="card">
                                    <img class="card-img-top" src="${contextPath}${typeObj.vehicleImage}" alt="${typeObj.vehicleName} Image">
                                    <div class="card-body">
                                        <h5 class="card-title hide-text" style="font-size: 15px;" id="${titleId}"
                                            onmouseover="onMouseOver(this.id)" onmouseleave="onMouseLeave(this.id)">
                                            ${typeObj.vehicleName}
                                        </h5>
                                        <h6 id="description${id}" class="card-title hide-text" onmouseover="onMouseOver(this.id)" onmouseleave="onMouseLeave(this.id)">${typeObj.description}</h6>
                                        <p class="card-text">${typeObj.seatCount} Seats</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    `;
                vehicleList.insertAdjacentHTML('beforeend', element);
            });
            if(isUpdate){
                $(`input[name='${sName}']`).prop("checked", false).first().prop("checked", true);
            }
        }


    }

    function validateChange(id, value, isUpdate = false){

        let v_type = "v_type";
        let from_date = "from_date";
        let to_date = "to_date";
        let selectVehicle = "selectVehicle";
        let total_distance = "total_distance";

        document.getElementById("is_update").value = isUpdate;

        if(isUpdate){
            v_type = "update_v_type";
            from_date = "update_from_date";
            to_date = "update_to_date";
            selectVehicle = "updateSelectVehicle";
            total_distance = "update_total_distance";
        }

        if(value != ""){

            if(!isUpdate){document.getElementById("enable").value = 1}
            if(id == v_type){
                document.getElementById(from_date).disabled = false;
                document.getElementById(to_date).disabled = false;
                isUpdate ? updateValidateVehicle() : validateVehicle();
                calculateTotalAmount(value, isUpdate);

            }else if(id == from_date){
                isUpdate ? updateValidateVehicle() : validateVehicle();
                calculateTotalAmount(value, isUpdate);

                document.getElementById(to_date).disabled = false;
            }else if(id == to_date){
                isUpdate ? updateValidateVehicle() : validateVehicle();
                calculateTotalAmount(value, isUpdate);

            }
        }else{
            if(!isUpdate){document.getElementById("enable").value = 0}
            if(id == v_type){
                document.getElementById(from_date).disabled = false;
            }else if(id == from_date){
                document.getElementById(to_date).disabled = true;
            }else if(id == to_date){
                document.getElementById(selectVehicle).style.display = 'none';
            }
        }
    }

    function paymentTypeChanged(value){
        let buttonDiv = document.getElementById("paymentTypeBtn");
        buttonDiv.innerHTML = "";
        let button = `<button type="submit" class="btn btn-success" style="width: 40%;">
                            <i class="fa fa-spinner fa-spin" id="nb_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                      </button>`;
        if(value == "1"){
            document.getElementById('payNow').style.display = 'block';
        }
        if(value == "2"){
            document.getElementById('payNow').style.display = 'none';
            button = `<button type="button" class="btn btn-primary" style="width: 40%;" data-bs-toggle="modal" data-bs-target="#cardPaymentModel"> Next </button>`;
        }
        buttonDiv.insertAdjacentHTML('beforeend', button);
    }

    function payNowValidation(){
        let payNowField = document.getElementById("payNowAmountField");
        if($("#isPayNow").prop('checked') == true){
            let total_amount = "total_amount";
            let is_update = document.getElementById("is_update").value
            if(is_update == "true"){
                total_amount = "update_total_amount";
            }
            let amount = document.getElementById(total_amount).value;
            let balanceAmount = document.getElementById("balance_amount").value;

            document.getElementById("payNowAmount").value = balanceAmount == "-1" ? amount : balanceAmount;
            payNowField.style.display = "block";
        }else{
            document.getElementById("payNowAmount").value = "";
            payNowField.style.display = "none";
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
            calculateTotalAmount(selectId, true);
        }

    }

    function calculateTotalAmount(value, isUpdate = false){

        let v_type = "v_type";
        let from_date = "from_date";
        let to_date = "to_date";
        let total_distance = "total_distance";
        let total_amount = "total_amount";

        if(isUpdate){
            v_type = "update_v_type";
            from_date = "update_from_date";
            to_date = "update_to_date";
            total_distance = "update_total_distance";
            total_amount = "update_total_amount";
        }

        let vType = document.getElementById(v_type).value;

        let fromDate = document.getElementById(from_date).value;
        let toDate = document.getElementById(to_date).value;

        let totalDistance = document.getElementById(total_distance).value;

        if((value != "") && (vType != "") && (fromDate != "") && (toDate != "") && (totalDistance != "")){

            let dAmount = vehicleTypes.find(item => item.id == vType);

            let perOneDay = dAmount.perOneDay;
            let discountFullAmount = dAmount.discountFullAmount;
            let discountBalanceAmount = dAmount.discountBalanceAmount;
            let penaltyExtraKm = dAmount.penaltyExtraKm;
            let maximumKmPerDay = dAmount.maximumKmPerDay;
            let discountDays = dAmount.discountDays;

            let totalAmount = 0.0;

            const days = calculateDays(fromDate, toDate);

            let avgDistance = (totalDistance / days);
            let extraKmAmount = (avgDistance > maximumKmPerDay) ? ((avgDistance-100) * penaltyExtraKm * days) : 0.0;

            if(days >= discountDays){
                let discountDays = Math.floor(days/discountDays);
                let balanceDiscountDays = days % discountDays;

                totalAmount = (discountDays * discountFullAmount) + (balanceDiscountDays * discountBalanceAmount);
            }else {
                totalAmount = perOneDay * days;
            }
            totalAmount += extraKmAmount;

            document.getElementById(total_amount).value = Math.floor(totalAmount);
            if(isUpdate){
                let providedAmount = document.getElementById("update_provided_amount").value;

                let updateBtnDiv = document.getElementById("update_btn");
                updateBtnDiv.innerHTML = "";
                let button = ``;

                if(providedAmount < totalAmount){
                    document.getElementById("balance_amount").value = totalAmount - providedAmount
                    button = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentTypeModel">
                                    Next
                              </button>`;
                }else{
                    document.getElementById("balance_amount").value = "-1";
                    button = `<button type="submit" class="btn btn-success">Submit</button>`;
                }

                updateBtnDiv.insertAdjacentHTML('beforeend', button);
            }
        }
    }

    function calculateDays(fromDate, toDate){
         const date1 = new Date(fromDate);
         const date2 = new Date(toDate);

         const diffInMs = date2 - date1;
         return diffInMs / (1000 * 60 * 60 * 24);
    }

    function disableAllFields(){
        document.getElementById("to_date").disabled = true;
        document.getElementById("from_date").disabled = true;
        document.getElementById("total_distance").disabled = true;
    }

    function emptyFields(){
        document.getElementById('v_type').selectedIndex = 0;
        setDate("from_date");
        setDate("to_date");
        document.getElementById('total_amount').value = '';
        document.getElementById('total_distance').value = '';
        document.getElementById('selectVehicle').style.display = 'none';
        disableAllFields();
    }

    function openEditModal(booking){
        let totalProvidedAmount = 0;
        for(let i=0; i<booking.paymentInfoList.length; i++){
            totalProvidedAmount += booking.paymentInfoList[i].providedAmount;
        }

        //default data setting
        document.getElementById("is_update").value = true;
        document.getElementById("enable").value = 0;
        document.getElementById("update_booking_id").value = booking.id;
        document.getElementById("old_selected_vehicle").value = booking.vehicleId;
        document.getElementById("old_selected_v_type").value = booking.vehicle.vehicleTypeId;
        document.getElementById("update_selected_vehicle").value = booking.vehicle.vehicleTypeId;
        document.getElementById("update_provided_amount").value = totalProvidedAmount;

        //default form setting
        document.getElementById("isPayNow").checked = false;
        document.getElementById("pt2").checked = true;
        document.getElementById("payNow").style.display = "none";
        document.getElementById("payNowAmountField").style.display = "none";

        fetchVehicleType(true, booking.vehicle.vehicleTypeId);

        let sDate = convertToISOFormat(booking.startDate);
        let eDate = convertToISOFormat(booking.endDate);
        setDate("update_from_date", sDate);
        setDate("update_to_date", eDate);

        selectedVehicle = booking.vehicle;
        updateValidateVehicle(booking.vehicle.vehicleTypeId);

        document.getElementById("update_total_distance").value = booking.totalRequestedDistance;
        document.getElementById("update_total_amount").value = booking.totalAmount;
        document.getElementById("updateCustomerId").value = booking.customerId;
        document.getElementById("update_customer_nic").value = booking.customer.nic;
        document.getElementById("update_customer_name").value = booking.passengerName;
        document.getElementById("update_phone").value = booking.passengerPhone;

        let modal = new bootstrap.Modal(document.getElementById("editBookingModel"));
        modal.show();
    }

    function convertToISOFormat(dateTimeStr) {
        // Remove milliseconds (.0) if present
        let cleanDateTimeStr = dateTimeStr.split(".")[0];

        // Replace space with 'T' to create a valid date-time format
        let formattedStr = cleanDateTimeStr.replace(" ", "T");

        // Create a Date object
        let dateObj = new Date(formattedStr);

        // Format the output: YYYY-MM-DDTHH:MM
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day = String(dateObj.getDate()).padStart(2, "0");
        let hours = String(dateObj.getHours()).padStart(2, "0");
        let minutes = String(dateObj.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }


</script>