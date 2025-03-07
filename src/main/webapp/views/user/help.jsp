<%@ page import="com.drivehub.util.constant.ConstantImage" %>
<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    Integer userId = -1;
    if (sessionObj != null) {
        userId = (Integer) sessionObj.getAttribute("userId");
        if(userId == null){
            response.sendRedirect("../../index.jsp");
        }
    } else {
        response.sendRedirect("../../index.jsp");
    }
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/user_header.jsp" />
        <style>
            .image-text-container {
                display: flex;
                align-items: start;
                gap: 20px;
                width: 100%;
            }
            .image-text-container img {
                width: 50%;
                border-radius: 10px;
            }
            .image-text-container div {
                width: 100%;
            }
        </style>
    </head>
    <body id="page-top" style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <div class="m-2">
            <div class="row">
                <div class="col-12">
                    <div class="image-text-container">
                        <img src="${pageContext.request.contextPath}/assets/images/car_1.jpg" alt="Sample Image">
                        <div>
                            <h2>Side by Side Text</h2>
                            <p>This is an example of text displayed beside an image using Bootstrap.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="m-2">
            <div class="row">
                <div class="col-12">
                    <div class="image-text-container">
                        <div>
                            <h2>Side by Side Text</h2>
                            <p>This is an example of text displayed beside an image using Bootstrap.</p>
                        </div>
                        <img src="${pageContext.request.contextPath}/assets/images/car_1.jpg" alt="Sample Image">

                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />

    </body>
</html>
