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
                align-items: center;
                gap: 20px;
                width: 100%;
            }
            .image-text-container img {
                width: 100%;
                border-radius: 10px;
            }
            .image-text-container div {
                width: 100%;
            }
        </style>
    </head>
    <body id="page-top"  style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="image-text-container">
                        <img src="<% ConstantImage.CAB_1_IMAGE %>" alt="Sample Image">
                        <div>
                            <h2>Side by Side Text</h2>
                            <p>This is an example of text displayed beside an image using Bootstrap.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="image-text-container">
                        <div>
                            <h2>Side by Side Text</h2>
                            <p>This is an example of text displayed beside an image using Bootstrap.</p>
                        </div>
                        <img src="https://via.placeholder.com/400x300" alt="Sample Image">
                    </div>
                </div>
            </div>
        </div>




        <jsp:include page="../../WEB-INF/includes/footer.jsp" />

    </body>
</html>
