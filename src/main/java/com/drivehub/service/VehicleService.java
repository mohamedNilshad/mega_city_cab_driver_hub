package com.drivehub.service;
import com.drivehub.dao.VehicleDAO;
import com.drivehub.model.Vehicle;
import com.drivehub.model.VehicleTypes;

import java.sql.Timestamp;
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

    public List<Vehicle> getVehicles(Timestamp startDate, Timestamp endDate) {
        return vehicleDAO.getVehicles(startDate, endDate);
    }

    public List<Vehicle> getVehicles() {
        return vehicleDAO.getVehicle();
    }

    public Boolean addNewVehicleType(VehicleTypes newVehicleType) {
        return vehicleDAO.addNewVehicleType(newVehicleType);
    }

    public Boolean updateVehicleType(VehicleTypes vehicleType) {
        return vehicleDAO.updateVehicleType(vehicleType);
    }

    public Boolean deleteVehicleType(int typeId) {
        return vehicleDAO.deleteVehicleType(typeId);
    }

}
