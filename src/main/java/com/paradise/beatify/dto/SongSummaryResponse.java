package com.paradise.beatify.dto;

public record SongSummaryResponse(Long id, String title, String duration, String serverURL,
                                  String albumTitle, Long albumId, String albumArtURL, String artistName) {
}
