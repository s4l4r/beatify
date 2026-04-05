package com.paradise.beatify.controller;

import com.paradise.beatify.dto.AlbumDetailResponse;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.service.AlbumService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/featured")
    public ResponseEntity<List<AlbumSummaryResponse>> getFeaturedAlbums(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        List<AlbumSummaryResponse> albums = albumService.getFeaturedAlbums(page, size);
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<AlbumSummaryResponse>> getRecentAlbums(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        List<AlbumSummaryResponse> albums = albumService.getRecentAlbums(page, size);
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumDetailResponse> getAlbum(@PathVariable Long id) {
        AlbumDetailResponse album = albumService.getById(id);
        return ResponseEntity.ok(album);
    }
}
