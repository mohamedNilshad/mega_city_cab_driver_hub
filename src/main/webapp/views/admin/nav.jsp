<%@ page import="com.drivehub.util.constant.ConstantStrings" %>
<%@ page import="com.drivehub.util.constant.ConstantImage" %>

<!-- Navigatsion-->
<nav
    class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
    id="mainNav">
    <div class="container">
        <a class="navbar-brand" href="#page-top"><%= ConstantStrings.BRAND_NAME%></a>
        <button
            class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
            aria-expanded="false" aria-label="Toggle navigation">
            Menu <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link py-3 px-0 px-lg-3 rounded" href="home.jsp">Home</a></li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link py-3 px-0 px-lg-3 rounded" href="history.jsp">History</a></li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link py-3 px-0 px-lg-3 rounded" href="manage_vehicle.jsp">Manage Vehicle</a></li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link py-3 px-0 px-lg-3 rounded" href="profile.jsp">Profile</a></li>
                <li class="nav-item mx-0 mx-lg-1">
                         <a class="nav-link py-3 px-0 px-lg-3 rounded" href=<%= request.getContextPath() %>/user?action=logout>Logout</a></li>

            </ul>
        </div>
    </div>
</nav>
