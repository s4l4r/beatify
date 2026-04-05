package com.paradise.beatify.dto;

public record RegisterRequest(String email, String password, String firstName, String lastName,
                              String phoneNumber, String nationality) {
}
