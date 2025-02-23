package com.drivehub.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class Formats {
    public static Date dateFormat(String input) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = formatter.parse(input);
        return new Date(utilDate.getTime());
    }
}
