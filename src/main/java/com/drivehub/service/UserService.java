package com.drivehub.service;
import com.drivehub.dao.UserDAO;
import com.drivehub.model.User;

public class UserService {

    private final UserDAO userDAO = new UserDAO();

    public User login(String uname, String uPassword) {
        return userDAO.login(uname, uPassword);
    }

    public Boolean register(User newUser) {
        return userDAO.register(newUser);
    }
}
