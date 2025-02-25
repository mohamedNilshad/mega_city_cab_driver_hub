package com.drivehub.util;

import com.drivehub.model.StatusModel;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Random;

@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
public class FileSave {

    public static StatusModel saveFile(Part filePart, String realPath, String folderName){
        try {
            // Get uploaded file
            String originalFileName = filePart.getSubmittedFileName();

            // Generate a new unique file name (e.g., using timestamp + original extension)
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            Random random = new Random();
            String randomNumber = String.format("%04d", random.nextInt(10000));

            String newFileName = randomNumber + System.currentTimeMillis() + fileExtension;

            // Define upload directory
            String uploadDir = realPath + File.separator + folderName;
            File uploadFolder = new File(uploadDir);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdir(); // Create folder if not exists
            }

            // Save file to server
            File file = new File(uploadFolder, newFileName);
            try (InputStream fileContent = filePart.getInputStream()) {
                Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }catch (Exception e) {
                return new StatusModel(false, "File move Error", e.toString());
            }
            return new StatusModel(true, "File saved Successful", newFileName);
        } catch (RuntimeException e) {
            return new StatusModel(false, "File saving Error", e.toString());
        }

    }

    public static StatusModel deleteFile(String fileName, String realPath, String folderName){
        try {
            // Define upload directory path
            String uploadDir = realPath + File.separator + folderName;

            // Locate the file
            File fileToDelete = new File(uploadDir, fileName);

            // Check if file exists and delete it
            if (fileToDelete.exists()) {
                if (fileToDelete.delete()) {
                    return new StatusModel(true, "File deleted successfully: " + fileName, "");
                } else {
                    return new StatusModel(false, "Failed to delete file: " + fileName, "");
                }
            } else {
                return new StatusModel(false, "File not found: " + fileName, "");
            }
        } catch (RuntimeException e) {
            return new StatusModel(false, "File Delete Error", e.toString());
        }

    }
}
