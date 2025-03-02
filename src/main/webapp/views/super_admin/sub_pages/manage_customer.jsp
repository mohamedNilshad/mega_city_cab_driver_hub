<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Customer</h3>
    <button class="btn btn-primary" data-toggle="modal" data-target="#customerForm">Add New Customer</button>
</div>


<table  id="customersTable" class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">NIC</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Username</th>
        <th scope="col" style="width: 5%">Actions</th>
        <th scope="col"> Book </th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--New Customer Form-->
<div class="modal fade" id="customerForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="newCustomerForm">
                    <input type="hidden" name="action" value="customer_new" required>
                    <div class="mb-3">
                        <label for="new_customer_name" class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="new_customer_name" name="new_customer_name" placeholder="Enter your name">
                    </div>

                    <div class="mb-3">
                        <label for="new_customer_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="new_customer_nic" name="new_customer_nic" placeholder="Enter your NIC">
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="new_phone" name="new_phone" placeholder="Enter your phone number">
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="new_address" name="new_address" placeholder="Enter your Address">
                    </div>

                    <div class="mb-3">
                        <label for="new_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="new_email" name="new_email" placeholder="Enter your Email">
                    </div>

                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="Enter your Username">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Enter your Password">
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Edit Customer Form-->
<div class="modal fade" id="editCustomerModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel2">Update Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editCustomerForm">
                    <input type="hidden" name="action" value="customer_update" required>
                    <input type="hidden" name="customer_id" id="customer_id" required>
                    <div class="mb-3">
                        <label for="new_customer_name" class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="update_customer_name" name="update_customer_name" placeholder="Enter your name">
                    </div>

                    <div class="mb-3">
                        <label for="new_customer_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="update_customer_nic" name="update_customer_nic" placeholder="Enter your NIC">
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="update_phone" name="update_phone" placeholder="Enter your phone number">
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="update_address" name="update_address" placeholder="Enter your Address">
                    </div>

                    <div class="mb-3">
                        <label for="new_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="update_email" name="update_email" placeholder="Enter your Email">
                    </div>

                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="update_username" name="update_username" placeholder="Enter your Username" readonly>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="update_password" name="update_password" placeholder="Enter your Password">
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="uc_btn_loading" style="display: none;"></i> Update
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
