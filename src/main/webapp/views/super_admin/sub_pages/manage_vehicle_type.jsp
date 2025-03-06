<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Vehicle Type</h3>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#vehicleTypeFrom" id="newVehicleBtn">
        <i class="fa fa-spinner fa-spin" id="nv_btn_loading" style="display: none; margin-right: 5px;"></i>Add New Vehicle Type
    </button>
</div>


<table id="vehiclesTypesTable" class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col">Vehicle Type</th>
        <th scope="col">Per One Day</th>
        <th scope="col">Discount Full Amount</th>
        <th scope="col">Discount Balance Amount</th>
        <th scope="col">Penalty Extra Km</th>
        <th scope="col">Maximum Km PerDay</th>
        <th scope="col">Discount Days</th>
        <th scope="col" style="width: 5%">Actions</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--Vehicle insert From-->
<div class="modal fade" id="vehicleTypeFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New Vehicle Type</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form id="addNewVehicleType">
                    <input type="hidden" name="action" value="vehicle_type_new" required>

                    <div class="mb-3">
                        <label for="new_v_type_name" class="form-label">Vehicle Type</label>
                        <input type="text" class="form-control" id="new_v_type_name" name="new_v_type_name" placeholder="Enter Vehicle Type">
                        <span class="error_text" id="admin_new_v_type_error_0"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_per_one_day" class="form-label">Per one day amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="new_per_one_day" name="new_per_one_day" placeholder="Enter Amount">
                        <span class="error_text" id="admin_new_v_type_error_1"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_discount_full_amount" class="form-label">Discount full amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="new_discount_full_amount" name="new_discount_full_amount" placeholder="Enter Amount">
                        <span class="error_text" id="admin_new_v_type_error_2"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_discount_balance_amount" class="form-label">Discount balance amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="new_discount_balance_amount" name="new_discount_balance_amount" placeholder="Enter Amount">
                        <span class="error_text" id="admin_new_v_type_error_3"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_penalty_extra_km" class="form-label">Penalty for extra Km</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="new_penalty_extra_km" name="new_penalty_extra_km" placeholder="Enter Amount">
                        <span class="error_text" id="admin_new_v_type_error_4"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_maximum_km_per_day" class="form-label">Maximum Km Per Day</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="new_maximum_km_per_day" name="new_maximum_km_per_day" placeholder="Enter Km amount">
                        <span class="error_text" id="admin_new_v_type_error_5"></span>
                    </div>

                    <div class="mb-3">
                        <label for="new_discount_days" class="form-label">Discount Days</label>
                        <input type="number" min="1" class="form-control" id="new_discount_days" name="new_discount_days" placeholder="Enter Days">
                        <span class="error_text" id="admin_new_v_type_error_6"></span>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-spinner fa-spin" id="snv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Vehicle update From-->
<div class="modal fade" id="vehicleTypeUpdateFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel1">Update Vehicle</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form id="updateVehicleType">
                    <input type="hidden" name="action" value="vehicle_type_update" required>
                    <input type="hidden" name="test" value="vehicle_type_update" required>
                    <input type="hidden" name="update_vehicle_type_id" id="update_vehicle_type_id" required>

                    <div class="mb-3">
                        <label for="update_v_type_name" class="form-label">Vehicle Type</label>
                        <input type="text" class="form-control" id="update_v_type_name" name="update_v_type_name" placeholder="Enter Vehicle Type" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_0"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_per_one_day" class="form-label">Per one day amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="update_per_one_day" name="update_per_one_day" placeholder="Enter Amount" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_1"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_discount_full_amount" class="form-label">Discount full amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="update_discount_full_amount" name="update_discount_full_amount" placeholder="Enter Amount" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_2"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_discount_balance_amount" class="form-label">Discount balance amount</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="update_discount_balance_amount" name="update_discount_balance_amount" placeholder="Enter Amount" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_3"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_penalty_extra_km" class="form-label">Penalty for extra Km</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="update_penalty_extra_km" name="update_penalty_extra_km" placeholder="Enter Amount" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_4"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_maximum_km_per_day" class="form-label">Maximum Km Per Day</label>
                        <input type="number" min="1" step="0.1" class="form-control" id="update_maximum_km_per_day" name="update_maximum_km_per_day" placeholder="Enter Km amount" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_5"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_discount_days" class="form-label">Discount Days</label>
                        <input type="number" min="1" class="form-control" id="update_discount_days" name="update_discount_days" placeholder="Enter Days" oninput="enableVTypeSubmitButton()">
                        <span class="error_text" id="admin_update_v_type_error_6"></span>
                    </div>

                    <button type="submit" class="btn btn-success" id="updateVTypeBtn">
                        <i class="fa fa-spinner fa-spin" id="unv_type_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation-->
<div class="modal fade" id="deleteVehicleTypeForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel2">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style="margin-left:15px;">Are you sure you want to delete this item?</p>
            <div class="modal-body">
                <form id="deleteVehicleType">
                    <input type="hidden" name="action" value="vehicle_type_delete" required>
                    <input type="hidden" name="delete_vehicle_type_id" id="delete_vehicle_type_id" required>

                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-danger me-2" style="width: 40%;">
                            <i class="fa fa-spinner fa-spin" id="dv_btn_loading" style="display: none; margin-right: 5px;"></i>Delete
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="width: 40%;">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
