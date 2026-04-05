package com.paradise.beatify.dto;

public record SongResponse(Long id, String title, String duration, String serverURL, AlbumSummaryResponse album) {
}
