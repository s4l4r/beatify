package com.paradise.beatify.controller;

import com.paradise.beatify.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal OAuth2User oauth2User) {
        return ResponseEntity.ok(new UserResponse(
                oauth2User.getAttribute("given_name"),
                oauth2User.getAttribute("family_name"),
                oauth2User.getAttribute("email")
        ));
    }
}
