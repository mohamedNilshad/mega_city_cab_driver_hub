package com.drivehub.controller;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.drivehub.model.User;
import com.drivehub.service.UserService;
import org.json.JSONArray;
import org.json.JSONException;
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
        }else if ("profile_info".equals(action)) {
            getProfileInfo(request, response);
        }else if ("user_list".equals(action)) {
            getUserList(request, response);
        }
    }

    private void getUserList(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            int userType = Integer.parseInt(request.getParameter("user_type"));
            List<User> users = userService.getUsers(userType);

            if(users != null){

                JSONArray userArray = new JSONArray();

                for (User c : users) {
                    userArray.put(c.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "User Fetched Successfully");
                jsonResponse.put("data", userArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "User Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }


    private void getProfileInfo(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        int userId = Integer.parseInt(request.getParameter("userId"));

        User user = userService.getProfileInfo(userId);
        JSONObject jsonResponse = new JSONObject();

        if (user != null) {
            jsonResponse.put("status", "success");
            jsonResponse.put("data", user.toJson());

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Wrong Credentials!");
        }
        out.print(jsonResponse);
        out.flush();
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");

        if ("register".equals(action)) {
            registerUser(request, response);
        } else if ("login".equals(action)) {
            loginUser(request, response);
        } else if ("confirm_password".equals(action)) {
            confirmPassword(request, response);
        } else if ("update_profile".equals(action)) {
            updateProfile(request, response);
        } else if ("admin_update".equals(action)) {
            updateProfile(request, response);
        } else if ("admin_new".equals(action)) {
            registerUser(request, response);
        } else if ("change_user_status".equals(action)) {
            changeUserStatus(request, response);
        }
    }

    private void registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");
        User newUser;
        String userNameLabel = "";
        if("admin_new".equals(action)){
            newUser = new User(
                    1,
                    request.getParameter("new_admin_name"),
                    request.getParameter("new_admin_email"),
                    request.getParameter("new_admin_nic"),
                    request.getParameter("new_admin_address"),
                    request.getParameter("new_admin_phone"),
                    request.getParameter("admin_username"),
                    request.getParameter("admin_password")
            );
            userNameLabel = "New Admin ";
        }else{
            newUser = new User(
                    2,
                    request.getParameter("name"),
                    request.getParameter("email"),
                    request.getParameter("nic"),
                    request.getParameter("address"),
                    request.getParameter("phone"),
                    request.getParameter("uname"),
                    request.getParameter("pass")
            );
        }


        boolean isRegistered = userService.register(newUser);

        JSONObject jsonResponse = new JSONObject();

        if (isRegistered) {

            jsonResponse.put("status", "success");
            jsonResponse.put("message", userNameLabel + "Registration Successful!");

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", userNameLabel + "Registration Failed!");
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
            }else if(user.getUserType() == 2){
                session.setAttribute("userId", user.getId());
            }else if(user.getUserType() == 0){
                session.setAttribute("superAdminId", user.getId());
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

    private void confirmPassword(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        int userId = Integer.parseInt(request.getParameter("u_id"));
        String password = request.getParameter("confirm_password");

        boolean isConfirm = userService.confirmPassword(userId, password);

        if (isConfirm) {

            jsonResponse.put("status", "success");
            jsonResponse.put("message", "Password Confirmed");

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Wrong Current Password!");
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void changeUserStatus(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        int userId = Integer.parseInt(request.getParameter("statusUserId"));
        int status = Integer.parseInt(request.getParameter("status"));
        status = (status == 0) ? 1 : 0;

        boolean isChanged = userService.changeUserStatus(userId, status);

        if (isChanged) {
            jsonResponse.put("status", "success");
            jsonResponse.put("message", "Status Changed Successfully!");

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Status Changed Failed!!");
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateProfile(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        String action = request.getParameter("action");
        User user;
        String userNameLabel = "";
        if("admin_update".equals(action)){
             user = new User(
                    Integer.parseInt(request.getParameter("adminId")),
                    request.getParameter("update_admin_name"),
                    request.getParameter("update_admin_email"),
                    request.getParameter("update_admin_nic"),
                    request.getParameter("update_admin_address"),
                    request.getParameter("update_admin_phone"),
                    request.getParameter("update_admin_username")
            );
            user.setPassword(request.getParameter("update_admin_password"));
            userNameLabel = "Admin ";
        }else{
             user = new User(
                    Integer.parseInt(request.getParameter("userId")),
                    request.getParameter("name"),
                    request.getParameter("email"),
                    request.getParameter("nic"),
                    request.getParameter("address"),
                    request.getParameter("phone"),
                    request.getParameter("username")
            );
            user.setPassword(request.getParameter("new_password"));
        }


        boolean isUpdated = userService.updateProfile(user);

        if (isUpdated) {
            jsonResponse.put("status", "success");
            jsonResponse.put("message", userNameLabel + "Profile Updated Successful");

        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", userNameLabel + "Profile Updated Failed!");
        }
        out.print(jsonResponse);
        out.flush();
    }


}


