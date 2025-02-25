package com.drivehub.service;
import com.drivehub.dao.UserDAO;
import com.drivehub.model.User;

public class UserService {

    private final UserDAO userDAO = new UserDAO();

    public User getProfileInfo(int userId) {
        return userDAO.getProfileInfo(userId);
    }

    public Boolean confirmPassword(int userId, String password) {
        return userDAO.confirmPassword(userId, password);
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
