package com.drivehub.controller;

import com.drivehub.model.Driver;
import com.drivehub.model.LicenseTypes;
import com.drivehub.service.DriverService;
import com.drivehub.util.Formats;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.List;

@WebServlet("/driver")
public class DriverController extends HttpServlet {

    private final DriverService driverService = new DriverService();
    public DriverController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("license_types".equals(action)) {
            getLicenseTypes(response);
        }else if ("driver_list".equals(action)) {
            getDriverList(response);
        }else if ("available_driver_list".equals(action)) {
            getAvailableDriverList(response);
        }
    }

    private void getLicenseTypes(HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            List<LicenseTypes> licenseTypes = driverService.getLicenseTypes();

            if(licenseTypes != null){

                JSONArray licenseTypesArray = new JSONArray();

                for (LicenseTypes lt : licenseTypes) {
                    licenseTypesArray.put(lt.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "License Types Fetched");
                jsonResponse.put("data", licenseTypesArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "License Types Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getDriverList(HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            List<Driver> drivers = driverService.getDrivers();

            if(drivers != null){

                JSONArray driversArray = new JSONArray();

                for (Driver d : drivers) {
                    driversArray.put(d.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Drivers Fetched Successfully");
                jsonResponse.put("data", driversArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Drivers Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getAvailableDriverList(HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            List<Driver> drivers = driverService.getAvailableDrivers();

            if(drivers != null){

                JSONArray driversArray = new JSONArray();

                for (Driver d : drivers) {
                    driversArray.put(d.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Successfully Fetched All Available Drivers");
                jsonResponse.put("data", driversArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Drivers Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String action = request.getParameter("action");
        try {
            if ("driver_new".equals(action)) {
                addNewDriver(request, response);
            } else if ("driver_update".equals(action)) {
                updateDriver(request, response);
            } else if ("update_license_type".equals(action)) {
                updateLicenseType(request, response);
            } else if ("new_license_type".equals(action)) {
                addNewLicenseType(request, response);
            } else if ("delete_license_type".equals(action)) {
                deleteLicenseType(request, response);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private void addNewDriver(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            Driver newDriver = new Driver(
                    request.getParameter("name"),
                    request.getParameter("driver_nic"),
                    request.getParameter("phone"),
                    request.getParameter("email"),
                    request.getParameter("address"),
                    Integer.parseInt(request.getParameter("license_type_id")),
                    Formats.dateFormat(request.getParameter("license_expire"))
            );

            boolean isRegistered = driverService.registerDriver(newDriver);

            if (isRegistered) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "New Driver Added Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Registration Failed!");
            }

        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateDriver(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            Driver driver = new Driver(
                    Integer.parseInt(request.getParameter("driver_id")),
                    request.getParameter("reg_num"),
                    request.getParameter("update_name"),
                    request.getParameter("update_driver_nic"),
                    request.getParameter("update_phone"),
                    request.getParameter("update_email"),
                    request.getParameter("update_address"),
                    Integer.parseInt(request.getParameter("update_license_type_id")),
                    Formats.dateFormat(request.getParameter("update_license_expire"))
            );

            boolean isRegistered = driverService.updateDriver(driver);

            if (isRegistered) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Driver Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateLicenseType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            LicenseTypes licenseType = new LicenseTypes(
                    Integer.parseInt(request.getParameter("licenseTypeId")),
                    request.getParameter("update_license_type")
            );

            boolean isUpdated = driverService.updateLicenseType(licenseType);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "License Type Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void deleteLicenseType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{


            int typeId = Integer.parseInt(request.getParameter("l_type_id"));


            boolean isUpdated = driverService.deleteLicenseType(typeId);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "License Type Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void addNewLicenseType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            LicenseTypes licenseType = new LicenseTypes(
                    request.getParameter("new_license_type")
            );

            boolean isUpdated = driverService.addNewLicenseType(licenseType);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "License Type Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

}


