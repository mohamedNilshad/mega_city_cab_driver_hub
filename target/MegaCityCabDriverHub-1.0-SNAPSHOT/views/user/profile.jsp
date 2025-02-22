
<!DOCTYPE html>
<html lang="en">
    <head>
        <jsp:include page="includes/user_header.jsp" />
    </head>
    <body id="page-top" style="padding-top: 110px; padding-bottom: 10px;">
        <!-- Navigation-->
        <jsp:include page="nav.jsp" />

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="popupFormLabel">Profile</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="admin_name" name="admin_name" placeholder="Enter your name">
                        </div>

                        <div class="mb-3">
                            <label for="admin_email" class="form-label">Email</label>
                            <input type="admin_email" class="form-control" id="admin_email" name="admin_email" placeholder="Enter your email">
                        </div>

                        <div class="mb-3">
                            <label for="admin_username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="admin_username" name="admin_username" placeholder="Enter your Username">
                        </div>

                        <div class="mb-3">
                            <label for="admin_password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="admin_password" name="admin_password" placeholder="Enter your Password">
                        </div>

                        <button type="submit" class="btn btn-success">Submit</button>
                    </form>
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
