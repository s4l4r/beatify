package com.paradise.beatify.core.exceptions;

public class ServiceException extends Exception {

    private final String title;

    public ServiceException(String title) {

        this.title = title;
    }

    public ServiceException(String title, Exception exception) {

        super(exception);
        this.title = title;
    }

    public String getTitle() {

        return title;
    }
}
