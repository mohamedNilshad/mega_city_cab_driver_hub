package com.drivehub.controller;

import com.drivehub.model.Company;
import com.drivehub.model.HelpDocument;
import com.drivehub.model.StatusModel;
import com.drivehub.service.CompanyService;
import com.drivehub.util.FileSave;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/company")
@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
public class CompanyController extends HttpServlet {

    private final CompanyService companyService = new CompanyService();
    public CompanyController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("get_company_profile".equals(action)) {
            getCompanyProfile(request, response);
        }else if ("help_list".equals(action)) {
            getHelpList(response);
        }
    }

    private void getCompanyProfile(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        int companyId = Integer.parseInt(request.getParameter("companyId"));
        try {
            Company companyProfile = companyService.getCompanyProfile(companyId);

            if(companyProfile != null){

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Company Profile Fetched");
                jsonResponse.put("data", companyProfile.toJson());
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Company Profile Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void getHelpList(HttpServletResponse response) throws IOException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        JSONObject jsonResponse = new JSONObject();

        try {
            List<HelpDocument> helpDocuments = companyService.getHelpList();

            if(helpDocuments != null){

                JSONArray helpArray = new JSONArray();

                for (HelpDocument h : helpDocuments) {
                    helpArray.put(h.toJson());
                }

                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Helps Fetched Successfully");
                jsonResponse.put("data", helpArray);
            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Helps Fetched Failed!");
            }
        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String action = request.getParameter("action");
        if ("help_new".equals(action)) {
            addNewHelp(request, response);
        }else if("help_update".equals(action)) {
            updateHelp(request, response);
        }else if("help_delete".equals(action)) {
            deleteHelp(request, response);
        }
    }

    private void addNewHelp(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try {
            StatusModel result = FileSave.saveFile(request.getPart("h_image"), getRealPath(), "uploads/help");

            if(result.isSuccess()){
                String imageFileName = result.getData();
                HelpDocument helpDocument = new HelpDocument(
                        request.getParameter("h_title"),
                        request.getParameter("h_description"),
                        imageFileName
                );

                Boolean isAdded = companyService.addNewHelp(helpDocument);

                if(isAdded){
                    jsonResponse.put("status", "success");
                    jsonResponse.put("message", "New Help Added Successfully!");
                }else{
                    jsonResponse.put("status", "error");
                    jsonResponse.put("message", "New Help Adding Failed!");
                }

            }else{
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "New Help Adding Failed!");
            }

        } catch (JSONException e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }

        out.print(jsonResponse);
        out.flush();
    }

    private void updateHelp(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            String imageName = request.getParameter("old_h_image");
            Part filePart = request.getPart("update_h_image");

            if (filePart != null && filePart.getSize() > 0){
                StatusModel result = FileSave.saveFile(request.getPart("update_h_image"), getRealPath(), "uploads/help");
                if(result.isSuccess()){
                    imageName = result.getData();
                    StatusModel result1 = FileSave.deleteFile(request.getParameter("old_h_image"), getRealPath(), "uploads/help");

                    if(!result1.isSuccess()){
                        System.out.println(result1.getMessage());
                    }
                }
            }

            HelpDocument helpDocument = new HelpDocument(
                    Integer.parseInt(request.getParameter("help_id")),
                    request.getParameter("update_h_title"),
                    request.getParameter("update_h_description"),
                    imageName
            );

            boolean isUpdated = companyService.updateHelp(helpDocument);

            if (isUpdated) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Help Updated Successful!");

            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Help Updated Failed!");
            }
        } catch (Exception e) {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", e);

            throw new RuntimeException(e);
        }
        out.print(jsonResponse);
        out.flush();
    }

    private void deleteHelp(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();

        try{

            int helpId = Integer.parseInt(request.getParameter("h_id"));
            String imageName = request.getParameter("h_image_name");


            boolean isDelete = companyService.deleteHelp(helpId);

            if (isDelete) {

                StatusModel result = FileSave.deleteFile(imageName, getRealPath(), "uploads/help");
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


    private String getRealPath(){
        return getServletContext().getRealPath("");
    }


}


