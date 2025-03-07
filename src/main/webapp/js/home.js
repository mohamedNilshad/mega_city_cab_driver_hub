<script>

    document.addEventListener("DOMContentLoaded", function () {
        fetchBookings();
        fetchCompanyProfile();
    });

    //db
    function fetchBookings(){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_all_scheduled_bookings"},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#bookingsTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="11" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#bookingsTable tbody");
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

                              let jsonVehicle = JSON.stringify(booking);
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


                              if(booking.status == 0){
                                status = `<td class="status status-scheduled" style="vertical-align: middle;">
                                    ${booking.startDate}<br>
                                    ${cancelBtn} ${startBtn}
                                </td>`;

                                editButton = `<button type="button" class="icon-btn" onclick='openEditModal(${jsonVehicle})'><i class="zmdi zmdi-edit"></i></button>`;

                              }else if(booking.status == 1){
                                status = `<td class="status status-completed" style="vertical-align: middle;">Completed</td>`;
                              }else if(booking.status == 2){
                                status = `<td class="status status-canceled" style="vertical-align: middle;">Canceled</td>`;
                              }else if(booking.status == 3){
                                status = `<td class="status status-ongoing" style="vertical-align: middle;">
                                    On Going${completedBtn}
                                </td>`;
                              }

                               let payment = booking.paymentInfoList;
                               let isPaid = "Yes";

                               let tempTotalProAmount = 0.0;
                               for(let i=0; i<payment.length; i++){
                                   tempTotalProAmount += payment[i].providedAmount;
                               }

                               if(tempTotalProAmount < booking.totalAmount){
                                   isPaid = "No";
                               }

                              let newRow = `
                                  <tr>
                                      <td style="vertical-align: middle;">${i}</td>
                                      <td style="vertical-align: middle;">${booking.bookingNumber}</td>
                                      <td style="vertical-align: middle;">${bookingType}</td>
                                      <td style="vertical-align: middle;">${booking.passengerName}</td>
                                      <td style="vertical-align: middle;">${booking.customer.nic}</td>
                                      <td style="vertical-align: middle;">${booking.vehicle.vehicleNumber}</td>
                                      <td style="vertical-align: middle;">${booking.startDate}</td>
                                      <td style="vertical-align: middle;">${booking.endDate}</td>
                                      <td style="vertical-align: middle;">${booking.totalAmount}</td>
                                      <td style="vertical-align: middle;">${isPaid}</td>
                                      ${status}
                                      <td style="vertical-align: middle;">
                                           <button type="button" class="icon-btn" onclick='fetchInvoiceData(${booking.id})'><i class="zmdi zmdi-receipt"></i></button>
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

                let tbody = $("#bookingsTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="11" style="text-align:center;">No Data</td></tr>`);

                $("#success_alert").hide();
                    $('#error_alert').html(errorMsg);
                    $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error_alert").slideUp(500);
                });
            },

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
                    fetchBookings();
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

    //form
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
            beforeSend: function() {
                console.log("Loading");
            },
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
        console.log(invoiceData);

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
        document.getElementById("iStartDate").innerHTML = invoiceData.startDate;
        document.getElementById("iEndDate").innerHTML = invoiceData.endDate;
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
    //------------------------------------INVOICE----------->

</script>