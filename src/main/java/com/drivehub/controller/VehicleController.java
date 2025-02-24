package com.drivehub.controller;

import com.drivehub.model.Vehicle;
import com.drivehub.model.VehicleTypes;
import com.drivehub.service.VehicleService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
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
            String imageFileName = saveFile(request.getPart("v_image"), "uploads");
//            // Get uploaded file
//            Part filePart = request.getPart("v_image");
//            String imageFileName = filePart.getSubmittedFileName();
//
//            // Define upload directory
//            String uploadDir = getServletContext().getRealPath("") + File.separator + "uploads";
//            File uploadFolder = new File(uploadDir);
//            if (!uploadFolder.exists()) {
//                uploadFolder.mkdir(); // Create folder if not exists
//            }
//
//            // Save file to server
//            File file = new File(uploadFolder, imageFileName);
//            try (InputStream fileContent = filePart.getInputStream()) {
//                Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
//            }

            Vehicle newVehicle = new Vehicle(
                    Integer.parseInt(request.getParameter("v_type")),
                    Integer.parseInt(request.getParameter("driver")),
                    request.getParameter("v_name"),
                    request.getParameter("v_number"),
                    Integer.parseInt(request.getParameter("seat_count")),
                    imageFileName
            );


            boolean isRegistered = vehicleService.addNewVehicle(newVehicle);

            if (isRegistered) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "New Vehicle Added Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "New Vehicle Adding Failed!");
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
            if(request.getPart("update_v_image") != null){
                imageName = saveFile(request.getPart("update_v_image"), "uploads");
                deleteFile(request.getParameter("old_v_image"),"uploads");
            }

            Vehicle vehicle = new Vehicle(
                    Integer.parseInt(request.getParameter("vehicle_id")),
                    Integer.parseInt(request.getParameter("update_v_type")),
                    Integer.parseInt(request.getParameter("update_driver")),
                    request.getParameter("update_v_name"),
                    request.getParameter("update_v_number"),
                    Integer.parseInt(request.getParameter("update_seat_count")),
                    imageName
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

    private String saveFile(Part filePart, String folderName){
        try {
            // Get uploaded file
            String fileName = filePart.getSubmittedFileName();

            // Define upload directory
            String uploadDir = getServletContext().getRealPath("") + File.separator + folderName;
            File uploadFolder = new File(uploadDir);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdir(); // Create folder if not exists
            }

            // Save file to server
            File file = new File(uploadFolder, fileName);
            try (InputStream fileContent = filePart.getInputStream()) {
                Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }catch (Exception e) {
                return e.toString();
            }
            return fileName;
        } catch (RuntimeException e) {

            return e.toString();
        }

    }

    private String deleteFile(String fileName, String folderName){
        try {
            // Define upload directory path
            String uploadDir = getServletContext().getRealPath("") + File.separator + folderName;

            // Locate the file
            File fileToDelete = new File(uploadDir, fileName);

            // Check if file exists and delete it
            if (fileToDelete.exists()) {
                if (fileToDelete.delete()) {
                    System.out.println("File deleted successfully: " + fileName);
                } else {
                    System.out.println("Failed to delete file: " + fileName);
                }
            } else {
                System.out.println("File not found: " + fileName);
            }

            return fileName;
        } catch (RuntimeException e) {

            return e.toString();
        }

    }

}


