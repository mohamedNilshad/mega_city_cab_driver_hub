<script>
    document.addEventListener("DOMContentLoaded", function () {
        fetchAllBookings();
    });

    function fetchAllBookings(){

        $.ajax({
            type: "GET",
            url: "../../booking",
            data: { action: "get_all_bookings"},
            dataType: "json",
            beforeSend: function() {
                let tbody = $("#bookingHistoryTable tbody");
                tbody.empty();

                tbody.append(`<tr>
                   <td scope="row" colspan="11" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#bookingHistoryTable tbody");
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
                                            <button type="button" class="icon-btn" onclick="openInvoiceModel(${booking.id})"><i class="zmdi zmdi-receipt"></i></button>
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

                let tbody = $("#bookingHistoryTable tbody");
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

    function openInvoiceModel(bookingId){

        let modal = new bootstrap.Modal(document.getElementById("invoiceModel"));
        modal.show();
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
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchAllBookings();
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


    function downloadInvoice(){
        const { jsPDF } = window.jspdf;

        let element = document.querySelector("#invoiceModel .modal-content"); // Select the invoice content

        html2canvas(element, { scale: 2 }).then(canvas => {
            let imgData = canvas.toDataURL("image/png");
            let pdf = new jsPDF("p", "mm", "a4");

            let imgWidth = 210; // A4 width in mm
            let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
            pdf.save("invoice.pdf");
        });

    }

    function generateInvoicePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("Invoice", 14, 20);

        // Company Info
        doc.setFontSize(12);
        doc.text("Webz Poland", 14, 30);
        doc.text("Madalinskiego 8, 71-101 Szczecin, Poland", 14, 35);
        doc.text("Email: info@webz.com.pl | Phone: +48 444 666 3333", 14, 40);

        // Customer Info
        doc.text("To: Bob Mart", 140, 30);
        doc.text("Attn: Daniel Marek", 140, 35);
        doc.text("43-190 Mikolow, Poland", 140, 40);
        doc.text("Email: marek@daniel.com | Phone: +48 123 456 789", 140, 45);

        // Table Data
        const tableColumn = ["#", "Ref. No", "Payment Type", "Date", "Amount (LKR)"];
        const tableRows = [
            [1, "11111", "Cash", "2025-03-03 21:35:54", "20,000.00"],
            [2, "556125", "Card", "2025-03-02 21:35:54", "10,000.00"],
            [3, "556125", "Card", "2025-03-02 21:35:54", "5,000.00"]
        ];

        // AutoTable for structured tables
        doc.autoTable({
            startY: 50,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",
            styles: { fontSize: 10 }
        });

        // Totals
        doc.text("Total Amount To Pay: 35,000.00 LKR", 120, doc.autoTable.previous.finalY + 10);
        doc.text("Paid Amount: 35,000.00 LKR", 120, doc.autoTable.previous.finalY + 15);
        doc.text("Balance Amount: 00.00 LKR", 120, doc.autoTable.previous.finalY + 20);
        doc.text("Return Amount: 00.00 LKR", 120, doc.autoTable.previous.finalY + 25);

        // Save PDF
        doc.save("invoice.pdf");
    }


</script>