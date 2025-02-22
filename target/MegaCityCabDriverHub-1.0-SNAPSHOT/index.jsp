<%@ page import="com.drivehub.util.constant.ConstantImage" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="WEB-INF/includes/header.jsp" />
    </head>
    <body>

        <div class="main">

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
                         <form action="login" method="post">
                             <button type="submit">Print Data</button>
                         </form>
                            <h2 class="form-title">Sign up</h2>
                            <form method="post" action="" class="register-form"
                                  id="login-form">
                                <div class="form-group">
                                    <label for="username"><i
                                            class="zmdi zmdi-account material-icons-name"></i></label> <input
                                        type="text" name="username" id="username"
                                        placeholder="Your Name" />
                                </div>
                                <div class="form-group">
                                    <label for="password"><i class="zmdi zmdi-lock"></i></label> <input
                                        type="password" name="password" id="password"
                                        placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me"
                                           class="agree-term" /> <label for="remember-me"
                                           class="label-agree-term"><span><span></span></span>Remember
                                        me</label>
                                </div>
<!--                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin"
                                           class="form-submit" value="Log in" />
                                </div>-->
                                <div class="form-group form-button">
                                    <a href="views/user/home.jsp" class="form-submit">Log in</a>
                                </div>
                            </form>
                       
                        </div>
                    </div>
                </div>
            </section>

        </div>

        <!-- JS -->
        <script src="vendor/jquery/jquery.min.js"></script>
    </body>
</html>