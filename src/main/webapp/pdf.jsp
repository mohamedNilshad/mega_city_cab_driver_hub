<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">

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

    </style>

</head>
<body>
<button class="btn btn-primary mt-3 no-print" onclick="printInvoice()">Print / Save as PDF</button>
        <div class="container" id="invoicePdf">
            <div class="card">
                <div class="card-header">
                    Invoice
                    <strong>01/01/01/2018</strong>
                    <span class="float-right"> <strong>Status:</strong> Pending</span>

                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-sm-6">
                            <h6 class="mb-3">From:</h6>
                            <div>
                                <strong>Webz Poland</strong>
                            </div>
                            <div>Madalinskiego 8</div>
                            <div>71-101 Szczecin, Poland</div>
                            <div>Email: info@webz.com.pl</div>
                            <div>Phone: +48 444 666 3333</div>
                        </div>

                        <div class="col-sm-6"  style="text-align: right;">
                            <h6 class="mb-3">To:</h6>
                            <div>
                                <strong>Bob Mart</strong>
                            </div>
                            <div>Attn: Daniel Marek</div>
                            <div>43-190 Mikolow, Poland</div>
                            <div>Email: marek@daniel.com</div>
                            <div>Phone: +48 123 456 789</div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-sm-6">
                        <h6 class="mb-3">From:</h6>
                        <div>
                            <strong>Webz Poland</strong>
                        </div>
                        <div>Madalinskiego 8</div>
                        <div>71-101 Szczecin, Poland</div>
                        <div>Email: info@webz.com.pl</div>
                        <div>Phone: +48 444 666 3333</div>
                    </div>

                    <div class="table-responsive-sm">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th class="center">#</th>
                                <th>Ref. No</th>
                                <th>Payment Type</th>
                                <th class="center">Date</th>
                                <th class="right" style="text-align: right;">Amount(LKR)</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="center">1</td>
                                <td class="left strong">11111</td>
                                <td class="left">Cash</td>
                                <td class="center">2025-03-03 21:35:54</td>

                                <td class="right" style="text-align: right;">20,000.00</td>
                            </tr>
                            <tr>
                                <td class="center">2</td>
                                <td class="left strong">556125</td>
                                <td class="left">Card</td>
                                <td class="center">2025-03-02 21:35:54</td>

                                <td class="right" style="text-align: right;">10,000.00</td>
                            </tr>
                            <tr>
                                <td class="center">3</td>
                                <td class="left strong">556125</td>
                                <td class="left">Card</td>
                                <td class="center">2025-03-02 21:35:54</td>

                                <td class="right" style="text-align: right;">5,000.00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="rubber_stamp">Paid</div>

                        <div class="col-lg-5 col-sm-5 ml-auto">
                            <table class="table table-clear">
                                <tbody>
                                <tr style="text-align: right;">
                                    <td class="left">
                                        Total Amount To Pay
                                    </td>
                                    <td class="right">
                                        <strong>35,000.00</strong>
                                    </td>
                                </tr>
                                <tr style="text-align: right;">
                                    <td class="left">
                                        Paid Amount
                                    </td>
                                    <td class="right">
                                        <strong>35,000.00</strong>
                                    </td>
                                </tr>
                                <tr style="text-align: right;">
                                    <td class="left">
                                        Balance Amount
                                    </td>
                                    <td class="right">
                                        <strong>00.00</strong>
                                    </td>
                                </tr>
                                <tr style="text-align: right;">
                                    <td class="left">
                                        Return Amount
                                    </td>
                                    <td class="right">
                                        <strong>00.00</strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </div>

<jsp:include page="invoice.js" />
<script>


     function printInvoice() {
        var printWindow = window.open('', '', 'width=800,height=600');

        printWindow.document.write(getContent("Complete"));
        printWindow.document.close();
        printWindow.print();
    }



</script>


</script>

</body>
</html>
