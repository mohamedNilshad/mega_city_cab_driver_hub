package com.drivehub.controller;

import com.drivehub.model.User;
import com.drivehub.service.CustomerService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/customer")
public class CustomerController extends HttpServlet {

    private final CustomerService customerService = new CustomerService();
    public CustomerController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("customer_list".equals(action)) {
            getCustomerList(request, response);
        }else if ("customer_info".equals(action)) {
            getCustomerInfo(request, response);
        }
    }

    private void getCustomerInfo(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        int customerId = Integer.parseInt(request.getParameter("customer_id"));

        User customer = customerService.getCustomerInfo(customerId);
        JSONObject jsonResponse = new JSONObject();

        if (customer != null) {
            jsonResponse.put("status", "success");
            jsonResponse.put("data", customer.toJson());

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Wrong Credentials!");
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void getCustomerList(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            String keyword = request.getParameter("keyword");
            List<User> customers = customerService.getCustomers(keyword);

            if(customers != null){

                JSONArray customerArray = new JSONArray();

                for (User c : customers) {
                    customerArray.put(c.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Customers Fetched Successfully");
                jsonResponse.put("data", customerArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Customers Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");

        if ("customer_new".equals(action)) {
            newCustomer(request, response);
        }else if ("customer_update".equals(action)) {
            updateCustomer(request, response);
        }
    }

    private void newCustomer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        //2->customer
        User newUser = new User(
                2,
                request.getParameter("new_customer_name"),
                request.getParameter("new_email"),
                request.getParameter("new_customer_nic"),
                request.getParameter("new_address"),
                request.getParameter("new_phone"),
                request.getParameter("username"),
                request.getParameter("password")
        );

        boolean isRegistered = customerService.addNewCustomer(newUser);

        JSONObject jsonResponse = new JSONObject();

        if (isRegistered) {
            jsonResponse.put("status", "success");
            jsonResponse.put("message", "New Customer Added Successful!");
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Registration Failed!");
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateCustomer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        User customer = new User(
                Integer.parseInt(request.getParameter("customer_id")),
                request.getParameter("update_customer_name"),
                request.getParameter("update_email"),
                request.getParameter("update_customer_nic"),
                request.getParameter("update_address"),
                request.getParameter("update_phone"),
                request.getParameter("update_username")
        );

        customer.setPassword(request.getParameter("update_password"));

        boolean isUpdated= customerService.updateCustomer(customer);

        JSONObject jsonResponse = new JSONObject();

        if (isUpdated) {
            jsonResponse.put("status", "success");
            jsonResponse.put("message", "Customer Updated Successful!");
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Customer Updating Failed!");
        }
        out.print(jsonResponse);
        out.flush();
    }
}


