<%@ page import="com.driverhub.utils.ConstantStrings" %>
<%@ page import="com.driverhub.utils.ConstantImage" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/admin_header.jsp" />
    </head>
    <body id="page-top"  style="padding-top: 5px;">

        <a href="manage_vehicle.jsp" class="btn btn-dark" style="margin-left: 5px;"><i class="zmdi zmdi-arrow-left"></i></a>

        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
        </div>
        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#driverForm">Add New Driver</button>
        </div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col" style="width: 15%">Registration Number</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">NIC Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">License Type</th>
                    <th scope="col">License Expire Date</th>
                    <th scope="col" style="width: 10%">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>2587</td>
                    <td>David John</td>
                    <td>12354785 V</td>
                    <td>Colombo</td>
                    <td>d@gmail.com</td>
                    <td>0112457215</td>
                    <td>Light</td>
                    <td>03-June-2028</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>3257</td>
                    <td>David</td>
                    <td>12354785 V</td>
                    <td>Colombo</td>
                    <td>d@gmail.com</td>
                    <td>0112457215</td>
                    <td>Light</td>
                    <td>03-June-2028</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>3256</td>
                    <td>David</td>
                    <td>12354785 V</td>
                    <td>Colombo</td>
                    <td>d@gmail.com</td>
                    <td>0112457215</td>
                    <td>Light</td>
                    <td>03-June-2028</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>3258</td>
                    <td>David</td>
                    <td>12354785 V</td>
                    <td>Colombo</td>
                    <td>d@gmail.com</td>
                    <td>0112457215</td>
                    <td>Light</td>
                    <td>03-June-2028</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!--Customer From-->
        <div class="modal fade" id="driverForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Driver</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name">
                            </div>

                            <div class="mb-3">
                                <label for="nic" class="form-label">NIC  Number</label>
                                <input type="text" class="form-control" id="customer_nic" name="customer_nic" placeholder="Enter your NIC">
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="phone" placeholder="Enter your phone number">
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email">
                            </div>

                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" address="address" placeholder="Enter your Address">
                            </div>
                            
                            <div class="mb-3">
                                <label for="license_type" class="form-label">Select License Type</label>
                                <select class="form-select" id="license_type" name="license_type">
                                    <option value="" selected disabled>Choose an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>


                            <div class="mb-3">
                                <label for="license_expire" class="form-label">License Expire Date</label>
                                <input type="date" class="form-control" id="license_expire" name="license_expire" >
                            </div>
                            


                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <jsp:include page="../../WEB-INF/includes/footer.jsp" />
        <script>
            document.addEventListener("DOMContentLoaded", function () {
                let today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

                let dateInput = document.getElementById("license_expire");
                dateInput.min = today; // Restrict past dates

                dateInput.addEventListener("change", function () {
                    if (this.value < today) {
                        this.value = today; // Reset to today's date if past date is selected
                    }
                });
            });
        </script>

    </body>
</html>
