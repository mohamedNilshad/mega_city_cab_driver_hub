<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Admin</h3>
    <button class="btn btn-primary" data-toggle="modal" data-target="#adminForm">Add New Admin</button>
</div>


<table  id="adminTable" class="table">
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
        <th scope="col" style="width: 5%">Status</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--New Admin Form-->
<div class="modal fade" id="adminForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New Admin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="newAdminForm">
                    <input type="hidden" name="action" value="admin_new" required>
                    <div class="mb-3">
                        <label for="new_admin_name" class="form-label">Admin Name</label>
                        <input type="text" class="form-control" id="new_admin_name" name="new_admin_name" placeholder="Enter admin name">
                    </div>

                    <div class="mb-3">
                        <label for="new_admin_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="new_admin_nic" name="new_admin_nic" placeholder="Enter admin NIC">
                    </div>

                    <div class="mb-3">
                        <label for="new_admin_phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="new_admin_phone" name="new_admin_phone" placeholder="Enter admin phone number">
                    </div>

                    <div class="mb-3">
                        <label for="new_admin_address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="new_admin_address" name="new_admin_address" placeholder="Enter admin Address">
                    </div>

                    <div class="mb-3">
                        <label for="new_admin_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="new_admin_email" name="new_admin_email" placeholder="Enter admin Email">
                    </div>

                    <div class="mb-3">
                        <label for="admin_username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="admin_username" name="admin_username" placeholder="Enter admin Username">
                    </div>

                    <div class="mb-3">
                        <label for="admin_password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="admin_password" name="admin_password" placeholder="Enter admin Password">
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Edit Admin Form-->
<div class="modal fade" id="editAdminModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel2">Update Admin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editAdminForm">
                    <input type="hidden" name="action" value="admin_update" required>
                    <input type="hidden" name="adminId" id="admin_id" required>
                    <div class="mb-3">
                        <label for="update_admin_name" class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="update_admin_name" name="update_admin_name" placeholder="Enter your name">
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_nic" class="form-label">NIC  Number</label>
                        <input type="text" class="form-control" id="update_admin_nic" name="update_admin_nic" placeholder="Enter your NIC">
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="update_admin_phone" name="update_admin_phone" placeholder="Enter your phone number">
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="update_admin_address" name="update_admin_address" placeholder="Enter your Address">
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="update_admin_email" name="update_admin_email" placeholder="Enter your Email">
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="update_admin_username" name="update_admin_username" placeholder="Enter your Username" readonly>
                    </div>

                    <div class="mb-3">
                        <label for="update_admin_password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="update_admin_password" name="update_admin_password" placeholder="Enter your Password">
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="uc_btn_loading" style="display: none;"></i> Update
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation-->
<div class="modal fade" id="AdminStatusConfirm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="adminStatusChangeConfirm"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style="margin-left:15px;">Are you sure you want to <span id="statusLabel"></span> this user?</p>
            <div class="modal-body">
                <form id="changeAdminStatusForm">
                    <input type="hidden" name="action" value="change_user_status" required>
                    <input type="hidden" name="statusUserId" id="status_admin_id" required>
                    <input type="hidden" name="status" id="user_status" required>

                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-primary me-2" style="width: 40%;">
                            <i class="fa fa-spinner fa-spin" id="dv_btn_loading" style="display: none; margin-right: 5px;"></i>Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

