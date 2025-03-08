<script>
    document.addEventListener("DOMContentLoaded", function () {
        fetchAllBookings();
        fetchVehicleType();
        fetchCompanyProfile();
    });

    function fetchAllBookings(value = ""){
        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_all_bookings", keyword: value},
            dataType: "json",
            beforeSend: function() {
                buildLoadingTable('bookingHistoryTable',11);
            },
            success: function(response) {
                let tbody = $("#bookingHistoryTable tbody");
                tbody.empty();

                if (response.status === "success") {
                     if(response.data.length == 0){
                        buildEmptyTable('bookingHistoryTable',11);
                     }else{
                        buildHistoryDataTable('bookingHistoryTable',response.data);
                     }
                }else {
                    buildEmptyTable('bookingHistoryTable',11);

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

                buildEmptyTable('bookingHistoryTable',11);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

        });
    }

    function fetchVehicleType(){
            $.ajax({
                type: "GET",
                url: "../../vehicle",
                data: { action: "vehicle_types" },
                dataType: "json",

                success: function(response) {
                    if (response.status === "success") {
                        vehicleTypes = response.data;
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


    //------------------------------CF AMOUNT---------------------->
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
                    fetchAllBookings();
                    fetchInvoiceData(bookingId, true);

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
                    if(document.getElementById("status").value == 1){
                        calculateFinalAmount(document.getElementById("booking_id").value);
                    }else{
                        fetchAllBookings();
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

    //------------------------------CF AMOUNT---------------------->

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
                    fetchAllBookings();
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
                    fetchAllBookings();
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

    function fetchInvoiceData(bId, addTime = false){

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

                          openInvoiceModel(invoiceData, addTime);
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

    function openInvoiceModel(invoiceData, addTime = false){
        document.getElementById("formOverlay").classList.remove("d-none");
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


        //-->
        let startMeterReading = invoiceData.startMeterReading == 0 ? ' - ' : invoiceData.startMeterReading;
        let endMeterReading = invoiceData.endMeterReading == 0 ? ' - ' : invoiceData.endMeterReading;

        document.getElementById("iStartMeterReading").innerHTML = startMeterReading;
        document.getElementById("iEndMeterReading").innerHTML = endMeterReading;

        let fromDate = invoiceData.status == 1 ? invoiceData.finalStartDate : invoiceData.startDate;
        let toDate = invoiceData.status == 1 ? invoiceData.finalEndDate : invoiceData.endDate;

        let def = calculateDaysAndHour(fromDate, toDate);
        let days = def.days == 0 ? 1 : def.days;
        if(days != 0 && def.hours > 2) days +=1;

        document.getElementById("iTotalDays").innerHTML = invoiceData.status == 2 ? ' - ' : " "+days;

        let totDistance = invoiceData.status == 2 ? ' - ' : (endMeterReading - startMeterReading);
        totDistance = invoiceData.status == 0 ? invoiceData.totalRequestedDistance : totDistance;

        document.getElementById("iTotalDistance").innerHTML = totDistance;
        //-->

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

        if(addTime){
            setTimeout(() => {
                let modal = new bootstrap.Modal(document.getElementById("invoiceModel"));
                modal.show();
            }, 1000);
        }else{
            let modal = new bootstrap.Modal(document.getElementById("invoiceModel"));
            modal.show();
        }
        document.getElementById("formOverlay").classList.add("d-none");
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
    //------------------------------------INVOICE----------->


    function calculateDaysAndHour(fromDate, toDate) {
        const date1 = new Date(fromDate);
        const date2 = new Date(toDate);

        const diffInMs = date2 - date1;

        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { days: diffInDays, hours: diffInHours };
    }

    function enablePaymentButtons(){
            let payNowAmount = document.getElementById("balanceAmount").value;

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

    //------------------------------------TABLE----------->
    function buildLoadingTable(id, column){
        let tableId = `#${id} tbody`;
        let tbody = $(tableId);

        tbody.empty();

        tbody.append(`<tr>
           <td scope="row" colspan="${column}" style="text-align: center;">
             <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
           </td>
         </tr>`);
    }

    function buildEmptyTable(id, column){
        let tableId = `#${id} tbody`;
        let tbody = $(tableId);

        tbody.empty();
        tbody.append(`<tr><td colspan='${column}' style="text-align:center;">No Data</td></tr>`);

    }

    function buildHistoryDataTable(id, data){
        let tableId = `#${id} tbody`;
        let tbody = $(tableId);
        tbody.empty();

        let i = 0;
        let currentDate = new Date();
        currentDate = currentDate.toISOString().split('T')[0];
        data.forEach((booking) => {

          i = i+1;
          let bookingType = booking.bookingType == 1 ? "Schedule Booking" : "Instant Booking";

          let status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;

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
              isPaid = "No";
              let tempBalAmount = booking.totalAmount - tempTotalProAmount;
              payBtn = `<button type="button" class="icon-btn" onclick='openCustomPaymentFormModel(${jsonBooking},${tempBalAmount})' style="color: green;">
                                <i class="fas fa-hand-holding-usd"></i>
                        </button>`;
           }




          if(booking.status == 0){
            status = `<td class="status status-scheduled" style="vertical-align: middle;">
                ${booking.startDate}<br>
                ${cancelBtn} ${startBtn}
            </td>`;

          }else if(booking.status == 1){
            status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
          }else if(booking.status == 2){
            payBtn = ``;
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
                        <button type="button" class="icon-btn" onclick="fetchInvoiceData(${booking.id})"><i class="zmdi zmdi-receipt"></i></button>
                        ${payBtn}
                  </td>
              </tr>
          `;
          tbody.append(newRow);
        });

    }

    //------------------------------------TABLE----------->



</script>