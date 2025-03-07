package com.drivehub.service;
import com.drivehub.dao.CompanyDAO;
import com.drivehub.model.Company;
import com.drivehub.model.HelpDocument;

import java.util.List;

public class CompanyService {

    private final CompanyDAO companyDAO = new CompanyDAO();

    public Company getCompanyProfile(int companyId) {
        return companyDAO.getCompanyProfile(companyId);
    }

    public List<HelpDocument> getHelpList() {
        return companyDAO.getHelpList();
    }

    public Boolean addNewHelp(HelpDocument helpDocument) {
        return companyDAO.addNewHelp(helpDocument);
    }

    public Boolean deleteHelp(int helpId) {
        return companyDAO.deleteHelp(helpId);
    }
    public Boolean updateHelp(HelpDocument helpDocument) {
        return companyDAO.updateHelp(helpDocument);
    }
}
