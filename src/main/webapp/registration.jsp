<%@ page import="com.drivehub.util.constant.ConstantImage" %>
<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    if (sessionObj != null) {
        Object userIdObj = sessionObj.getAttribute("userId");
        Object adminIdObj = sessionObj.getAttribute("adminId");
        Object superAdminIdObj = sessionObj.getAttribute("superAdminId");

        Integer userId = (userIdObj instanceof Integer) ? (Integer) userIdObj : null;
        Integer adminId = (adminIdObj instanceof Integer) ? (Integer) adminIdObj : null;
        Integer superAdminId = (superAdminIdObj instanceof Integer) ? (Integer) superAdminIdObj : null;

        if (superAdminId != null) {
            response.sendRedirect("views/superAdmin/home.jsp?user=" + superAdminId);
            return;
        } else if (adminId != null) {
            response.sendRedirect("views/admin/home.jsp?user=" + adminId);
            return;
        } else if (userId != null) {
            response.sendRedirect("views/user/home.jsp?user=" + userId);
            return;
        }
    }
%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="WEB-INF/includes/header.jsp" />
        <style>
            .error_text{
                color: red;
                font-size: 10px;
            }
        </style>
    </head>
    <body>

        <div class="main">
        <div class="alert" id="error_message" style="display: none; color:white; width:50%; margin: auto; margin-bottom:5px;">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          <div id="error"></div>
        </div>

        <div class="success" id="success_message" style="display: none; color:white; width:50%; margin: auto; margin-bottom:5px;">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
             <div id="success"></div>
         </div>
            <!-- Sign up form -->
            <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Sign up</h2>

                            <form class="register-form" id="registerForm">
                                <input type="hidden" name="action" value="register">
                                <div class="form-group">
                                    <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                    <span class="error_text" id="reg_error_0"></span>
                                </div>
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email" />
                                    <span class="error_text" id="reg_error_1"></span>
                                </div>
                                <div class="form-group">
                                    <label for="address"><i class="zmdi zmdi-home"></i></label>
                                    <input type="text" name="address" id="address" placeholder="Your Address" />
                                    <span class="error_text" id="reg_error_2"></span>
                                </div>
                                <div class="form-group">
                                    <label for="NIC"><i class="zmdi zmdi-account-box-mail"></i></label>
                                    <input type="text" name="nic" id="nic" placeholder="Your NIC" />
                                    <span class="error_text" id="reg_error_3"></span>
                                </div>
                                <div class="form-group">
                                    <label for="phone"><i class="zmdi zmdi-phone"></i></label>
                                    <input type="text" name="phone" id="phone" placeholder="Your Phone Number" />
                                    <span class="error_text" id="reg_error_4"></span>
                                </div>
                                <div class="form-group">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <label for="uname"><i class="zmdi zmdi-account-circle"></i></label>
                                        <input type="text" name="uname" id="uname" placeholder="Username for login" />
                                        <i class="fa fa-refresh fa-spin" id="check_username" style="color: blue;"></i>
                                    </div>

                                    <span class="error_text" id="reg_error_5"></span>
                                </div>


                                <div class="form-group">
                                    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" placeholder="Password" />
                                    <span class="error_text" id="reg_error_6"></span>
                                </div>
                                <div class="form-group">
                                    <label for="re_pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                    <span class="error_text" id="reg_error_7"></span>
                                </div>

                                <div class="form-group form-button">
                                    <button type="submit" class="form-submit" ><i class="fa fa-spinner fa-spin" id="btn_loading"></i>Register</button>
                                </div>
                            </form>
                        </div>
                        <div class="signup-image">
                            <figure>
                                <img src=<%= ConstantImage.SIGNUP_IMAGE %> alt="sing up image">
                            </figure>
                            <a href="index.jsp" class="signup-image-link">I am already
                                member</a>
                        </div>
                    </div>
                </div>
            </section>


        </div>
        <!-- JS -->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="js/main.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <jsp:include page="js/validations/validation.js" />
        <script>
            $(document).ready(function() {
                $("#registerForm").submit(function(event) {
                    event.preventDefault();
                    $('#btn_loading').css('visibility', 'visible');
                    $(":submit").attr("disabled", true);

                     if(validRegistrationForm(new FormData(this))){
                        $(":submit").removeAttr("disabled");
                        $('#btn_loading').css('visibility', 'hidden');
                        return;
                     }

                    $.ajax({
                        type: "POST",
                        url: "user",
                        data: $(this).serialize(),
                        dataType: "json",
                        success: function(response) {
                            if (response.status === "success") {
                                $('#success_message').css('display', 'block');
                                $("#success").html(response.message);
                                emptyFields();
                            }else {
                                $('#error_message').css('display', 'block');
                                $("#error").html(response.message);
                            }

                        },
                        error: function(xhr) {
                            // Try to parse JSON error message
                            let responseText = xhr.responseText;
                            try {
                                let errorResponse = JSON.parse(responseText);
                                $("#error").html(errorResponse.message);
                            } catch (e) {
                                $("#error").html("Unexpected error occurred");
                            }
                            $('#error_message').css('display', 'block');
                        },
                        complete: function(){
                            $(":submit").removeAttr("disabled");
                            $('#btn_loading').css('visibility', 'hidden');
                            window.scrollTo(0,0);
                        }
                    });
                });
            });

            function emptyFields(){
                 document.getElementById('name').value = '';
                 document.getElementById('email').value = '';
                 document.getElementById('address').value = '';
                 document.getElementById('nic').value = '';
                 document.getElementById('phone').value = '';
                 document.getElementById('uname').value = '';
                 document.getElementById('pass').value = '';
                 document.getElementById('re_pass').value = '';
            }

        </script>
    </body>
</html>