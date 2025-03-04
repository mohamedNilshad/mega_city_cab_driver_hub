package com.drivehub.service;
import com.drivehub.dao.CompanyDAO;
import com.drivehub.model.Company;

public class CompanyService {

    private final CompanyDAO companyDAO = new CompanyDAO();

    public Company getCompanyProfile(int companyId) {
        return companyDAO.getCompanyProfile(companyId);
    }
}
