<%@ page import="com.driverhub.utils.ConstantStrings" %>
<%@ page import="com.driverhub.utils.ConstantImage" %>


<!-- Navigation-->
<jsp:include page="nav/nav.jsp" />
<div style="padding-bottom: 5px; padding-right: 10px; float: right;">
    <button type="button" class="btn btn-primary">Driver</button>
    <button type="button" class="btn btn-secondary">Vehicle</button>
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



<!-- Bootstrap core JS-->
<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Core theme JS-->
<script src="js/scripts.js"></script>
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
<!-- * *                               SB Forms JS                               * *-->
<!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
<script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>

<jsp:include page="../../WEB-INF/includes/footer.jsp" />