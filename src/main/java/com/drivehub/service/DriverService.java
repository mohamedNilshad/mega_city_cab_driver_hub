package com.drivehub.service;
import com.drivehub.dao.DriverDAO;
import com.drivehub.model.Driver;
import com.drivehub.model.LicenseTypes;

import java.util.List;

public class DriverService {

    private final DriverDAO driverDAO = new DriverDAO();

    public Boolean registerDriver(Driver newDriver) {
        return driverDAO.registerDriver(newDriver);
    }

    public Boolean updateDriver(Driver driver) {
        return driverDAO.updateDriver(driver);
    }

    public Boolean updateLicenseType(LicenseTypes licenseType) {
        return driverDAO.updateLicenseType(licenseType);
    }

    public Boolean deleteLicenseType(int typeId) {
        return driverDAO.deleteLicenseType(typeId);
    }

    public Boolean addNewLicenseType(LicenseTypes licenseType) {
        return driverDAO.addNewLicenseType(licenseType);
    }

    public List<LicenseTypes> getLicenseTypes() {
        return driverDAO.getLicenseTypes();
    }

    public List<Driver> getDrivers() {
        return driverDAO.getDrivers();
    }

    public List<Driver> getAvailableDrivers() {
        return driverDAO.getAvailableDrivers();
    }
}
