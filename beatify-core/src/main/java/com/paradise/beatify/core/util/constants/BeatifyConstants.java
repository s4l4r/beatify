package com.paradise.beatify.core.util.constants;

public class BeatifyConstants {

    // Security Configuration
    public static final String WEB_USER_BY_USERNAME_QUERY = "SELECT U.USERNAME, U.PASSWORD, B.ACTIVE FROM USERS U INNER JOIN " +
            "ENTITIES B ON U.ID = B.ID  WHERE U.USERNAME = ?";
    public static final String WEB_AUTHORITIES_BY_USERNAME_QUERY = "SELECT A.USERNAME, A.ROLE FROM AUTHORITIES A WHERE A.USERNAME = ?";

    // Controllers Authentication Configuration
    public static final String WEB_AUTHENTICATED = "authenticated";
    public static final String WEB_PRINCIPAL = "principal";
    public static final String WEB_USER = "userDTO";

    // DB Configuration
    public static final String WEB_PERSISTENT_UNIT = "beatify-pu";
    public static final String WEB_DRIVER_CLASS_NAME = "com.mysql.cj.jdbc.Driver";
    public static final String WEB_DATABASE_URL = "jdbc:mysql://localhost:3306/beatify?useSSL=false";
    public static final String WEB_DATABASE_USERNAME = "root";
    public static final String WEB_DATABASE_PASSWORD = "mysql-root-password";

    // Servlet Configuration
    public static final String WEB_DISPATCHER_SERVLET_NAME = "dispatcherServlet";

    // Spring Context Configuration
    public static final String VIEW_RESOLVER_PREFIX ="/WEB-INF/jsp/";
    public static final String VIEW_RESOLVER_SUFFIX = ".jsp";
}
