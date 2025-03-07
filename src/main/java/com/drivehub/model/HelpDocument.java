package com.drivehub.model;

import java.util.HashMap;
import java.util.Map;

public class HelpDocument {

    private int id;
    private String helpTitle;
    private String helpDescription;
    private String helpImage;

    //select, update
    public HelpDocument(int id, String helpTitle, String helpDescription, String helpImage) {
        this.id = id;
        this.helpTitle = helpTitle;
        this.helpDescription = helpDescription;
        this.helpImage = helpImage;
    }

    //insert
    public HelpDocument(String helpTitle, String helpDescription, String helpImage) {
        this.helpTitle = helpTitle;
        this.helpDescription = helpDescription;
        this.helpImage = helpImage;
    }

    public HelpDocument() {}

    //Getter


    public int getId() {
        return id;
    }

    public String getHelpTitle() {
        return helpTitle;
    }

    public String getHelpDescription() {
        return helpDescription;
    }

    public String getHelpImage() {
        return helpImage;
    }

    public Map<String, Object> toJson() {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("id", id);
        jsonMap.put("helpTitle", helpTitle);
        jsonMap.put("helpDescription", helpDescription);
        jsonMap.put("helpImage", helpImage);
        return jsonMap;
    }

}
