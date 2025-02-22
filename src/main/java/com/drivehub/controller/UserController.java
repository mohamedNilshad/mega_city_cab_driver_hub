package com.drivehub.controller;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.drivehub.model.User;
import com.drivehub.service.UserService;
import org.json.JSONObject;

@WebServlet("/user")
public class UserController extends HttpServlet {

    private final UserService userService = new UserService();
    public UserController() {super();}


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");

        if ("register".equals(action)) {
            registerUser(request, response);
        } else if ("login".equals(action)) {
            loginUser(request, response);
        }
    }

    private void registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
       User newUser = new User(
               2,
               request.getParameter("name"),
               request.getParameter("email"),
               request.getParameter("nic"),
               request.getParameter("address"),
               request.getParameter("phone"),
               request.getParameter("uname"),
               request.getParameter("pass")
       );

        boolean isRegistered = userService.register(newUser);

        PrintWriter out = response.getWriter();
        if (isRegistered) {
            request.setAttribute("success", "Registration Successful!");
        } else {
            request.setAttribute("error", "Registration Failed!");
        }

    }

    private void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = userService.login(username, password);

        // Create JSON response
        JSONObject jsonResponse = new JSONObject();
        if (user) {
            jsonResponse.put("status", "success");
            jsonResponse.put("message", "Registration Successful!");
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Registration Failed!");
        }

        out.print(jsonResponse.toString()); // Send JSON response
        out.flush();


        //        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//
////        boolean isValidUser = userService.login(username, password);
//
//        PrintWriter out = response.getWriter();
//        if (isValidUser) {
//            out.println("Login Successful!");
//        } else {
//            out.println("Invalid Credentials!");
//        }
    }
}


