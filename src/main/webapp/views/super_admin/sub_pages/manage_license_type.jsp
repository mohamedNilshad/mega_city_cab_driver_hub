<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>License Type</h3>
    <button class="btn btn-primary" data-toggle="modal" data-target="#addNewLTypeModel">Add New Type</button>
</div>


<table id="licenseTypeTable" class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col">Type</th>
        <th scope="col" style="width: 5%">Actions</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--New License Type Form-->
<div class="modal fade" id="addNewLTypeModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New License Type</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="newLicenseTypeForm">
                    <input type="hidden" name="action" value="new_license_type" required>

                    <div class="mb-3">
                        <label for="new_license_type" class="form-label">License Type</label>
                        <input type="text" class="form-control" id="new_license_type" name="new_license_type" placeholder="Enter new type">
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="submit_loading" style="display: none;"></i> Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Edit License Type Form-->
<div class="modal fade" id="updateLTypeModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel2">Update License Type</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="updateLicenseTypeForm">
                    <input type="hidden" name="action" value="update_license_type" required>
                    <input type="hidden" name="licenseTypeId" id="license_type_id" required>
                    <div class="mb-3">
                        <label for="u_license_type" class="form-label">License Type</label>
                        <input type="text" class="form-control" id="u_license_type" name="update_license_type" placeholder="Enter new type">
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
<div class="modal fade" id="LTypeDeleteConfirm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Confirmation</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style="margin-left:15px;">Are you sure you want to Delete this License Type?</p>
            <div class="modal-body">
                <form id="deleteLicenseTypeForm">
                    <input type="hidden" name="action" value="delete_license_type" required>
                    <input type="hidden" name="l_type_id" id="type_id" required>

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

