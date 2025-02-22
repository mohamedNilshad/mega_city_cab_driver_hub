<%@ page import="com.driverhub.utils.ConstantStrings" %>
<%@ page import="com.driverhub.utils.ConstantImage" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/admin_header.jsp" />
    </head>
    <body id="page-top"  style="padding-top: 110px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />


        <div style="padding-bottom: 5px; padding-right: 10px; float: right;">
            <a href="driver.jsp" class="btn btn-primary">Driver</a>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#vehicleFrom">Add New Vehicle</button>
        </div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style="width: 3%">#</th>
                    <th scope="col" style="width: 15%">Registration Number</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col" style="width: 10%">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>3258</td>
                    <td>David</td>
                    <td>Toyota Car</td>
                    <td>CFG 2548</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>3257</td>
                    <td>David</td>
                    <td>Toyota Car</td>
                    <td>CFG 2548</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>3256</td>
                    <td>David</td>
                    <td>Toyota Van</td>
                    <td>CFG 8448</td>
                    <td>
                        <button type="button" class="icon-btn"><i class="zmdi zmdi-edit"></i></button>
                        <button type="button" class="icon-btn" style="color: red"><i class="zmdi zmdi-delete"></i></button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>3258</td>
                    <td>David</td>
                    <td>Suzuky Car</td>
                    <td>CFG 5248</td>
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
                            
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <!--Vehicle From-->
        <div class="modal fade" id="vehicleFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popupFormLabel">New Vehicle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="v_type" class="form-label">Vehicle Type</label>
                                <input type="text" class="form-control" id="v_type" name="v_type" placeholder="Enter Vehicle Type">
                            </div>

                            <div class="mb-3">
                                <label for="v_number" class="form-label">Vehicle Number</label>
                                <input type="text" class="form-control" id="v_number" name="v_number" placeholder="Vehicle Number">
                            </div>

                            <div class="mb-3">
                                <label for="seat_count" class="form-label">Seat Count</label>
                                <input type="number" min="2" max="100" class="form-control" id="seat_count" name="seat_count" placeholder="Enter Seat Count">
                            </div>
                            
                           <div class="mb-3">
                                <label for="driver" class="form-label">Select an Driver</label>
                                <select class="form-select" id="driver" name="driver">
                                    <option value="" selected disabled>Choose an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <jsp:include page="../../WEB-INF/includes/footer.jsp" />

    </body>
</html>
