package com.drivehub.controller;

import com.drivehub.model.StatusModel;
import com.drivehub.model.Vehicle;
import com.drivehub.model.VehicleTypes;
import com.drivehub.service.VehicleService;

import com.drivehub.util.FileSave;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


import java.io.IOException;
import java.io.PrintWriter;

import java.text.ParseException;
import java.util.List;

@WebServlet("/vehicle")
@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
public class VehicleController extends HttpServlet {

    private final VehicleService vehicleService = new VehicleService();

    public VehicleController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("vehicle_types".equals(action)) {
            getVehicleTypes( response);
        }else if ("all_vehicle_types".equals(action)) {
            getVehicleTypes( response);
        }else if ("vehicle_list".equals(action)) {
            getVehicleList(response);
        }
    }

    private void getVehicleTypes( HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            List<VehicleTypes> vehicleTypes = vehicleService.getVehicleTypes();

            if(vehicleTypes != null){

                JSONArray vehicleTypesArray = new JSONArray();

                for (VehicleTypes vt : vehicleTypes) {
                    vehicleTypesArray.put(vt.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Types Fetched");
                jsonResponse.put("data", vehicleTypesArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Types Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getVehicleList(HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();
        try {
            List<Vehicle> vehicles = vehicleService.getVehicles();

            if(vehicles != null){

                JSONArray vehicleArray = new JSONArray();

                for (Vehicle v : vehicles) {
                    vehicleArray.put(v.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Fetched Successfully");
                jsonResponse.put("data", vehicleArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Types Fetched Failed!");
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
            if ("vehicle_new".equals(action)) {
                addNewVehicle(request, response);
            } else if ("vehicle_update".equals(action)) {
                updateVehicle(request, response);
            } else if ("vehicle_delete".equals(action)) {
                deleteVehicle(request, response);
            } else if ("vehicle_type_new".equals(action)) {
                addNewVehicleType(request, response);
            } else if ("vehicle_type_update".equals(action)) {
                updateVehicleType(request, response);
            } else if ("vehicle_type_delete".equals(action)) {
                deleteVehicleType(request, response);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private void addNewVehicle(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            StatusModel result = FileSave.saveFile(request.getPart("v_image"), getRealPath(), "uploads");

            if(result.isSuccess()){
                String imageFileName = result.getData();

                Vehicle newVehicle = new Vehicle(
                        Integer.parseInt(request.getParameter("v_type")),
                        Integer.parseInt(request.getParameter("driver")),
                        request.getParameter("v_name"),
                        request.getParameter("v_number"),
                        Integer.parseInt(request.getParameter("seat_count")),
                        imageFileName,
                        request.getParameter("v_description")
                );

                boolean isRegistered = vehicleService.addNewVehicle(newVehicle);

                if (isRegistered) {
                    jsonResponse.put("status", "success");
                    jsonResponse.put("message", "New Vehicle Added Successful!");

                } else {
                    jsonResponse.put("status", "error");
                    jsonResponse.put("message", "New Vehicle Adding Failed!");
                }
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", result.getMessage());
            }

        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateVehicle(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            String imageName = request.getParameter("old_v_image");
            Part filePart = request.getPart("update_v_image");

            if (filePart != null && filePart.getSize() > 0){
                StatusModel result = FileSave.saveFile(request.getPart("update_v_image"), getRealPath(), "uploads");
                if(result.isSuccess()){
                    imageName = result.getData();
                    StatusModel result1 = FileSave.deleteFile(request.getParameter("old_v_image"), getRealPath(), "uploads");

                    if(!result1.isSuccess()){
                        System.out.println(result1.getMessage());
                    }
                }
            }

            Vehicle vehicle = new Vehicle(
                    Integer.parseInt(request.getParameter("vehicle_id")),
                    Integer.parseInt(request.getParameter("update_v_type")),
                    Integer.parseInt(request.getParameter("update_driver")),
                    Integer.parseInt(request.getParameter("old_driver_id")),
                    request.getParameter("update_v_name"),
                    request.getParameter("update_v_number"),
                    Integer.parseInt(request.getParameter("update_seat_count")),
                    imageName,
                    request.getParameter("update_v_description")
            );

            boolean isRegistered = vehicleService.updateVehicle(vehicle);

            if (isRegistered) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void deleteVehicle(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            Vehicle vehicle = new Vehicle();
            vehicle.setId(Integer.parseInt(request.getParameter("d_v_id")));
            vehicle.setDriverId(Integer.parseInt(request.getParameter("d_driver_id")));
            vehicle.setVehicleImage(request.getParameter("d_image_name"));

            boolean isDelete = vehicleService.deleteVehicle(vehicle);

            if (isDelete) {

                StatusModel result = FileSave.deleteFile(vehicle.getVehicleImage(), getRealPath(), "uploads");
                if(!result.isSuccess()){
                    System.out.println(result.getMessage());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Deleted Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Deleted Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void addNewVehicleType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            VehicleTypes newVehicleType = new VehicleTypes(
                    request.getParameter("new_v_type_name"),
                    Double.parseDouble(request.getParameter("new_per_one_day")),
                    Double.parseDouble(request.getParameter("new_discount_full_amount")),
                    Double.parseDouble(request.getParameter("new_discount_balance_amount")),
                    Double.parseDouble(request.getParameter("new_penalty_extra_km")),
                    Double.parseDouble(request.getParameter("new_maximum_km_per_day")),
                    Integer.parseInt(request.getParameter("new_discount_days"))
            );

            boolean isRegistered = vehicleService.addNewVehicleType(newVehicleType);

            if (isRegistered) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "New Vehicle Type Added Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "New Vehicle Type Adding Failed!");
            }


        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void updateVehicleType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{
            VehicleTypes vehicleType = new VehicleTypes(
                    Integer.parseInt(request.getParameter("update_vehicle_type_id")),
                    request.getParameter("update_v_type_name"),
                    Double.parseDouble(request.getParameter("update_per_one_day")),
                    Double.parseDouble(request.getParameter("update_discount_full_amount")),
                    Double.parseDouble(request.getParameter("update_discount_balance_amount")),
                    Double.parseDouble(request.getParameter("update_penalty_extra_km")),
                    Double.parseDouble(request.getParameter("update_maximum_km_per_day")),
                    Integer.parseInt(request.getParameter("update_discount_days"))
            );

            boolean isUpdated = vehicleService.updateVehicleType(vehicleType);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Type Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Type Updating Failed!");
            }


        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void deleteVehicleType(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            int typeId = Integer.parseInt(request.getParameter("delete_vehicle_type_id"));

            boolean isUpdated = vehicleService.deleteVehicleType(typeId);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Vehicle Type Deleted Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Vehicle Type Deleting Failed!");
            }


        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);
            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private String getRealPath(){
        return getServletContext().getRealPath("");
    }

}


