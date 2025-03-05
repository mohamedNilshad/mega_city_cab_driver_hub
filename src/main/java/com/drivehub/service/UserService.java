package com.drivehub.service;
import com.drivehub.dao.UserDAO;
import com.drivehub.model.User;

import java.util.List;

public class UserService {

    private final UserDAO userDAO = new UserDAO();

    public User getProfileInfo(int userId) {
        return userDAO.getProfileInfo(userId);
    }

    public Boolean checkUsername(String username) {
        return userDAO.checkUsername(username);
    }

    public List<User> getUsers(int userType) {
        return userDAO.getUsers(userType);
    }

    public Boolean confirmPassword(int userId, String password) {
        return userDAO.confirmPassword(userId, password);
    }

    public Boolean changeUserStatus(int userId, int status) {
        return userDAO.changeUserStatus(userId, status);
    }

    public Boolean updateProfile(User user) {
        return userDAO.updateProfile(user);
    }

    public User login(String uname, String uPassword) {
        return userDAO.login(uname, uPassword);
    }

    public Boolean register(User newUser) {
        return userDAO.register(newUser);
    }
}
