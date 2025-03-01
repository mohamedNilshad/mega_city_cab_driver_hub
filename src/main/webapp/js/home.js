<script>

    document.addEventListener("DOMContentLoaded", function () {
        fetchBookings();
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
                   <td scope="row" colspan="13" style="text-align: center;">
                     <i class="fa fa-spinner fa-spin" id="data_loading" style="display:inline; font-size:32px;"></i>
                   </td>
                 </tr>`);
            },
            success: function(response) {
                let tbody = $("#bookingsTable tbody");
                tbody.empty();

                if (response.status === "success") {
                     if(response.data.length == 0){
                        tbody.append(`<tr><td colspan="13" style="text-align:center;">No Data</td></tr>`);
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

                              for(let i=0; i<payment.length; i++){
                                  if(payment[i].isPaid == 0){
                                      isPaid = "No";
                                      break;
                                  }
                              }

                              let newRow = `
                                  <tr>
                                      <td>${i}</td>
                                      <td style="vertical-align: middle;">${booking.bookingNumber}</td>
                                      <td style="vertical-align: middle;">${bookingType}</td>
                                      <td style="vertical-align: middle;">${booking.passengerName}</td>
                                      <td style="vertical-align: middle;">${booking.customer.nic}</td>
                                      <td style="vertical-align: middle;">${booking.vehicle.vehicleNumber}</td>
                                      <td style="vertical-align: middle;">${booking.fromDestination}</td>
                                      <td style="vertical-align: middle;">${booking.toDestination}</td>
                                      <td style="vertical-align: middle;">${booking.startDate}</td>
                                      <td style="vertical-align: middle;">${booking.endDate}</td>
                                      <td style="vertical-align: middle;">${booking.totalAmount}</td>
                                      <td style="vertical-align: middle;">${isPaid}</td>
                                      ${status}
                                      <td>
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

                let tbody = $("#bookingsTable tbody");
                tbody.empty();
                tbody.append(`<tr><td colspan="13" style="text-align:center;">No Data</td></tr>`);

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

            document.getElementById('booking_id').value = bid;
            document.getElementById('status').value = value;

            document.getElementById('statusLabel').innerHTML = "";
            document.getElementById('statusLabel').innerHTML = 'Confirm '+label;
            document.getElementById('subtitle').innerHTML = subtitle;
            let modal = new bootstrap.Modal(document.getElementById("confirmStatusChangeModel"));
            modal.show();
        }

</script>