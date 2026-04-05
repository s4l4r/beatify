package com.paradise.beatify.dto;

import java.util.List;
import java.util.Set;

public record AlbumDetailResponse(Long id, String title, int year, String albumArtURL, long popularity,
                                  boolean bandAlbum, Set<String> genres, String artistName, Long artistId,
                                  boolean isBand, List<SongResponse> songs) {
}
