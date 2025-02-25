package com.drivehub.model;

public class StatusModel {
    private boolean success;
    private String message;
    private String data;

    public StatusModel(boolean success, String message, String data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getData() {
        return data;
    }
}
