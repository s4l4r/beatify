package com.paradise.beatify.domain.enums;

public enum Country {
    Iran("Iran"),
    UK("United Kingdom"),
    US("United States");

    private final String title;

    Country(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
