package com.drivehub.controller;

import com.drivehub.model.Company;
import com.drivehub.service.CompanyService;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/company")
public class CompanyController extends HttpServlet {

    private final CompanyService companyService = new CompanyService();
    public CompanyController() {super();}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        if ("get_company_profile".equals(action)) {
            getCompanyProfile(request, response);
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

    protected void doPost(HttpServletRequest request, HttpServletResponse response){

    }

}


