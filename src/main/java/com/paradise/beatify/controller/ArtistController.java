package com.paradise.beatify.controller;

import com.paradise.beatify.dto.ArtistResponse;
import com.paradise.beatify.service.ArtistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtistResponse> getArtist(@PathVariable Long id) {
        ArtistResponse artist = artistService.getById(id);
        return ResponseEntity.ok(artist);
    }
}
