<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@  page import="java.util.*" %>

<%
    HttpSession sessionObj = request.getSession(false);
    Integer userId = -1;
    if (sessionObj != null) {
        userId = (Integer) sessionObj.getAttribute("superAdminId");
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
        <jsp:include page="includes/header.jsp" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            .custom-alert {
                position: fixed;
                bottom: 20px;
                right: -50px;
                transform: translateX(-50%);
                width: 300px;
                padding: 40px 0;
                font-weight: bold;
                text-align: center;
                z-index: 1050;
                display:none;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
            }

             .text-container {
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
            }

            .text-container:hover {
                white-space: normal;
                overflow: visible;
                background: white;
                position: absolute;
                z-index: 10;
                padding: 5px;
                border: 1px solid #ccc;
            }
        </style>
    </head>
    <body id="page-top" style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />
        <div class="alert alert-success custom-alert" role="alert" id="success_alert"></div>
        <div class="alert alert-danger custom-alert" role="alert" id="error_alert"></div>

        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#customer_tab">Customer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#admin_tab">Admin</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#driver_tab">Driver</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#license_type_tab">License Type</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#vehicle_tab">Vehicle</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#vehicle_type_tab">Vehicle Type</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#help_document">Help Document</a>
            </li>

        </ul>

        <!-- Tab panes -->
        <div class="tab-content" style="padding-left:2px;padding-right:2px;">
            <div id="customer_tab" class="tab-pane active"><br>
                <jsp:include page="sub_pages/manage_customer.jsp" />
            </div>
            <div id="admin_tab" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/manage_admin.jsp" />
            </div>
            <div id="driver_tab" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/manage_driver.jsp" />
            </div>
            <div id="license_type_tab" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/manage_license_type.jsp" />
            </div>
            <div id="vehicle_tab" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/manage_vehicle.jsp" />
            </div>
            <div id="vehicle_type_tab" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/manage_vehicle_type.jsp" />
            </div>
            <div id="help_document" class="tab-pane fade"><br>
                <jsp:include page="sub_pages/help_document.jsp" />
            </div>
        </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>var contextPath = '${pageContext.request.contextPath}' + '/uploads/';</script>
        <jsp:include page="../../js/super_admin/manage.js" />
        <jsp:include page="../../js/validations/validation.js" />

    </body>
</html>
