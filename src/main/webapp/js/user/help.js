<script>
    //fetch helps
     $.ajax({
        type: "GET",
        url: "../../company",
        data: { action: "help_list" },
        dataType: "json",
        beforeSend: function() {
            document.getElementById("formOverlay").classList.remove("d-none");
        },
        success: function(response) {

            if (response.status === "success") {

                let helpList = document.getElementById("helpBody");
                helpList.innerHTML = "";

                let element = ``;

                response.data.forEach((help, index) => {
                    let isEven = (index%2) == 0;
                    if(!isEven){
                        element += `
                                <div class="m-2">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="image-text-container">
                                                <div>
                                                    <h2>${help.helpTitle}</h2>
                                                    <p>${help.helpDescription}</p>
                                                </div>
                                                <img src="${contextPath}${help.helpImage}" alt="Help Image">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          `;
                    }else{
                        element += `
                                <div class="m-2">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="image-text-container">
                                               <img src="${contextPath}${help.helpImage}" alt="Help Image">
                                                <div>
                                                    <h2>${help.helpTitle}</h2>
                                                    <p>${help.helpDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        `;

                    }

                    element += `<hr>`;


                });

                helpList.insertAdjacentHTML('beforeend', element);

            }else {
                tbody.append(`<tr><td colspan="5" style="text-align:center;">No Data</td></tr>`);
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
</script>