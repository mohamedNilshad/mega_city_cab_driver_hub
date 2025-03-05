<script>
    document.addEventListener("DOMContentLoaded", function () {
        fetchProfile();
        $("#saveProfile").attr("disabled", true);
    });

    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->
    let originalValues;

    function setOldValues(profile){
        originalValues = {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            address: profile.address
        };
    }

    function enableSubmitButton(){
        let name = document.getElementById("admin_name").value;
        let email = document.getElementById("admin_email").value;
        let phone = document.getElementById("admin_phone").value;
        let address = document.getElementById("admin_address").value;
        let password = document.getElementById("admin_new_password").value;

        if(name != originalValues.name){
            $("#saveProfile").attr("disabled", false);
        }else if(email != originalValues.email){
            $("#saveProfile").attr("disabled", false);
        }else if(phone != originalValues.phone){
            $("#saveProfile").attr("disabled", false);
        }else if(address != originalValues.address){
            $("#saveProfile").attr("disabled", false);
        }else if(password != ""){
            $("#saveProfile").attr("disabled", false);
        }else{
            $("#saveProfile").attr("disabled", true);
        }


    }
    //---------------------VALIDATE SUBMIT BUTTON----------------------------------->


    function fetchProfile(){
       $.ajax({
           type: "GET",
           url: "../../user",
           data: { action: "profile_info", userId: userId},
           dataType: "json",
           beforeSend: function() {
                document.getElementById("formOverlay").classList.remove("d-none");
           },
           success: function(response) {
               if (response.status === "success") {
                   setProfileValue(response.data);
                   setOldValues(response.data);
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

    function setProfileValue(profile) {
        document.getElementById("userId").value = profile.id;
        document.getElementById("admin_name").value = profile.name;
        document.getElementById("admin_nic").value = profile.nic;
        document.getElementById("admin_email").value = profile.email;
        document.getElementById("admin_phone").value = profile.phone;
        document.getElementById("admin_address").value = profile.address;
        document.getElementById("admin_username").value = profile.userName;
    }

    function openPasswordModel(adminId){
        let formData = new FormData(document.getElementById("updateProfile"));
        if(validProfileForm(formData,adminId)) return;
        document.getElementById('profile_confirm_pass_error').innerHTML = "";

        document.getElementById("u_id").value = userId;

        let modal = new bootstrap.Modal(document.getElementById("confirmPasswordModel"));
        modal.show();
    }

    //confirm password
    $("#confirmPasswordForm").submit(function(event) {
        event.preventDefault();
        if(validProfileConfirmPasswordForm(document.getElementById("confirm_password").value)) return;

        $.ajax({
            type: "POST",
            url: "../../user",
            data:  $(this).serialize(),
            dataType: "json",
            beforeSend: function() {
                $('#cp_btn_loading').css('display', 'inline');
                $(":submit").attr("disabled", true);
            },
            success: function(response) {
                if (response.status === "success") {
                    submitProfileForm();
                    document.getElementById("confirm_password").value = "";
                    $("#confirmPasswordModel").modal("hide");
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
                $('#cp_btn_loading').css('display', 'none');
            }
        });
    });

    function submitProfileForm(){
        let formData = new FormData(document.getElementById("updateProfile"));

        let data = {};
        formData.forEach((value, key) => { data[key] = value; });

        $.ajax({
            type: "POST",
            url: "../../user",
            data: data,
            dataType: "json",
            beforeSend: function() {
                document.getElementById("formOverlay").classList.remove("d-none");
            },
            success: function(response) {
                if (response.status === "success") {
                    $("#success_alert").hide();
                        $('#success_alert').html(response.message);
                        $("#success_alert").fadeTo(2000, 500).slideUp(500, function() {
                        $("#success_alert").slideUp(500);
                    });
                    fetchProfile();
                    document.getElementById("admin_new_password").value = "";
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
                document.getElementById("formOverlay").classList.add("d-none");
            }
        });
    }

</script>