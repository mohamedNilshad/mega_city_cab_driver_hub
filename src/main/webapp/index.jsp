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

            <!-- Sing in  Form -->
            <section class="sign-in">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure>
                                <img src=<%= ConstantImage.SIGNIN_IMAGE %> alt="sing up image">
                            </figure>
                            <a href="registration.jsp" class="signup-image-link">Create an
                                account</a>
                        </div>


                        <div class="signin-form">
                            <h2 class="form-title">Sign up</h2>
                            <form class="register-form" id="loginForm">
                                <input type="hidden" name="action" value="login" required>
                                <div class="form-group">
                                    <label for="username"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="username" placeholder="Your Name" />
                                    <span class="error_text" id="login_error_0"></span>
                                </div>
                                <div class="form-group">
                                    <label for="password"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" placeholder="Password" />
                                    <span class="error_text" id="login_error_1"></span>
                                </div>

                                <div class="form-group form-button">
                                    <button type="submit" class="form-submit" ><i class="fa fa-spinner fa-spin" id="btn_loading"></i>Log in</button>
                                </div>
                            </form>
                       
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <!-- JS -->
        <script src="vendor/jquery/jquery.min.js"></script>

        <jsp:include page="js/validations/validation.js" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
            $(document).ready(function() {
                $("#loginForm").submit(function(event) {
                    event.preventDefault();
                    $('#btn_loading').css('visibility', 'visible');
                    $(":submit").attr("disabled", true);

                     if(validLoginForm(new FormData(this))){
                        $(":submit").removeAttr("disabled");
                        $('#btn_loading').css('visibility', 'hidden');
                        return;
                     }

                    $.ajax({
                        type: "POST",
                        url: "user", // Servlet URL
                        data: $(this).serialize(), // Serialize form data
                        dataType: "json",
                        success: function(response) {
                            $('#btn_loading').css('visibility', 'hidden');
                            if (response.status === "success") {
                                if (response.userType == 1) {
                                    window.location.href = "views/admin/home.jsp?user=" + encodeURIComponent(response.userId);
                                } else if (response.userType == 2){
                                     window.location.href = "views/user/home.jsp?user=" + encodeURIComponent(response.userId);
                                } else if (response.userType == 0){
                                     window.location.href = "views/super_admin/home.jsp?user=" + encodeURIComponent(response.userId);
                                }
                            }else {
                                $('#error_message').css('display', 'block');
                                $('#error').html(response.message);
                            }

                        },
                        error: function(xhr) {
                                let responseText = xhr.responseText;
                                try {
                                    let errorResponse = JSON.parse(responseText);
                                    $("#error").html(errorResponse.message);
                                } catch (e) {
                                    $('#error').html("Unexpected error occurred");
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
        </script>
    </body>
</html>