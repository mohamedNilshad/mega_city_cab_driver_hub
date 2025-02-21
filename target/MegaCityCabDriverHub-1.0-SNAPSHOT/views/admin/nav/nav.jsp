<%@ page import="com.driverhub.utils.ConstantStrings" %>
<%@ page import="com.driverhub.utils.ConstantImage" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title><%= ConstantStrings.BRAND_NAME%></title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="../../assets/favicon.ico" />
        <!-- Font Awesome icons (free version)-->
        <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
        crossorigin="anonymous"></script>
        <!-- Google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
              rel="stylesheet" type="text/css" />
        <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic"
            rel="stylesheet" type="text/css" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="../../css/index-styles.css" rel="stylesheet" />
        <link href="../../css/styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="../../fonts/material-icon/css/material-design-iconic-font.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <style>
            .icon-btn {
                background-color: transparent;
                border: none;
                color: black;
                cursor: pointer;
            }

            .icon-btn:hover {
                background-color: lightblue;
            }

            .status {
                text-align: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
            }

            /* Specific background colors */

            td.status.status-completed {
                background-color: #23ca65;
            }

            td.status.status-scheduled {
                background-color: #2379ca;
            }

            td.status.status-canceled {
                background-color: #ca2323;
            }
            
            td.status.status-ongoing {
                background-color: #da811c;
            }
        </style>
    </head>
    <body id="page-top"  style="padding-top: 110px;">
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
                                class="nav-link py-3 px-0 px-lg-3 rounded" href="./home.jsp">Home</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a
                                class="nav-link py-3 px-0 px-lg-3 rounded" href="./manage_vehicle.jsp">Manage Vehicle</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a
                                class="nav-link py-3 px-0 px-lg-3 rounded" href="./help.jsp">Help</a></li>
                        <li class="nav-item mx-0 mx-lg-1"><a
                                class="nav-link py-3 px-0 px-lg-3 rounded" href="../../index.jsp">Logout</a></li>

                    </ul>
                </div>
            </div>
        </nav>
