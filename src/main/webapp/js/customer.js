<script>
    fetchCustomers();

    function fetchCustomers(value = ""){
        $.ajax({
            type: "GET",
            url: "../../customer",
            data: { action: "customer_list", user_type: 2, keyword: value},
            dataType: "json",
            beforeSend: function() {
                buildLoadingTable('customersTable', 9);
            },
            success: function(response) {

                if (response.status === "success") {

                    if(response.data.length == 0){
                        buildEmptyTable('customersTable', 9);
                    }else{
                        buildCustomerDataTable('customersTable', response.data);
                    }
                }else {
                    buildEmptyTable('customersTable', 9);
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

                    buildEmptyTable('customersTable', 9);

                    $("#success_alert").hide();
                        $('#error_alert').html(errorMsg);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
            },

        });
    }

    function openEditModal(customer){
        $("#updateCustomerBtn").attr("disabled", true);
         setOldValues(customer);
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
        $('#uc_btn_loading').css('display', 'inline');
        $(":submit").attr("disabled", true);

        if(validUpdateCustomerForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            $('#uc_btn_loading').css('display', 'none');
            return;
        }

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

    //add new customer
    $("#newCustomerForm").submit(function(event) {
        event.preventDefault();
        $('#submit_loading').css('visibility', 'visible');
        $(":submit").attr("disabled", true);

        if(validNewCustomerForm(new FormData(this))){
            $(":submit").attr("disabled", false);
            $('#submit_loading').css('visibility', 'hidden');
            return;
        }

        $.ajax({
            type: "POST",
            url: "../../customer",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchCustomers();
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
                $('#submit_loading').css('visibility', 'hidden');
                window.scrollTo(0,0);
            }
        });
    });

    function emptyFields(){
         document.getElementById('new_customer_name').value = '';
         document.getElementById('new_customer_nic').value = '';
         document.getElementById('new_phone').value = '';
         document.getElementById('new_address').value = '';
         document.getElementById('new_email').value = '';
         document.getElementById('username').value = '';
         document.getElementById('password').value = '';
    }


    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->
    let originalValues;

    function setOldValues(customer){
        originalValues = {
            name: customer.name,
            nic: customer.nic,
            phone: customer.phone,
            email: customer.email,
            address: customer.address
        };
    }

    function enableSubmitButton(){
        let name = document.getElementById("update_customer_name").value;
        let nic = document.getElementById("update_customer_nic").value;
        let phone = document.getElementById("update_phone").value;
        let email = document.getElementById("update_email").value;
        let address = document.getElementById("update_address").value;
        let password = document.getElementById("update_password").value;

        let btnId = "#updateCustomerBtn";

        if(name != originalValues.name){
            $(btnId).attr("disabled", false);
        }else if(email != originalValues.email){
            $(btnId).attr("disabled", false);
        }else if(phone != originalValues.phone){
            $(btnId).attr("disabled", false);
        }else if(address != originalValues.address){
            $(btnId).attr("disabled", false);
        }else if(nic != originalValues.nic){
            $(btnId).attr("disabled", false);
        }else if(password != ""){
            $(btnId).attr("disabled", false);
        }else{
            $(btnId).attr("disabled", true);
        }
    }
    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->



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

    function buildCustomerDataTable(id, data){
        let tableId = `#${id} tbody`;
        let tbody = $(tableId);
        tbody.empty();

        let i = 0;

        data.forEach((customer) => {
            i = i+1;
            let jsonCustomer = JSON.stringify(customer);

            let newRow = `
                <tr>
                    <td>${i}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.nic}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.userName}</td>
                    <td><button type="button" class="icon-btn" onclick='openEditModal(${jsonCustomer})'><i class="zmdi zmdi-edit"></i></button></td>
                    <td><a href="booking.jsp?cid=${customer.id}" class="btn btn-warning" >Book</a></td>
                </tr>
            `;
            tbody.append(newRow);
        });

    }

    //------------------------------------TABLE----------->
</script>