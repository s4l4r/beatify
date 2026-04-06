package com.paradise.beatify.controller;

import com.paradise.beatify.dto.CreatePlaylistRequest;
import com.paradise.beatify.dto.PlaylistResponse;
import com.paradise.beatify.dto.PlaylistSummaryResponse;
import com.paradise.beatify.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
    public ResponseEntity<List<PlaylistSummaryResponse>> getUserLibrary(
            @AuthenticationPrincipal OAuth2User oauth2User) {
        List<PlaylistSummaryResponse> library = playlistService.getUserLibrary(oauth2User.getAttribute("email"));
        return ResponseEntity.ok(library);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaylistResponse> getPlaylistDetail(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        PlaylistResponse playlist = playlistService.getPlaylistDetail(id, oauth2User.getAttribute("email"));
        return ResponseEntity.ok(playlist);
    }

    @PostMapping
    public ResponseEntity<PlaylistResponse> createPlaylist(
            @AuthenticationPrincipal OAuth2User oauth2User,
            @RequestBody CreatePlaylistRequest request) {
        PlaylistResponse playlist = playlistService.createPlaylist(oauth2User.getAttribute("email"), request);
        return ResponseEntity.ok(playlist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaylistResponse> updatePlaylist(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User oauth2User,
            @RequestBody CreatePlaylistRequest request) {
        PlaylistResponse playlist = playlistService.updatePlaylist(id, oauth2User.getAttribute("email"), request);
        return ResponseEntity.ok(playlist);
    }

    @PutMapping("/{id}/songs/{songId}")
    public ResponseEntity<PlaylistResponse> addSong(
            @PathVariable Long id,
            @PathVariable Long songId,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        PlaylistResponse playlist = playlistService.addSong(id, songId, oauth2User.getAttribute("email"));
        return ResponseEntity.ok(playlist);
    }

    @DeleteMapping("/{id}/songs/{songId}")
    public ResponseEntity<Void> removeSong(
            @PathVariable Long id,
            @PathVariable Long songId,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.removeSong(id, songId, oauth2User.getAttribute("email"));
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.deletePlaylist(id, oauth2User.getAttribute("email"));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/save")
    public ResponseEntity<Void> savePlaylist(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.savePlaylist(id, oauth2User.getAttribute("email"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/save")
    public ResponseEntity<Void> unsavePlaylist(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.unsavePlaylist(id, oauth2User.getAttribute("email"));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/favorites/ids")
    public ResponseEntity<List<Long>> getFavoriteIds(
            @AuthenticationPrincipal OAuth2User oauth2User) {
        List<Long> ids = playlistService.getFavoriteIds(oauth2User.getAttribute("email"));
        return ResponseEntity.ok(ids);
    }

    @GetMapping("/favorites")
    public ResponseEntity<PlaylistResponse> getFavoritesDetail(
            @AuthenticationPrincipal OAuth2User oauth2User) {
        PlaylistResponse playlist = playlistService.getFavoritesDetail(oauth2User.getAttribute("email"));
        return ResponseEntity.ok(playlist);
    }

    @PutMapping("/favorites/{songId}")
    public ResponseEntity<Void> addFavorite(
            @PathVariable Long songId,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.addFavorite(songId, oauth2User.getAttribute("email"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/favorites/{songId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long songId,
            @AuthenticationPrincipal OAuth2User oauth2User) {
        playlistService.removeFavorite(songId, oauth2User.getAttribute("email"));
        return ResponseEntity.noContent().build();
    }
}
