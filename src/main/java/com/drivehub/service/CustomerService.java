package com.drivehub.service;
import com.drivehub.dao.CustomerDAO;
import com.drivehub.model.User;

import java.util.List;

public class CustomerService {

    private final CustomerDAO customerDAO = new CustomerDAO();

    public Boolean addNewCustomer(User newUser) {
        return customerDAO.addNewCustomer(newUser);
    }

    public Boolean updateCustomer(User customer) {
        return customerDAO.updateCustomer(customer);
    }

    public List<User> getCustomers() {
        return customerDAO.getCustomers();
    }
}
