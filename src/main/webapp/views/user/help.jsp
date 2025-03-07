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
            .overlay {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: rgba(255, 255, 255, 0.7);
               display: flex;
               justify-content: center;
               align-items: center;
               z-index: 10;
           }
        </style>
    </head>
    <body id="page-top" style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <!-- Overlay (Hidden Initially) -->
        <div id="formOverlay" class="overlay d-none">
            <i class="fa fa-spinner fa-spin" style="font-size:35px;"></i>
        </div>
        <div id="helpBody"> </div>

        <script> var contextPath = '${pageContext.request.contextPath}' + '/uploads/help/'; </script>
        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <jsp:include page="../../js/user/help.js" />

    </body>
</html>
