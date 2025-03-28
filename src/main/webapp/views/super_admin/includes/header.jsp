
<%@page import="com.drivehub.util.constant.ConstantStrings"%>

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />

<title><%= ConstantStrings.BRAND_NAME%></title>

<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="../../assets/favicon.ico" />

<!-- Font Awesome icons (free version)-->
<script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" crossorigin="anonymous"></script>
<!-- Google fonts-->
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css" />

<!-- Core theme CSS (includes Bootstrap)-->
<link href="../../css/index-styles.css" rel="stylesheet" />
<link href="../../css/style_2.css" rel="stylesheet" />

<link rel="stylesheet" href="../../fonts/material-icon/css/material-design-iconic-font.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- Bootstrap 4 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

<!-- jQuery (Required for Bootstrap and Datepicker) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Popper.js (Required for Bootstrap) -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>

<!-- Bootstrap 4 JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>

<!-- Bootstrap Datepicker CSS & JS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>


<style>

    .rubber_stamp {
      font-family: 'Vollkorn', serif;
      font-size: 39px;
      line-height: 45px;
      text-transform: uppercase;
      font-weight: bold;
      color: green;
      border: 7px solid green;
      float: left;
      padding: 10px 20px;
      border-radius: 10px;
      width: auto;
      height: auto;

      opacity: 0.8;
      -webkit-transform: rotate(-10deg);
      -o-transform: rotate(-10deg);
      -moz-transform: rotate(-10deg);
      -ms-transform: rotate(-10deg);
      position:absolute;
      bottom:10%;
      left: 10%;
    }

    .error_text{
      color: red;
      font-size: 10px;
    }

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
    .fa {
      margin-left: -12px;
      margin-right: 8px;
    }
    .c-table table, thead.thead-dark th, td{
        vertical-align: middle;
    }

    .custom-box-2 .custom-box-inner-2 input.custom-form-control {
        font-size: 12px;
        font-weight: 600;
    }

    /* Focus Styles */
    .custom-form-control:focus,
    .custom-form-select:focus {
        box-shadow: none;
        outline: none;
        border: 1px solid #7700ff;
    }

    /* Remove border for card details input */
    .custom-box-2 .custom-card-atm .custom-form-control {
        border: none;
        box-shadow: none;
    }

    /* Button Styles */
    .custom-btn-primary {
        background-color: #7700ff;
        color: whitesmoke;
        font-size: 14px;
        display: flex;
        align-items: center;
        font-weight: 600;
        justify-content: center;
        border: none;
        padding: 10px;
    }

    .custom-btn-primary:hover {
        background-color: #7a34ca;
    }

    /* Card Details Section */
    .custom-card-atm {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 5px;
    }

    .custom-card-atm .fab {
        font-size: 20px;
    }

    /* Cardholder Name Section */
    .custom-cardname p {
        margin-bottom: 5px;
        font-weight: bold;
    }

    /* Total Amount Display */
    .custom-address {
        margin-top: 15px;
    }

    .custom-address .custom-d-flex {
        justify-content: space-between;
        font-weight: bold;
    }

    /* Icons */
    .custom-fas,
    .custom-fab {
        color: #6d6c6d;
    }

    .custom-card-with-border {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ddd; /* Border for both the icon and input */
        border-radius: 5px;
        padding: 5px;
    }

    .custom-card-with-border .fab {
        font-size: 20px;
    }

    .custom-input {
        border: none; /* Remove individual borders from input */
        box-shadow: none;
    }



</style>