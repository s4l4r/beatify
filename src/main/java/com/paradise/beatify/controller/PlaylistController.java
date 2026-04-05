package com.paradise.beatify.controller;

import com.paradise.beatify.dto.CreatePlaylistRequest;
import com.paradise.beatify.dto.PlaylistResponse;
import com.paradise.beatify.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping
    public ResponseEntity<List<PlaylistResponse>> getUserPlaylists(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<PlaylistResponse> playlists = playlistService.getUserPlaylists(userDetails.getUsername());
        return ResponseEntity.ok(playlists);
    }

    @PostMapping
    public ResponseEntity<PlaylistResponse> createPlaylist(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CreatePlaylistRequest request) {
        PlaylistResponse playlist = playlistService.createPlaylist(userDetails.getUsername(), request);
        return ResponseEntity.ok(playlist);
    }

    @PutMapping("/{id}/songs/{songId}")
    public ResponseEntity<PlaylistResponse> addSong(
            @PathVariable Long id,
            @PathVariable Long songId,
            @AuthenticationPrincipal UserDetails userDetails) {
        PlaylistResponse playlist = playlistService.addSong(id, songId, userDetails.getUsername());
        return ResponseEntity.ok(playlist);
    }

    @DeleteMapping("/{id}/songs/{songId}")
    public ResponseEntity<Void> removeSong(
            @PathVariable Long id,
            @PathVariable Long songId,
            @AuthenticationPrincipal UserDetails userDetails) {
        playlistService.removeSong(id, songId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        playlistService.deletePlaylist(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
