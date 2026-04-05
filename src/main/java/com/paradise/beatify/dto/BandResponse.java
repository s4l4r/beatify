package com.paradise.beatify.dto;

import java.util.List;
import java.util.Set;

public record BandResponse(Long id, String title, String yearsActive, String nationality, Set<String> genres,
                           List<ArtistSummaryResponse> members, List<AlbumSummaryResponse> albums) {
}
