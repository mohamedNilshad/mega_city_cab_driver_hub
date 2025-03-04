<script>
    function getContent(invoiceData, companyProfile){

        const header = getHeader();
        const styles = getStyles();
        const invoiceHeader = getInvoiceHeader(invoiceData.currentDate, invoiceData.status);
        const invoiceCompanyInfo = getInvoiceCompanyInfo(companyProfile, invoiceData);
        const invoiceBookingInfo = getInvoiceBookingInfo(invoiceData);
        const invoiceBody = getInvoiceBody(invoiceData);
        const invoiceFooter = getInvoiceFooter(invoiceData);


        let content = `
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                ${header}
                                ${styles}
                            </head>
                        <body>
                            <div class="container" id="invoicePdf">
                                <div class="card">
                                    ${invoiceHeader}
                                    <div class="card-body">
                                        ${invoiceCompanyInfo}
                                        <hr>
                                        ${invoiceBookingInfo}

                                    <div class="table-responsive-sm">
                                        ${invoiceBody}
                                    </div>

                                    ${invoiceFooter}

                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        `;
        return content;
    }



    function getHeader(){
        return `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
        `;
    }

    function getStyles(){
        return `
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
        `;
    }

    function getInvoiceHeader(date, statusValue){
        status = getStatusByCode(statusValue);
        return `
            <div class="card-header">
                Invoice
                <strong>${date}</strong>
                <span class="float-right"> <strong>Status:</strong> ${status}</span>
            </div>
        `;
    }

    function getInvoiceCompanyInfo(companyProfile, invoiceData){

        return `
            <div class="row mb-4">
                <div class="col-sm-6">
                    <h6 class="mb-3">From:</h6>
                    <div>
                        <strong>${companyProfile.companyName}</strong>
                    </div>
                    <div>${companyProfile.companyAddress}</div>
                    <div>Email: ${companyProfile.companyEmail}</div>
                    <div>Phone: ${companyProfile.companyPhone}</div>
                </div>

                <div class="col-sm-6"  style="text-align: right;">
                    <h6 class="mb-3">To:</h6>
                    <div>
                        <strong>${invoiceData.passengerName}</strong>
                    </div>
                    <div>${invoiceData.customer.address}</div>
                    <div>Email: ${invoiceData.customer.email}</div>
                    <div>Phone: ${invoiceData.passengerPhone}</div>
                </div>
            </div>
        `;
    }

    function getInvoiceBookingInfo(invoiceData){

        let totalAmount = formatCurrency(invoiceData.totalAmount);
        let bookingType = invoiceData.bookingType == 1 ? "Schedule Booking" : "Instant Booking";
        return `
            <div class="col-sm-6">
                <div>
                    <span style="font-weight: 600;">Booking No :</span><strong>${invoiceData.bookingNumber}</strong>
                </div>
                <div><span style="font-weight: 600;">Booking Type :</span> ${bookingType}</div>
                <div><span style="font-weight: 600;">Start Date : ${invoiceData.startDate}</div>
                <div><span style="font-weight: 600;">End Date : ${invoiceData.endDate}</div>
                <div><span style="font-weight: 600;">Total Amount : </span> ${totalAmount}</div>
            </div>
        `;
    }

    function getInvoiceBody(invoiceData) {
       let rows = "";
       invoiceData.paymentInfoList.forEach((payment, index) => {
           let paymentType = payment.paymentType == 1 ? "Cash" : "Card";
           rows += `
               <tr>
                   <td class="center">${index + 1}</td>
                   <td class="left strong">${payment.referenceNumber}</td>
                   <td class="left">${paymentType}</td>
                   <td class="center">${payment.createdDate}</td>
                   <td class="right" style="text-align: right;">${formatCurrency(payment.providedAmount)}</td>
               </tr>
           `; // Removed the extra closing parenthesis `)`
       });


        return `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="center">#</th>
                        <th>Ref. No</th>
                        <th>Payment Type</th>
                        <th class="center">Date</th>
                        <th class="right" style="text-align: right;">Amount (LKR)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }


    function getInvoiceFooter(invoiceData){
        let paidAmount = 0.0;
        let totalAmount = invoiceData.totalAmount;

        invoiceData.paymentInfoList.forEach((payment) => {
            paidAmount += payment.providedAmount;
        });

        let balanceAmount = (totalAmount - paidAmount) <= 0 ? 0.0 : (totalAmount - paidAmount);
        let returnAmount = (paidAmount > totalAmount) ? paidAmount - totalAmount : 0.0;
        let isPaid = (paidAmount >= totalAmount);
        const stamp = getPaidStamp(isPaid);

        return `
            <div class="row">
                ${stamp}
                 <div class="col-lg-6 col-sm-5 ml-auto">
                     <table class="table table-clear">
                         <tbody>
                         <tr style="text-align: right;">
                             <td class="left">Total Amount To Pay</td>
                             <td class="right"> <strong>${formatCurrency(totalAmount)} </strong></td>
                         </tr>
                         <tr style="text-align: right;">
                             <td class="left">Paid Amount</td>
                             <td class="right"><strong> ${formatCurrency(paidAmount)} </strong></td>
                         </tr>
                         <tr style="text-align: right;">
                             <td class="left">Balance Amount</td>
                             <td class="right"><strong> ${formatCurrency(balanceAmount)} </strong></td>
                         </tr>
                         <tr style="text-align: right;">
                             <td class="left">Return Amount</td>
                             <td class="right"><strong> ${formatCurrency(returnAmount)}</strong> </td>
                         </tr>
                         </tbody>
                     </table>
                 </div>
            </div>
        `;
    }

    function getPaidStamp(isPaid){
        if(isPaid){
            return `<div class="rubber_stamp" style="color: green; border-color: green;">Paid</div>`;
        }else{
            return `<div class="rubber_stamp" style="color: red; border-color: red;">Not Paid</div>`;
        }
    }

</script>