<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Help Document</h3>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newHelpFrom" id="newHelpBtn">
        <i class="fa fa-spinner fa-spin" id="nv_btn_loading" style="display: none; margin-right: 5px;"></i>Add New Help
    </button>
</div>


<table id="helpTable" class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="width: 3%">#</th>
        <th style="width: 5%;">Image</th>
        <th style="width: 30%;">Help Title</th>
        <th style="width: 57%;">Description</th>
        <th style="width: 5%">Actions</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!--Help insert From-->
<div class="modal fade" id="newHelpFrom" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">New Help</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form enctype="multipart/form-data" id="addNewHelp">
                    <input type="hidden" name="action" value="help_new" required>

                    <div class="mb-3">
                        <label for="h_title" class="form-label">Help Title</label>
                        <input type="text" class="form-control" id="h_title" name="h_title" placeholder="Enter Title">
                        <span class="error_text" id="new_help_error_0"></span>
                    </div>

                    <div class="mb-3">
                        <label for="h_image" class="form-label">Select an Image</label>
                        <input type="file" class="form-control" id="h_image" name="h_image" accept="image/*" placeholder="Select An Image">
                        <span class="error_text" id="new_help_error_2"></span>
                    </div>

                    <div class="mb-3">
                        <label for="h_description" class="form-label">Description</label>
                        <textarea class="form-control" id="h_description" name="h_description" placeholder="Enter Description"></textarea>
                        <span class="error_text" id="new_help_error_1"></span>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-spinner fa-spin" id="h_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Help update From-->
<div class="modal fade" id="helpUpdateFromModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update Help</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form enctype="multipart/form-data" id="updateHelpForm">
                    <input type="hidden" name="action" value="help_update" required>
                    <input type="hidden" name="help_id" id="help_id" required>
                    <input type="hidden" name="old_h_image" id="old_h_image" required>

                    <div class="mb-3">
                        <label for="update_h_title" class="form-label">Help Title</label>
                        <input type="text" class="form-control" id="update_h_title" name="update_h_title" placeholder="Enter Title" oninput="enableHelpSubmitButton()">
                        <span class="error_text" id="update_help_error_0"></span>
                    </div>

                    <div style="margin-bottom:10px;">
                        <img src="" width="80px;" id="old_h_image_d"> <label for="old_h_image_d" class="form-label" id="old_h_image_label"></label>
                    </div>

                    <div class="mb-3">
                        <label for="update_h_image" class="form-label">Select New Image</label>
                        <input type="file" class="form-control" id="update_h_image" name="update_h_image" accept="image/*" placeholder="Select An Image" onchange="enableHelpSubmitButton()">
                        <span class="error_text" id="update_help_error_2"></span>
                    </div>

                    <div class="mb-3">
                        <label for="update_h_description" class="form-label">Description</label>
                        <textarea class="form-control" id="update_h_description" name="update_h_description" placeholder="Enter Description" oninput="enableHelpSubmitButton()"></textarea>
                        <span class="error_text" id="update_help_error_1"></span>
                    </div>

                    <button type="submit" class="btn btn-success" id="updateHelpBtn">
                        <i class="fa fa-spinner fa-spin" id="uh_btn_loading" style="display: none; margin-right: 5px;"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation-->
<div class="modal fade" id="deleteHelpFormModel" tabindex="-1" aria-labelledby="popupFormLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirm Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <p style="margin-left:15px;">Are you sure you want to delete this item?</p>
            <div class="modal-body">
                <form id="deleteHelp">
                    <input type="hidden" name="action" value="help_delete" required>
                    <input type="hidden" name="h_id" id="h_id" required>
                    <input type="hidden" name="h_image_name" id="h_image_name" required>

                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-danger me-2" style="width: 40%;">
                            <i class="fa fa-spinner fa-spin" id="dh_btn_loading" style="display: none; margin-right: 5px;"></i>Delete
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="width: 40%;">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
