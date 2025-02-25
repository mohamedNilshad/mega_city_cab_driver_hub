package com.drivehub.service;
import com.drivehub.dao.VehicleDAO;
import com.drivehub.model.Vehicle;
import com.drivehub.model.VehicleTypes;

import java.util.List;

public class VehicleService {

    private final VehicleDAO vehicleDAO = new VehicleDAO();

    public Boolean addNewVehicle(Vehicle newVehicle) {
        return vehicleDAO.addNewVehicle(newVehicle);
    }

    public Boolean updateVehicle(Vehicle vehicle) {
        return vehicleDAO.updateVehicle(vehicle);
    }

    public Boolean deleteVehicle(Vehicle vehicle) {
        return vehicleDAO.deleteVehicle(vehicle);
    }

    public List<VehicleTypes> getVehicleTypes() {
        return vehicleDAO.getVehicleTypes();
    }

    public List<Vehicle> getVehicles() {
        return vehicleDAO.getVehicle();
    }
}
