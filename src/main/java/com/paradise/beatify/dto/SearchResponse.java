package com.paradise.beatify.dto;

import java.util.List;

public record SearchResponse(List<AlbumSummaryResponse> albums, List<ArtistSummaryResponse> artists,
                             List<BandSummaryResponse> bands, List<SongSummaryResponse> songs) {
}
