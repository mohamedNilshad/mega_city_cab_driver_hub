

<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/header.jsp" />
        <link href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" rel="stylesheet" type="text/css" />
        <style>

            .box-2 {
                max-width: 450px;
                padding: 10px 40px;
            }

            .box-2 .box-inner-2 input.form-control {
                font-size: 12px;
                font-weight: 600;
            }

            /* Focus Styles */
            .form-control:focus,
            .form-select:focus {
                box-shadow: none;
                outline: none;
                border: 1px solid #7700ff;
            }

            /* Remove border for card details input */
            .box-2 .card-atm .form-control {
                border: none;
                box-shadow: none;
            }

            /* Button Styles */
            .btn-primary {
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

            .btn-primary:hover {
                background-color: #7a34ca;
            }

            /* Card Details Section */
            .card-atm {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 5px;
            }

            .card-atm .fab {
                font-size: 20px;
            }

            /* Cardholder Name Section */
            .cardname p {
                margin-bottom: 5px;
                font-weight: bold;
            }

            /* Total Amount Display */
            .address {
                margin-top: 15px;
            }

            .address .d-flex {
                justify-content: space-between;
                font-weight: bold;
            }

            /* Icons */
            .fas,
            .fab {
                color: #6d6c6d;
            }


        </style>

    </head>
    <body id="page-top" >

    <div style="display:none;" class="container">
        <div class="box-2">
            <div class="box-inner-2">
                <div>
                    <p class="fw-bold">Payment Details</p>
                    <p class="dis mb-3">Complete your purchase by providing your payment details</p>
                </div>
                <form action="">
                    <div>
                        <label class="dis fw-bold mb-2">Card details</label>
                        <div class="d-flex align-items-center justify-content-between card-atm border rounded">
                            <div class="fab fa-cc-visa ps-3"></div><i class="fa-brands fa-cc-visa"></i>
                            <input type="text" class="form-control" placeholder="Card Number" required>
                        </div>
                        <div class="d-flex justify-content-between mt-2">
                            <input type="text" class="form-control" placeholder="MM/YY" required>
                            <div class="w-50"></div>
                            <input type="password" maxlength="3" class="form-control" placeholder="CVV" required>
                        </div>
                        <div class="my-3 cardname">
                            <label class="dis fw-bold mb-2">Cardholder Name</label>
                            <input class="form-control" type="text" placeholder="Full Name" required>
                        </div>
                        <div class="address">
                            <div class="d-flex flex-column dis">
                                <div class="d-flex align-items-center justify-content-between mb-2">
                                    <p class="fw-bold">Total</p>
                                    <p class="fw-bold"><span class="fas fa-dollar-sign"></span>35.80</p>
                                </div>
                                <button type="submit" class="btn btn-primary mt-2">
                                    Pay 35.80
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="box-2">
            <div class="box-inner-2">
                <div>
                    <p class="fw-bold">Payment Details</p>
                    <p class="dis mb-3">Complete your purchase by providing your payment details</p>
                </div>

                <form id="cCardPaymentTypeForm">
                    <input type="hidden" name="action" value="custom_card_payment" required>
                    <input type="hidden" name="custom_payment_type" value="2" required>
                    <div>
                        <label class="dis fw-bold mb-2">Card details</label>
                        <div class="d-flex align-items-center justify-content-between card-atm border rounded">
                            <div class="fab fa-cc-visa ps-3"></div><i class="fa-brands fa-cc-visa"></i>
                            <input type="text" class="form-control" placeholder="Card Number" required>
                        </div>
                        <div class="d-flex justify-content-between mt-2">
                            <input type="text" class="form-control" placeholder="MM/YY" required>
                            <div class="w-50"></div>
                            <input type="password" maxlength="3" class="form-control" placeholder="CVV" required>
                        </div>
                        <div class="my-3 cardname">
                            <label class="dis fw-bold mb-2">Cardholder Name</label>
                            <input class="form-control" type="text" placeholder="Full Name" required>
                        </div>
                        <div class="address">
                            <div class="d-flex flex-column dis">
                                <div class="d-flex align-items-center justify-content-between mb-2">
                                    <p class="fw-bold">Total</p>
                                    <p class="fw-bold"><span class="fas fa-dollar-sign"></span>35.80</p>
                                </div>
                                <button type="submit" class="btn btn-primary mt-2">Pay 35.80</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


    </body>
</html>










