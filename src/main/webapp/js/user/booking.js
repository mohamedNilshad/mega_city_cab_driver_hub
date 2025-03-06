<script>

    document.addEventListener("DOMContentLoaded", function () {
        fetchVehicleType();
        fetchCustomer();
        fetchCompanyProfile();
    });

    function fetchVehicleType(isUpdate = false, selectId = -1){
        $.ajax({
            type: "GET",
            url: "../../vehicle",
            data: { action: "vehicle_types" },
            dataType: "json",
            beforeSend: function() {

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

            }
        });
    }

    function fetchVehicles(){
        let startDate = document.getElementById("d_from_date").value;
        let endDate = document.getElementById("d_to_date").value;

        $.ajax({
            type: "GET",
            url: "../../vehicle",
            data: { action: "get_vehicles", start_date: startDate, end_date: endDate},
            dataType: "json",
            beforeSend: function() {
                document.getElementById("formOverlay").classList.remove("d-none");
            },
            success: function(response) {
                if (response.status === "success") {
                    const dataList = response.data;
                    const groupedData = {};

                    dataList.forEach(item => {
                        if (!groupedData[item.vehicleTypeId]) {
                            groupedData[item.vehicleTypeId] = [];
                        }
                        groupedData[item.vehicleTypeId].push(item);
                    });
                    const vehicleTypes = Object.values(groupedData);

//                    console.log(vehicleTypes);
                    let body = ``;

                    for(let i=0; i<vehicleTypes.length; i++){
                        let vehicles = vehicleTypes[i];

                        let vehicleTypeName = vehicles[0].vehicleType;

                        body += `<div class="navbar navbar-light" style="background-color: #e3f2fd; margin-bottom: 5px;">
                                      <div class="navbar-brand">${vehicleTypeName}</div>
                                      <a href="#" class="stretched-link" style="float:right; display:none;">See All</a>
                                 </div>
                                 <div class="row g-4 mb-2"> `;

                        for(let k=0; k<vehicles.length; k++){

                            let vehicleImage = vehicles[k].vehicleImage;
                            let vehicleName= vehicles[k].vehicleName;
                            let vehicleDescription= vehicles[k].description;
                            let seatCount= vehicles[k].seatCount;
                            let descriptionId= `description${i}${k}`;
                            let jsonVehicle = JSON.stringify(vehicles[k]);

                            body += `
                                    <div style="width:25%;">
                                        <div class="card">
                                            <img class="card-img-top" src="${contextPath}${vehicleImage}" alt="cab image">
                                            <div class="card-body">
                                                <h5 class="card-title">${vehicleName}</h5>
                                                <h6 class="card-title hide-text" id="${descriptionId}" onmouseover="onMouseOver(this.id)" onmouseleave="onMouseLeave(this.id)">${vehicleDescription}</h6>
                                                <p class="card-text">${seatCount} Seats</p>
                                                <button type="button" class="btn btn-primary" onclick='openNewBookingForm(${jsonVehicle})'>Schedule</button>
                                                <a href="#" class="btn btn-success" style="display:none;">Get Now</a>
                                            </div>
                                        </div>
                                    </div>
                            `;

                        }
                        body += `</div>`;
                    }

                    let bodyDiv = document.getElementById("vehicleListBody");
                    bodyDiv.innerHTML = "";

                    bodyDiv.insertAdjacentHTML('beforeend', body);

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

    function fetchCustomer(){
        $.ajax({
            type: "GET",
            url: "../../customer",
            data: { action: "customer_info", customer_id: customerId },
            dataType: "json",
            success: function(response) {

                if (response.status === "success") {
                    customerInfo = response.data;

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
                document.getElementById("formOverlay").classList.add("d-none");
            }
        });
    }

    function validateVehicle(selectedId = -1){

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
                        addVehicleList('vehicleList', response.data, false, selectedId);
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


    function openNewBookingForm(vehicle){
        $("#newBookingBtn").attr("disabled", true);

        //default data setting
        document.getElementById("enable").value = 1;
        document.getElementById("selected_vehicle").value = vehicle.id;
        document.getElementById("v_type").value = vehicle.vehicleTypeId;
        document.getElementById("from_date").value = document.getElementById("d_from_date").value;
        document.getElementById("to_date").value = document.getElementById("d_to_date").value;
        validateVehicle(vehicle.id);
        document.getElementById("total_distance").value = "";
        document.getElementById("total_amount").value = "";


        document.getElementById("customerId").value = customerInfo.id;
        document.getElementById("customer_nic").value = customerInfo.nic;
        document.getElementById("customer_name").value = customerInfo.name;
        document.getElementById("phone").value = customerInfo.phone;

        let modal = new bootstrap.Modal(document.getElementById("bookingFormModel"));
        modal.show();
    }

    function addVehicleList(id, vehicle, isUpdate=false, selectedId = -1){
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
                            <input type="radio" id="${id}" name="${sName}" value="${typeObj.id}" onclick="enableSubmitButton(${isUpdate})">
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
            if(selectedId != -1){
                $(`input[name='cabSelection']`).prop("checked", false);
                $(`input[name='cabSelection'][value='${selectedId}']`).prop("checked", true);
            }

            if(isUpdate){
                $(`input[name='${sName}']`).prop("checked", false).first().prop("checked", true);
            }
        }


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

    function setToDate(id, updateDate = ""){
        let now = new Date();
        let currentDateTime = "";

        if (updateDate == "") {
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            let tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);

            currentDateTime = tomorrow.toISOString().slice(0, 16);
        } else {
            currentDateTime = updateDate;
        }

        let dateTimeInput = document.getElementById(id);
        dateTimeInput.value = currentDateTime;
        dateTimeInput.min = currentDateTime;

    }

    function validateToDate(fromId, toId) {


        let fromDateInput = document.getElementById(fromId);
        let fromDateValue = new Date(fromDateInput.value);
        let newMinToDate = fromDateValue;

        let toDateInput = document.getElementById(toId);
        let toDateValue = new Date(toDateInput.value);


        if (toDateValue <= fromDateValue) {

            toDateValue.setDate(fromDateValue.getDate() + 1);
            toDateInput.value = toDateValue.toISOString().slice(0, 16);

        }
        newMinToDate.setDate(fromDateValue.getDate() + 1);

        toDateInput.min = newMinToDate.toISOString().slice(0, 16);
        fetchVehicles();
    }


    //------------------------------------PAYMENT----------->

    function openPaymentFormModel(isNew = false){

        if(!isNew) $("#editBookingModel").modal("hide");

        if(isNew){
            let formData = new FormData(document.getElementById("newBookingForm"));
            if(validNewBookingForm(formData)) return;
        }


        let buttonDiv = document.getElementById("paymentTypeBtn");
        buttonDiv.innerHTML = "";
        let button = `<button type="button" class="btn btn-primary" style="width: 40%;" onclick="openCardPaymentModel()" id="cardPaymentNextBtn"> Next </button>`;
        buttonDiv.insertAdjacentHTML('beforeend', button);

        $("#pt2").prop("checked", true);
        document.getElementById("isPayNow").checked = false;
        document.getElementById('payNow').style.display = 'none';


        let total_amount = "total_amount";
        let is_update = document.getElementById("is_update").value
        if(is_update == "true"){
            total_amount = "update_total_amount";
        }
        let amount = document.getElementById(total_amount).value;
        let balanceAmount = document.getElementById("balance_amount").value;

        document.getElementById("payNowAmount").value = balanceAmount == "-1" ? amount : balanceAmount;

        let modal = new bootstrap.Modal(document.getElementById("paymentTypeModel"));
        modal.show();

        addCustomBackdrop();

    }

    function openCardPaymentModel(){

        document.getElementById("pay_amount_btn_1").innerHTML = document.getElementById("payNowAmount").value;
        document.getElementById("pay_amount_1").innerHTML = document.getElementById("payNowAmount").value;
        document.getElementById("payment_type").innerHTML = 2;

        let modal = new bootstrap.Modal(document.getElementById("cardPaymentModel"));
        modal.show();
        addCustomBackdrop();
    }

    function paymentTypeChanged(value){

        let buttonDiv = document.getElementById("paymentTypeBtn");
        buttonDiv.innerHTML = "";
        let button = `<button type="submit" class="btn btn-success" style="width: 40%;" id="cashPaymentSubmitBtn">
                            <i class="fa fa-spinner fa-spin" id="nb_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                      </button>`;
        if(value == "1"){
            document.getElementById('payNow').style.display = 'block';
        }
        if(value == "2"){
            document.getElementById('payNow').style.display = 'none';
            button = `<button type="button" class="btn btn-primary" style="width: 40%;" onclick="openCardPaymentModel()" id="cardPaymentNextBtn"> Next </button>`;
        }
        buttonDiv.insertAdjacentHTML('beforeend', button);
        enablePaymentButtons();
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
//            payNowField.style.display = "block";
        }else{
//            document.getElementById("payNowAmount").value = "";
//            payNowField.style.display = "none";
        }
    }

    //add new Cash payment
    $("#paymentType1Form").submit(function(event) {
        event.preventDefault();

        $(":submit").attr("disabled", true);
        if(validPaymentChooseForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            return;
        }

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

                    emptyFields();
                    $("#paymentTypeModel").modal("hide");
                    $("#bookingFormModel").modal("hide");
                    document.querySelector('.custom-backdrop').remove();

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
                $('#nb_btn_loading').css('display', 'none');
                window.scrollTo(0,0);
            }
        });
    });

    //Card payment
    $("#cardPaymentTypeForm").submit(function(event) {
        event.preventDefault();

        if(document.getElementById('enable').value == 0){
            updateBooking();
            return;
       }


        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);
        let payNowAmount = document.getElementById('payNowAmount').value;
        document.getElementById('payment_type').value = '2';
        document.getElementById('selected_vehicle').value = readSelectedVehicle("cabSelection");
        document.getElementById('provided_amount').value = payNowAmount == "" ? 0.0 : payNowAmount;
        document.getElementById('is_paid').value =  1;

        document.getElementById('card_holder_name').value = document.getElementById('r_card_holder_name').value;
        document.getElementById('card_number').value = document.getElementById('r_card_number').value;


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

                    fetchVehicles();
                    emptyFields();
                    $("#paymentTypeModel").modal("hide");
                    $("#cardPaymentModel").modal("hide");
                    $("#bookingFormModel").modal("hide");
                    document.querySelector('.custom-backdrop').remove();

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

    function addCustomBackdrop() {
        let backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop', 'fade', 'show', 'custom-backdrop');
        document.body.appendChild(backdrop);
    }

    document.getElementById('paymentTypeModel').addEventListener('hidden.bs.modal', function () {
        let backdrop = document.querySelector('.custom-backdrop');
        if (backdrop) backdrop.remove();
    });

    document.getElementById('cardPaymentModel').addEventListener('hidden.bs.modal', function () {
        let backdrop = document.querySelector('.custom-backdrop');
        if (backdrop) backdrop.remove();
    });

    function validateChange(id, value, isUpdate = false){

        enableSubmitButton(isUpdate);

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

    function calculateTotalAmount(value, isUpdate = false){
            enableSubmitButton(isUpdate);
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

    //            const days = calculateDays(fromDate, toDate);
                let def = calculateDaysAndHour(fromDate, toDate);
                let days = def.days == 0 ? 1 : def.days;

                if(days != 0 && def.hours > 2){
                    days +=1;
                }

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
                        button = `<button type="button" class="btn btn-primary" onclick="openPaymentFormModel(${!isUpdate})">
                                        Next
                                  </button>`;
                    }else{
                        document.getElementById("balance_amount").value = "-1";

                        button = `<button type="submit" class="btn btn-success" id="updateBookingBtn">Submit</button>`;
                        if(totalDistance == originalValues.totalDistance){
                            button = `<button type="submit" class="btn btn-success" id="updateBookingBtn" disabled>Submit</button>`;
                        }
                    }

                    updateBtnDiv.insertAdjacentHTML('beforeend', button);

                }
            }
    }

    //-------------------------------------------------------------------HISTORY---------------------------->
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
                   <td scope="row" colspan="11" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#userBookingTable tbody");
                tbody.empty();

                if (response.status === "success") {
                     if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="11" style="text-align:center;">No Data</td></tr>`);
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

                              let payBtn = ``;
                              let jsonBooking = JSON.stringify(booking);

                              let payment = booking.paymentInfoList;
                              let isPaid = "Yes";

                              let tempTotalProAmount = 0.0;
                               for(let i=0; i<payment.length; i++){
                                  tempTotalProAmount += payment[i].providedAmount;
                               }

                               if(tempTotalProAmount < booking.totalAmount){

                                let tempBalAmount = booking.totalAmount - tempTotalProAmount;
                                  isPaid = "No";
                                  payBtn = `<button type="button" class="icon-btn" onclick='openCustomPaymentFormModel(${jsonBooking},${tempBalAmount})' style="color: green;">
                                                  <i class="fas fa-hand-holding-usd"></i>
                                          </button>`;
                               }



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
                                            <button type="button" class="icon-btn" onclick="fetchInvoiceData(${booking.id})"><i class="zmdi zmdi-receipt"></i></button>
                                            ${payBtn}
                                      </td>
                                  </tr>
                              `;
                              tbody.append(newRow);
                          });
                     }
                }else {
                    tbody.empty();
                    tbody.append(`<tr><td colspan="11" style="text-align:center;">No Data</td></tr>`);

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
                tbody.append(`<tr><td colspan="11" style="text-align:center;">No Data</td></tr>`);

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

    function openEditModal(booking){
        $("#updateBookingBtn").attr("disabled", true);
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
//        document.getElementById("payNowAmountField").style.display = "none";

        fetchVehicleType(true, booking.vehicle.vehicleTypeId);

        let sDate = convertToISOFormat(booking.startDate);
        let eDate = convertToISOFormat(booking.endDate);
        setDate("update_from_date", sDate);
        setToDate("update_to_date", eDate);

        selectedVehicle = booking.vehicle;
        updateValidateVehicle(booking.vehicle.vehicleTypeId);

        document.getElementById("update_total_distance").value = booking.totalRequestedDistance;
        document.getElementById("update_total_amount").value = booking.totalAmount;
        document.getElementById("updateCustomerId").value = booking.customerId;
        document.getElementById("update_customer_nic").value = booking.customer.nic;
        document.getElementById("update_customer_name").value = booking.passengerName;
        document.getElementById("update_phone").value = booking.passengerPhone;

        setOldValues(booking);

        let modal = new bootstrap.Modal(document.getElementById("editBookingModel"));
        modal.show();
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

    //------------------------------CF AMOUNT----------------------------------------->
    function calculateFinalAmount(bookId){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_all_readings", book_id: bookId},
            dataType: "json",

            success: function(response) {

                if (response.status === "success") {
                    let b = response.data;

                    let vType = b.vehicle.vehicleTypeId;
                    let fromDate = b.finalStartDate;
                    let toDate = b.finalEndDate;
                    let totalDistance = b.endMeterReading - b.startMeterReading;
                    console.log(totalDistance);
                    let dAmount = vehicleTypes.find(item => item.id == vType);

                    let perOneDay = dAmount.perOneDay;
                    let discountFullAmount = dAmount.discountFullAmount;
                    let discountBalanceAmount = dAmount.discountBalanceAmount;
                    let penaltyExtraKm = dAmount.penaltyExtraKm;
                    let maximumKmPerDay = dAmount.maximumKmPerDay;
                    let discountDays = dAmount.discountDays;

                    let totalAmount = 0.0;

                    let def = calculateDaysAndHour(fromDate, toDate);
                    let days = def.days == 0 ? 1 : def.days;


                    if(days != 0 && def.hours > 2){
                        days +=1;
                    }

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

                    console.log(Math.floor(totalAmount));

                    updateFinalAmount(bookId, Math.floor(totalAmount));

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
        });
    }

    function updateFinalAmount(bookingId, amount){
        $.ajax({
            type: "POST",
            url: "../../booking",
            data: {action: "update_final_amount", bookingId: bookingId, finalAmount: amount},
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {

                    fetchUserBookings();

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
                $('#cs_btn_loading').css('display', 'none');
                $("#confirmStatusChangeModel").modal("hide");
            }
        });
    }

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

                    if(document.getElementById("status").value == 1){
                        calculateFinalAmount(document.getElementById("booking_id").value);
                    }else{
                        fetchUserBookings();

                        $("#success_alert").hide();
                            $('#success_alert').html(response.message);
                            $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                            $("#success_alert").slideUp(500);
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
    //------------------------------CF AMOUNT----------------------------------------->

    function updateStatus(){
        $.ajax({
            type: "POST",
            url: "../../booking",
            data: $("#changeStatusForm").serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    fetchUserBookings();

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
                $('#cs_btn_loading').css('display', 'none');
                $("#confirmStatusChangeModel").modal("hide");
            }
        });
    }

    //update booking form
    $("#updateBookingForm").submit(function(event) {
        event.preventDefault();
        $(":submit").attr("disabled", true);
        if(validUpdateBookingForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            return;
        }
        updateBooking();
    });

    //updateBooking Cash Payment
    function updateBooking(isCard = false){
        $('#nb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

        document.getElementById('update_payment_type').value = isCard ? '2' : '1';
        let newVehicleId = readSelectedVehicle("cabSelectionUpdate");

        document.getElementById('update_selected_vehicle').value = newVehicleId == 0 ? document.getElementById("old_selected_v_type").value : newVehicleId;
        let payNowAmount = document.getElementById('payNowAmount').value;
        document.getElementById('update_provided_amount').value = payNowAmount == "" ? 0.0 : payNowAmount;
        document.getElementById('update_is_paid').value = 1;

        if(isCard){
            let cName = document.getElementById('r_card_holder_name').value;
            let cNumber= document.getElementById('r_card_number').value;
            document.getElementById('update_card_holder_name').value = cName;
            document.getElementById('update_card_number').value = cNumber;
        }

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
                    emptyCardFields();
                    $("#editBookingModel").modal("hide");
                    $("#cardPaymentModel").modal("hide");
                    isCard ? $("#cardPaymentModel").modal("hide") : $("#paymentTypeModel").modal("hide");
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

    function changeStatus(bid, value, label){
        let subtitle = value == 2 ? "Cancel": label

        document.getElementById('meter_reading').value = "";

        if(value == 1 || value == 3){
            document.getElementById('meter_reading_div').style.display = "block";
        }else{
            document.getElementById('meter_reading_div').style.display = "none";
        }
        document.getElementById('booking_id').value = bid;
        document.getElementById('status').value = value;

        document.getElementById('statusLabel').innerHTML = "";
        document.getElementById('statusLabel').innerHTML = 'Confirm '+label;
        document.getElementById('subtitle').innerHTML = subtitle;
        let modal = new bootstrap.Modal(document.getElementById("confirmStatusChangeModel"));
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
            calculateTotalAmount(selectId, true);
        }

    }

    function calculateDays(fromDate, toDate){
         const date1 = new Date(fromDate);
         const date2 = new Date(toDate);

         const diffInMs = date2 - date1;
         return diffInMs / (1000 * 60 * 60 * 24);
    }

    function calculateDaysAndHour(fromDate, toDate) {
        const date1 = new Date(fromDate);
        const date2 = new Date(toDate);

        const diffInMs = date2 - date1;

        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { days: diffInDays, hours: diffInHours };
    }

    function disableAllFields(){
        document.getElementById("to_date").disabled = true;
        document.getElementById("from_date").disabled = true;
        document.getElementById("total_distance").disabled = true;
    }

    function emptyFields(){
        document.getElementById('v_type').selectedIndex = 0;
        setDate("from_date");
        setToDate("to_date");
        setDate("d_from_date");
        setToDate("d_to_date");
        document.getElementById('total_amount').value = '';
        document.getElementById('total_distance').value = '';
        document.getElementById('selectVehicle').style.display = 'none';
        emptyCardFields();
        disableAllFields();
    }

    function emptyCardFields(){
        document.getElementById('r_card_number').value = "";
        document.getElementById('r_card_holder_name').value = "";
        document.getElementById('pay_amount_1').innerHTML = "";
        document.getElementById('pay_amount_btn_1').innerHTML = "";
        document.getElementById("balance_amount").value = "-1";
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



    //------------------------------------INVOICE----------->
    function fetchCompanyProfile(){

        $.ajax({
            type: "GET",
            url: "../../company",
            data: { action: "get_company_profile", companyId: 1},
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                  companyProfile = response.data;
                }else {

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
                }

            },
            error: function(xhr) {

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

        });
    }

    function fetchInvoiceData(bId){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_invoice_data", bookingId: bId},
            dataType: "json",

            success: function(response) {

                if (response.status === "success") {
                     if(response.data.length != 0){

                          let currentDate = {
                            currentDate: new Date().toISOString().split('T')[0],
                          };
                          let invoiceData = Object.assign(currentDate, response.data);

                          openInvoiceModel(invoiceData);
                     }
                }else {

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
                }

            },
            error: function(xhr) {

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

        });
    }

    function openInvoiceModel(invoiceData){
        let jsonInvoice= JSON.stringify(invoiceData);

        document.getElementById("downloadBtn").innerHTML = `
            <button type="button" onclick='printInvoice(${jsonInvoice})' class="btn btn-primary btn-sm" style="width: 10%;margin-bottom: 5px; margin-left: 15px; float: left;">
                <i class="zmdi zmdi-download"></i>
            </button>
        `;

        document.getElementById("currentDate").innerHTML = invoiceData.currentDate;
        document.getElementById("rideStatus").innerHTML = getStatusByCode(invoiceData.status);

        document.getElementById("companyName").innerHTML = companyProfile.companyName;
        document.getElementById("companyAddress").innerHTML = companyProfile.companyAddress;
        document.getElementById("companyEmail").innerHTML = "Email: " + companyProfile.companyEmail;
        document.getElementById("companyPhone").innerHTML = "Phone: " + companyProfile.companyPhone;

        document.getElementById("customerName").innerHTML = invoiceData.passengerName;
        document.getElementById("customerAddress").innerHTML = invoiceData.customer.address;
        document.getElementById("customerEmail").innerHTML = "Email: " + invoiceData.customer.email;
        document.getElementById("customerPhone").innerHTML = "Phone: " + invoiceData.passengerPhone;

        document.getElementById("bookingNo").innerHTML = invoiceData.bookingNumber;
        document.getElementById("iBookingType").innerHTML = invoiceData.bookingType == 1 ? "Schedule Booking" : "Instant Booking";
        document.getElementById("iStartDate").innerHTML = invoiceData.status == 1 ? invoiceData.finalStartDate : invoiceData.startDate;
        document.getElementById("iEndDate").innerHTML = invoiceData.status == 1 ? invoiceData.finalEndDate : invoiceData.endDate;
        let totalAmount = invoiceData.totalAmount;
        document.getElementById("iTotalAmount").innerHTML = formatCurrency(totalAmount);

        document.getElementById("iTotalAmountToPay").innerHTML = formatCurrency(totalAmount);

        let paidAmount = 0.0;

        let tbody = $("#invoiceListTable tbody");
        tbody.empty();
        let i = 0;
        invoiceData.paymentInfoList.forEach((payment) => {
            i += 1;
            paidAmount += payment.providedAmount;
            let paymentType = payment.paymentType == 1 ? "Cash" : "Card";

            let newRow = `
              <tr>
                  <td class="center">${i}</td>
                  <td class="left strong">${payment.referenceNumber}</td>
                  <td class="left">${paymentType}</td>
                  <td class="center">${payment.createdDate}</td>

                  <td class="right" style="text-align: right;">${payment.providedAmount}</td>
              </tr>
          `;
          tbody.append(newRow);
        });

        let balanceAmount = (totalAmount - paidAmount) <= 0 ? 0.0 : (totalAmount - paidAmount);
        let returnAmount = (paidAmount > totalAmount) ? paidAmount - totalAmount : 0.0;
        let isPaid = (paidAmount >= totalAmount);

        document.getElementById("iTotalPaidAmount").innerHTML = formatCurrency(paidAmount);
        document.getElementById("iTotalBalAmount").innerHTML = formatCurrency(balanceAmount);
        document.getElementById("iReturnAmount").innerHTML = formatCurrency(returnAmount);

        let rubberStamp = document.getElementById("rubberStamp");
        if(isPaid){
            rubberStamp.innerHTML = "Paid";
            rubberStamp.style.color = "green";
            rubberStamp.style.borderColor  = "green";
        }else{
            rubberStamp.innerHTML = "Not Paid";
            rubberStamp.style.color = "red";
            rubberStamp.style.borderColor  = "red";
        }


        let modal = new bootstrap.Modal(document.getElementById("invoiceModel"));
        modal.show();
    }

    function printInvoice(invoiceData) {

        var printWindow = window.open('', '_blank', 'width=800,height=600');

        printWindow.document.write(getContent(invoiceData, companyProfile));
        printWindow.document.close();
        printWindow.print();
    }

    function formatCurrency(amount){
        return amount.toLocaleString('en-LK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getStatusByCode(value){
        if(value == 0){
            return "Schedule";
        }else if(value == 1){
            return "Completed";
        }else if(value == 2){
            return "Cancelled";
        }else if(value == 3){
            return "On Going";
        }
    }


    //------------------------------------CUSTOM PAYMENT----------->

    function openCustomPaymentFormModel(booking, balanceAmount){

        $("#cpt2").prop("checked", true);
        document.getElementById("cIsPayNow").checked = false;
        document.getElementById('cPayNow').style.display = 'none';

        let button = `<button type="button" class="btn btn-primary" style="width: 40%;" onclick="openCustomCardPaymentModel()" id="cCardPaymentNextBtn"> Next </button>`;
        document.getElementById("cPaymentTypeBtn").innerHTML = "";
        document.getElementById("cPaymentTypeBtn").insertAdjacentHTML('beforeend', button);

        document.getElementById("bookingIdForCustomPay").value = booking.id;
        document.getElementById("customerIdForCustomPay").value = booking.customerId;
        document.getElementById("paymentTypeForCustomPay").value = 1;
        document.getElementById("totalAmountForCustomPay").value = booking.totalAmount;
        document.getElementById("balanceAmountForCustomPay").value = balanceAmount;

        document.getElementById("balanceAmount").value = balanceAmount;

        let modal = new bootstrap.Modal(document.getElementById("customPaymentTypeModel"));
        modal.show();
    }

    function openCustomCardPaymentModel(){

        document.getElementById("pay_amount_btn").innerHTML = document.getElementById("balanceAmount").value;
        document.getElementById("pay_amount").innerHTML = document.getElementById("balanceAmount").value;

        document.getElementById("bookingIdForCustomPayCard").value = document.getElementById("bookingIdForCustomPay").value;
        document.getElementById("customerIdForCustomPayCard").value = document.getElementById("customerIdForCustomPay").value;
        document.getElementById("totalAmountForCustomPayCard").value = document.getElementById("totalAmountForCustomPay").value;
        document.getElementById("balanceAmountForCustomPayCard").value = document.getElementById("balanceAmount").value;

        let modal = new bootstrap.Modal(document.getElementById("customCardPaymentModel"));
        modal.show();
    }

    function cPayNowValidation(){
        let payNowField = document.getElementById("balanceAmount");
        if($("#cIsPayNow").prop('checked') == true){

            let amount = document.getElementById('totalAmountForCustomPay').value;
            let balanceAmount = document.getElementById("balanceAmountForCustomPay").value;

            payNowField.value = balanceAmount == "-1" ? amount : balanceAmount;
        }
    }

    function cPaymentTypeChanged(value){

        let buttonDiv = document.getElementById("cPaymentTypeBtn");
        buttonDiv.innerHTML = "";
        let button = `<button type="submit" class="btn btn-success" style="width: 40%;" id="cCashPaymentSubmitBtn">
                            <i class="fa fa-spinner fa-spin" id="csb_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                      </button>`;
        if(value == "1"){
            document.getElementById('cPayNow').style.display = 'block';
        }
        if(value == "2"){
            document.getElementById('cPayNow').style.display = 'none';
            button = `<button type="button" class="btn btn-primary" style="width: 40%;" onclick="openCustomCardPaymentModel()" id="cCardPaymentNextBtn"> Next </button>`;
        }
        buttonDiv.insertAdjacentHTML('beforeend', button);

    }

    //custom cash payment
    $("#customPaymentTypeForm").submit(function(event) {
        event.preventDefault();

        $('#csb_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

//        document.getElementById('is_paid').value = ($("#cIsPayNow").prop('checked') == true) ? 1 : 0;
        //add all the required values to this

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
                    $("#customPaymentTypeModel").modal("hide");
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
                $('#csb_btn_loading').css('display', 'none');
            }
        });
    });

    //custom card payment
    $("#cCardPaymentTypeForm").submit(function(event) {
        event.preventDefault();
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
                    $("#customPaymentTypeModel").modal("hide");
                    $("#customCardPaymentModel").modal("hide");
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



    //------------------------------------VALIDATIONS----------->
    let originalValues;

    function setOldValues(booking){
        originalValues = {
            vType: booking.vehicle.vehicleTypeId,
            name: booking.passengerName,
            phone: booking.passengerPhone,
            totalDistance: booking.totalRequestedDistance,
            selectedVehicle: booking.vehicle.id
        };
    }

    function enableSubmitButton(isUpdate){

        if(isUpdate){
            let v_type = document.getElementById("update_v_type").value;
            let customer_name = document.getElementById("update_customer_name").value;
            let phone = document.getElementById("update_phone").value;
            let total_distance = document.getElementById("update_total_distance").value;
            let selectedVehicle = document.querySelector('input[name="cabSelectionUpdate"]:checked')?.value;


            let btnId = "#updateBookingBtn";
            if(v_type != originalValues.vType){
                $(btnId).attr("disabled", false);
            }else if(customer_name != originalValues.name){
                $(btnId).attr("disabled", false);
            }else if(phone != originalValues.phone){
                $(btnId).attr("disabled", false);
            }else if(total_distance != originalValues.totalDistance){
                $(btnId).attr("disabled", false);
            }else if(selectedVehicle != originalValues.selectedVehicle){
                $(btnId).attr("disabled", false);
            }else{
                $(btnId).attr("disabled", true);
            }

            if(!v_type){
                $(btnId).attr("disabled", true);
            }else if(!selectedVehicle){
                $(btnId).attr("disabled", true);
            }else if(!total_distance){
                $(btnId).attr("disabled", true);
            }else if(!customer_name){
                $(btnId).attr("disabled", true);
            }else if(!phone){
                $(btnId).attr("disabled", true);
            }else{
                $(btnId).attr("disabled", false);
            }

        }else{
            let v_type = document.getElementById("v_type").value;
            let customer_name = document.getElementById("customer_name").value;
            let phone = document.getElementById("phone").value;
            let total_distance = document.getElementById("total_distance").value;
            let selectedVehicle = document.querySelector('input[name="cabSelection"]:checked')?.value;

            let btnId = "#newBookingBtn";
            if(!v_type){
                $(btnId).attr("disabled", true);
            }else if(!selectedVehicle){
                $(btnId).attr("disabled", true);
            }else if(!total_distance){
                $(btnId).attr("disabled", true);
            }else if(!customer_name){
                $(btnId).attr("disabled", true);
            }else if(!phone){
                $(btnId).attr("disabled", true);
            }else{
                $(btnId).attr("disabled", false);
            }

        }



    }

    function enablePaymentButtons(){
        let payNowAmount = document.getElementById("payNowAmount").value;

        let btnId1 = "#cardPaymentNextBtn";
        let btnId2 = "#cashPaymentSubmitBtn";

        if(!payNowAmount){
            $(btnId1).attr("disabled", true);
            $(btnId2).attr("disabled", true);
        }else{
            $(btnId1).attr("disabled", false);
            $(btnId2).attr("disabled", false);
        }
    }


</script>