<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Driver</h3>
    <button type="button" class="btn btn-primary" id="newDriverBtn" data-bs-toggle="modal" data-bs-target="#driverForm">
        <i class="fa fa-spinner fa-spin" id="btn_loading"  style="display: none;"></i> Add New Driver
    </button>
</div>


<table id="driversTable" class="table c-table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col" style="width: 10%">Registration Number</th>
        <th scope="col">Full Name</th>
        <th scope="col">NIC Number</th>
        <th scope="col">Address</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">License Type</th>
        <th scope="col">License Expire Date</th>
        <th scope="col" style="width: 5%">Actions</th>
    </tr>
    </thead>
    <tbody>

    </tbody>
</table>

<!--New Driver From-->
<div class="modal fade" id="driverForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New Driver</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="newDriverForm">
                    <input type="hidden" name="action" value="driver_new" required>
                    <div class="mb-3">
                        <label for="driver_name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="driver_name" name="name" placeholder="Enter your name">
                    </div>

                    <div class="mb-3">
                        <label for="driver_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="driver_nic" name="driver_nic" placeholder="Enter your NIC">
                    </div>

                    <div class="mb-3">
                        <label for="driver_phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="driver_phone" name="phone" placeholder="Enter your phone number">
                    </div>

                    <div class="mb-3">
                        <label for="driver_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="driver_email" name="email" placeholder="Enter your email">
                    </div>

                    <div class="mb-3">
                        <label for="driver_address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="driver_address" name="address" placeholder="Enter your Address">
                    </div>

                    <div class="mb-3">
                        <label for="license_type" class="form-label">Select License Type</label>
                        <select class="form-select" id="license_type" name="license_type_id">
                            <option value="" selected disabled>Choose an option</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="license_expire" class="form-label">License Expire Date</label>
                        <input type="date" class="form-control" id="license_expire" name="license_expire" >
                    </div>


                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Update Driver Form-->
<div class="modal fade" id="driverUpdateForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel1">Update Driver</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="updateDriverForm">
                    <input type="hidden" name="action" value="driver_update" required>
                    <input type="hidden" name="driver_id" id="driver_id" required>

                    <div class="mb-3">
                        <label for="reg_num" class="form-label">Registration Number</label>
                        <input type="text" class="form-control" id="reg_num" name="reg_num" readonly>
                    </div>

                    <div class="mb-3">
                        <label for="update_driver_name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="update_driver_name" name="update_name" placeholder="Enter your name">
                    </div>

                    <div class="mb-3">
                        <label for="update_driver_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="update_driver_nic" name="update_driver_nic" placeholder="Enter your NIC">
                    </div>

                    <div class="mb-3">
                        <label for="update_driver_phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="update_driver_phone" name="update_phone" placeholder="Enter your phone number">
                    </div>

                    <div class="mb-3">
                        <label for="update_driver_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="update_driver_email" name="update_email" placeholder="Enter your email">
                    </div>

                    <div class="mb-3">
                        <label for="update_driver_address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="update_driver_address" name="update_address" placeholder="Enter your Address">
                    </div>

                    <div class="mb-3">
                        <label for="license_type" class="form-label">Select License Type</label>
                        <select class="form-select" id="update_license_type" name="update_license_type_id">
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="license_expire" class="form-label">License Expire Date</label>
                        <input type="date" class="form-control" id="update_license_expire" name="update_license_expire" >
                    </div>


                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-spinner fa-spin" id="update_submit_loading" style="display: none;"></i> Update
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
