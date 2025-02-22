package com.drivehub.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {
    public static String toMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(input.getBytes());
            byte[] digest = md.digest();

            // Convert byte array to Hex String
            StringBuilder hexString = new StringBuilder();
            for (byte b : digest) {
                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 Algorithm not found", e);
        }
    }
}
