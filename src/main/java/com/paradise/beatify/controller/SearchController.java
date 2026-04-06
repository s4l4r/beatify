package com.paradise.beatify.controller;

import com.paradise.beatify.dto.SearchResponse;
import com.paradise.beatify.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<SearchResponse> search(
            @RequestParam String q,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        String email = oauth2User != null ? oauth2User.getAttribute("email") : null;
        SearchResponse response = searchService.search(q, email);
        return ResponseEntity.ok(response);
    }
}
