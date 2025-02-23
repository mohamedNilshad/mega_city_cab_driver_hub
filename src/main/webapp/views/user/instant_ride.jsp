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
    </head>
    <body id="page-top" style="padding-top: 5px;">

        <a href="home.jsp" class="btn btn-dark" style="margin-left: 5px;"><i class="zmdi zmdi-arrow-left"></i></a>

        <div style="text-align: center;">
            <h1>Instant Booking MAP</h1>
        </div>
        <jsp:include page="../../WEB-INF/includes/footer.jsp" />

    </body>
</html>
