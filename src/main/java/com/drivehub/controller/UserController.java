package com.drivehub.controller;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.drivehub.model.User;
import com.drivehub.service.UserService;
import org.json.JSONObject;

@WebServlet("/user")
public class UserController extends HttpServlet {

    private final UserService userService = new UserService();
    public UserController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("logout".equals(action)) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
                response.sendRedirect("index.jsp");
            }
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");

        if ("register".equals(action)) {
            registerUser(request, response);
        } else if ("login".equals(action)) {
            loginUser(request, response);
        }
    }

    private void registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

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

        JSONObject jsonResponse = new JSONObject();

        if (isRegistered) {

            jsonResponse.put("status", "success");
            jsonResponse.put("message", "Registration Successful!");

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Registration Failed!");
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User user = userService.login(username, password);
        JSONObject jsonResponse = new JSONObject();

        if (user != null) {
            HttpSession session = request.getSession();
            if(user.getUserType() == 1){
                session.setAttribute("adminId", user.getId());
            }else{
                session.setAttribute("userId", user.getId());
            }

            jsonResponse.put("status", "success");
            jsonResponse.put("userId", user.getId());
            jsonResponse.put("userType", user.getUserType());

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Wrong Credentials!");
        }
        out.print(jsonResponse);
        out.flush();
    }
}


