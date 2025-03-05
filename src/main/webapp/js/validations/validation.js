<script>
    //Login
    function validLoginForm(formData){
        const fields = Array.from(formData.keys());
        fields.shift();

        let error = 0;
        error += validateEmptyCheck("login", fields, formData);

        return (error>0);
    }

    //Registration
    function validRegistrationForm(formData){
        const fields = Array.from(formData.keys());
        fields.shift();

        let error = 0;

        //empty check
        error += validateEmptyCheck("reg", fields, formData);

        //email validation
        if(formData.get("email")){
             if(!validateEmail(formData.get("email"))){
                error++;
                document.getElementById("reg_error_1").innerHTML = "Please enter a valid Email";
             }
        }

        //nic validation
        if(formData.get("nic")){
             if(!isValidNIC(formData.get("nic"))){
                error++;
                document.getElementById("reg_error_3").innerHTML = "Please enter a valid NIC";
             }
        }

        //phone validation
        if(formData.get("phone")){
             if(!isValidPhoneNumber(formData.get("phone"))){
                error++;
                document.getElementById("reg_error_4").innerHTML = "Please enter a valid Phone Number";
             }
        }

        //username validation
        if(formData.get("uname")){
             if(!isValidUsername(formData.get("uname"))){
                error++;
                document.getElementById("reg_error_5").innerHTML = "Please enter a valid Username";
             }else{
                 validateUserName(formData.get("uname"), function(result) {
                     if (!result) {
                        error++;
                        document.getElementById("reg_error_5").innerHTML = "This username is already taken";
                     }
                 });
             }
        }

        //password validation
        if(formData.get("pass")){
             if(!isValidPassword(formData.get("pass"))){
                error++;
                document.getElementById("reg_error_6").innerHTML = "Password must contain at least 4 digits";
             }
        }

        //confirm password validation
        if(formData.get("re_pass")){
             if(isValidConfirmPassword(formData.get("pass"),formData.get("re_pass"))){
                error++;
                document.getElementById("reg_error_7").innerHTML = "Passwords do not match";
             }
        }

        return (error>0);
    }

    //Profile
    function validProfileForm(formData, errorId){
        const allFields = Array.from(formData.keys());
        let remove = [0, 1, 3, 7];
        let fields = allFields.filter((item, index) => !remove.includes(index));

        let error = 0;


        //empty check
        error += validateEmptyCheck(errorId, fields, formData, 4);


        //email validation
        if(formData.get("email")){
             if(!validateEmail(formData.get("email"))){
                error++;
                document.getElementById(`${errorId}_error_1`).innerHTML = "Please enter a valid Email";
             }
        }

        //phone validation
        if(formData.get("phone")){
             if(!isValidPhoneNumber(formData.get("phone"))){
                error++;
                document.getElementById(`${errorId}_error_2`).innerHTML = "Please enter a valid Phone Number";
             }
        }

        //password validation
        if(formData.get("new_password")){
             if(!isValidPassword(formData.get("new_password"))){
                error++;
                document.getElementById(`${errorId}_error_4`).innerHTML = "Password must contain at least 4 digits";
             }
        }

        return (error>0);
    }

    //Profile confirm password
    function validProfileConfirmPasswordForm(value){
        let error = 0;

        document.getElementById('profile_confirm_pass_error').innerHTML = "";
        //empty check
        if (value == "") {
            error++;
            document.getElementById('profile_confirm_pass_error').innerHTML = "This Field is Required";
        }

        return (error>0);
    }

    //New Driver
    function validNewDriverForm(formData){
        const fields = Array.from(formData.keys());
        fields.shift();

        let error = 0;

        //empty check
        error += validateEmptyCheck("admin_new_driver", fields, formData);

        //nic validation
        if(formData.get("driver_nic")){
             if(!isValidNIC(formData.get("driver_nic"))){
                error++;
                document.getElementById("admin_new_driver_error_1").innerHTML = "Please enter a valid NIC";
             }
        }

        //phone validation
        if(formData.get("phone")){
             if(!isValidPhoneNumber(formData.get("phone"))){
                error++;
                document.getElementById("admin_new_driver_error_2").innerHTML = "Please enter a valid Phone Number";
             }
        }

        //email validation
        if(formData.get("email")){
             if(!validateEmail(formData.get("email"))){
                error++;
                document.getElementById("admin_new_driver_error_3").innerHTML = "Please enter a valid Email";
             }
        }

        return (error>0);
    }

    //update Driver
    function validUpdateDriverForm(formData){
        const allFields = Array.from(formData.keys());

        let remove = [0, 1, 2];
        let fields = allFields.filter((item, index) => !remove.includes(index));

        let error = 0;

        //empty check
        error += validateEmptyCheck("admin_update_driver", fields, formData);

        //nic validation
        if(formData.get("update_driver_nic")){
             if(!isValidNIC(formData.get("update_driver_nic"))){
                error++;
                document.getElementById("admin_update_driver_error_1").innerHTML = "Please enter a valid NIC";
             }
        }

        //phone validation
        if(formData.get("update_phone")){
             if(!isValidPhoneNumber(formData.get("update_phone"))){
                error++;
                document.getElementById("admin_update_driver_error_2").innerHTML = "Please enter a valid Phone Number";
             }
        }

        //email validation
        if(formData.get("update_email")){
             if(!validateEmail(formData.get("update_email"))){
                error++;
                document.getElementById("admin_update_driver_error_3").innerHTML = "Please enter a valid Email";
             }
        }

        return (error>0);
    }

    //New Vehicle
    function validNewVehicleForm(formData){
        const allFields = Array.from(formData.keys());
        const image = allFields[5];
        let remove = [0, 5];
        let fields = allFields.filter((item, index) => !remove.includes(index));

        let error = 0;
        let errorPreId = "admin_new_vehicle";

        //empty check
        error += validateEmptyCheck(errorPreId, fields, formData);
        let file = formData.get(image);

        document.getElementById(`${errorPreId}_error_6`).innerHTML = "";

        if (!file || file.size === 0) {
            error++;
            document.getElementById(`${errorPreId}_error_6`).innerHTML = "This Field is Required";
        }
        if (file.size > 5000000) {
            error++;
            document.getElementById(`${errorPreId}_error_6`).innerHTML = "Image Should be less then 5 Mb";
        }

        return (error>0);
    }

    //Update Vehicle
    function validUpdateVehicleForm(formData){
        const allFields = Array.from(formData.keys());
        const image = allFields[8];
        let remove = [0, 1, 2, 3, 8];

        let fields = allFields.filter((item, index) => !remove.includes(index));

        let error = 0;
        let errorPreId = "admin_update_vehicle";

        //empty check
        error += validateEmptyCheck(errorPreId, fields, formData);
        let file = formData.get(image);

        document.getElementById(`${errorPreId}_error_6`).innerHTML = "";

        if (file.size > 5000000) {
            error++;
            document.getElementById(`${errorPreId}_error_6`).innerHTML = "Image Should be less then 5 Mb";
        }
        return (error>0);
    }

    //New Customer
    function validNewCustomerForm(formData){
        const fields = Array.from(formData.keys());
        fields.shift();


        let error = 0;
        let errorPreId = "admin_new_customer";

        //empty check
        error += validateEmptyCheck(errorPreId, fields, formData);

        //email validation
        if(formData.get("new_email")){
             if(!validateEmail(formData.get("new_email"))){
                error++;
                document.getElementById(`${errorPreId}_error_4`).innerHTML = "Please enter a valid Email";
             }
        }

        //nic validation
        if(formData.get("new_customer_nic")){
             if(!isValidNIC(formData.get("new_customer_nic"))){
                error++;
                document.getElementById(`${errorPreId}_error_1`).innerHTML = "Please enter a valid NIC";
             }
        }

        //phone validation
        if(formData.get("new_phone")){
             if(!isValidPhoneNumber(formData.get("new_phone"))){
                error++;
                document.getElementById(`${errorPreId}_error_2`).innerHTML = "Please enter a valid Phone Number";
             }
        }

        //username validation
        if(formData.get("username")){
             if(!isValidUsername(formData.get("username"))){
                error++;
                document.getElementById(`${errorPreId}_error_5`).innerHTML = "Please enter a valid Username";
             }else{
                 validateUserName(formData.get("username"), function(result) {
                     if (!result) {
                        error++;
                        document.getElementById(`${errorPreId}_error_5`).innerHTML = "This username is already taken";
                     }
                 }, true);
             }
        }

        //password validation
        if(formData.get("password")){
             if(!isValidPassword(formData.get("password"))){
                error++;
                document.getElementById(`${errorPreId}_error_6`).innerHTML = "Password must contain at least 4 digits";
             }
        }

        return (error>0);
    }

   //Update Customer
    function validUpdateCustomerForm(formData){
        const allFields = Array.from(formData.keys());
        let remove = [0, 1, 5, 7, 8];
        let password = formData.get("update_password");
        let fields = allFields.filter((item, index) => !remove.includes(index));

        let error = 0;
        let errorPreId = "admin_update_customer";

        //empty check
        error += validateEmptyCheck(errorPreId, fields, formData);

        //email validation
        if(formData.get("update_email")){
             if(!validateEmail(formData.get("update_email"))){
                error++;
                document.getElementById(`${errorPreId}_error_4`).innerHTML = "Please enter a valid Email";
             }
        }

        //nic validation
        if(formData.get("update_customer_nic")){
             if(!isValidNIC(formData.get("update_customer_nic"))){
                error++;
                document.getElementById(`${errorPreId}_error_1`).innerHTML = "Please enter a valid NIC";
             }
        }

        //phone validation
        if(formData.get("update_phone")){
             if(!isValidPhoneNumber(formData.get("update_phone"))){
                error++;
                document.getElementById(`${errorPreId}_error_2`).innerHTML = "Please enter a valid Phone Number";
             }
        }

        //password validation
        if(password){
             if(!isValidPassword(password)){
                error++;
                document.getElementById(`${errorPreId}_error_5`).innerHTML = "Password must contain at least 4 digits";
             }
        }

        return (error>0);
    }

    //New Bookings
    function validNewBookingForm(formData){

        let error = 0;

        document.getElementById(`admin_new_booking_error_5`).innerHTML = "";
        //phone validation
        if(formData.get("phone")){
             if(!isValidPhoneNumber(formData.get("phone"))){
                error++;
                document.getElementById(`admin_new_booking_error_5`).innerHTML = "Please enter a valid Phone Number";
             }
        }
        return (error>0);
    }

    //Update Bookings
    function validUpdateBookingForm(formData){

        let error = 0;

        document.getElementById(`admin_new_booking_error_5`).innerHTML = "";
        //phone validation
        if(formData.get("update_phone")){
             if(!isValidPhoneNumber(formData.get("update_phone"))){
                error++;
                document.getElementById(`admin_new_booking_error_5`).innerHTML = "Please enter a valid Phone Number";
             }
        }
        return (error>0);
    }

    //Payment Choose
    function validPaymentChooseForm(formData){

        let error = 0;

        document.getElementById(`pay_now_amount_error`).innerHTML = "";
        //phone validation
        if(!formData.get("payNowAmount")){
            error++;
            document.getElementById(`pay_now_amount_error`).innerHTML =  "This Field is Required";
        }
        return (error>0);
    }



    //----------------------------------VALIDATIONS---------------------------->
    //email validation
    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    //nic validation
    function isValidNIC(nic) {
        const nic12DigitPattern = /^\d{12}$/;
        const nic10DigitPattern = /^\d{9}[Vv]$/;

        return nic12DigitPattern.test(nic) || nic10DigitPattern.test(nic);
    }

    //phone number validation
    function isValidPhoneNumber(phone) {
        const phonePattern = /^(\+?\d{1,3})?\d{10,15}$/;
        return phonePattern.test(phone);
    }

    //password validation
    function isValidPassword(password) {
        const passwordPattern = /^\d{4,}$/;
        return (passwordPattern.test(password));
    }

    //confirm password validation
    function isValidConfirmPassword(password, confirmPassword) {

        return (password !== confirmPassword);
    }

    //empty value check
    function validateEmptyCheck(preId, fields, formData, except = -1){
        let emptyErrorMessage = "This Field is Required";
        let error = 0;
        let errorId = `${preId}_error_`;

        fields.forEach((field, i) => document.getElementById(`${errorId}${i}`).innerHTML = "");
        fields.forEach((field, index) => {
            if(except != -1){
                if ((index != except) && (!formData.get(field))) {
                    error++;
                    document.getElementById(`${errorId}${index}`).innerHTML = emptyErrorMessage;
                }
            }else{
                if (!formData.get(field)) {
                    error++;
                    document.getElementById(`${errorId}${index}`).innerHTML = emptyErrorMessage;
                }
            }
        });

        return error;
    }

    //username validate
    function isValidUsername(username) {
        const usernamePattern = /^[a-zA-Z0-9_]+$/;
        return (usernamePattern.test(username));
    }

    //username db validation
    function validateUserName(u_name, callback, isAdmin = false){

        $.ajax({
            type: "GET",
            url: isAdmin ? "../../user" : "user",
            data: { action: "validate_username", username: u_name},
            dataType: "json",
            beforeSend: function() {
                $('#check_username').css('visibility', 'visible');
            },
            success: function(response) {
                if (response.status === "success") {
                     callback(response.data);
                }else {
                    $("#success_alert").hide();
                        $('#error_alert').html(response.message);
                        $("#error_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#error_alert").slideUp(500);
                    });
                    callback(false);
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
                callback(false);
            },
            complete: function(){
                $('#check_username').css('visibility', 'hidden');
            }
        });
    }

    //----------------------------------VALIDATIONS---------------------------->
</script>