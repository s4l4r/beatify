package com.paradise.beatify.dto;

public record AlbumSummaryResponse(Long id, String title, int year, String albumArtURL, boolean bandAlbum,
                                   String artistName, Long artistId, boolean isBand) {
}
