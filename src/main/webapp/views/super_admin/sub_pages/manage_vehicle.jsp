<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Vehicle</h3>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#vehicleFrom" id="newVehicleBtn">
        <i class="fa fa-spinner fa-spin" id="nv_btn_loading" style="display: none; margin-right: 5px;"></i>Add New Vehicle
    </button>
</div>


<table id="vehiclesTable" class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th scope="col">Vehicle Image</th>
        <th scope="col">Vehicle Number</th>
        <th scope="col">Vehicle Name</th>
        <th scope="col">Vehicle Type</th>
        <th scope="col">Description</th>
        <th scope="col">Driver Name</th>
        <th scope="col">Driver Reg. Number</th>
        <th scope="col" style="width: 5%">Actions</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--Vehicle insert From-->
<div class="modal fade" id="vehicleFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel">New Vehicle</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form enctype="multipart/form-data" id="addNewVehicle">
                    <input type="hidden" name="action" value="vehicle_new" required>
                    <div class="mb-3">
                        <label for="driver" class="form-label">Select Vehicle Type</label>
                        <select class="form-select" id="v_type" name="v_type">
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="v_type" class="form-label">Vehicle Name</label>
                        <input type="text" class="form-control" id="v_name" name="v_name" placeholder="Enter Vehicle Type">
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
                        <label for="seat_count" class="form-label">Vehicle Image</label>
                        <input type="file" min="2" max="100" class="form-control" id="v_image" name="v_image" accept="image/*" placeholder="Select Vehicle Image">
                    </div>

                    <div class="mb-3">
                        <label for="v_description" class="form-label">Description</label>
                        <textarea class="form-control" id="v_description" name="v_description" placeholder="Enter Description"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="sdriver" class="form-label">Select an Driver</label>
                        <select class="form-select" id="sdriver" name="driver">
                        </select>
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="snv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Vehicle update From-->
<div class="modal fade" id="vehicleUpdateFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel1">Update Vehicle</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form enctype="multipart/form-data" id="updateNewVehicle">
                    <input type="hidden" name="action" value="vehicle_update" required>
                    <input type="hidden" name="vehicle_id" id="vehicle_id" required>
                    <input type="hidden" name="old_v_image" id="old_v_image" required>
                    <input type="hidden" name="old_driver_id" id="old_driver_id" required>
                    <div class="mb-3">
                        <label for="driver" class="form-label">Select Vehicle Type</label>
                        <select class="form-select" id="update_v_type" name="update_v_type">
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="v_type" class="form-label">Vehicle Name</label>
                        <input type="text" class="form-control" id="update_v_name" name="update_v_name" placeholder="Enter Vehicle Type">
                    </div>

                    <div class="mb-3">
                        <label for="v_number" class="form-label">Vehicle Number</label>
                        <input type="text" class="form-control" id="update_v_number" name="update_v_number" placeholder="Vehicle Number">
                    </div>

                    <div class="mb-3">
                        <label for="seat_count" class="form-label">Seat Count</label>
                        <input type="number" min="2" max="100" class="form-control" id="update_seat_count" name="update_seat_count" placeholder="Enter Seat Count">
                    </div>

                    <div style="margin-bottom:10px;">
                        <img src="" width="80px;" id="old_image"> <label for="old_image" class="form-label" id="old_image_label"></label>
                    </div>

                    <div class="mb-3">
                        <label for="seat_count" class="form-label">New Vehicle Image</label>
                        <input type="file" min="2" max="100" class="form-control" id="update_v_image" name="update_v_image" accept="image/*" placeholder="Select Vehicle Image">
                    </div>

                    <div class="mb-3">
                        <label for="v_description" class="form-label">Description</label>
                        <textarea class="form-control" id="update_v_description" name="update_v_description" placeholder="Enter Description"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="driver" class="form-label">Select an Driver</label>
                        <select class="form-select" id="update_driver" name="update_driver">
                        </select>
                    </div>

                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-spinner fa-spin" id="unv_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation-->
<div class="modal fade" id="deleteVehicleForm" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="popupFormLabel2">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style="margin-left:15px;">Are you sure you want to delete this item?</p>
            <div class="modal-body">
                <form id="deleteVehicle">
                    <input type="hidden" name="action" value="vehicle_delete" required>
                    <input type="hidden" name="d_v_id" id="d_v_id" required>
                    <input type="hidden" name="d_driver_id" id="d_driver_id" required>
                    <input type="hidden" name="d_image_name" id="d_image_name" required>

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
