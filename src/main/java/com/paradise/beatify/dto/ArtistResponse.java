package com.paradise.beatify.dto;

import java.util.List;
import java.util.Set;

public record ArtistResponse(Long id, String firstName, String lastName, String yearsActive, String nationality,
                             boolean bandArtist, Set<String> occupations, Set<String> instruments,
                             BandSummaryResponse band, List<AlbumSummaryResponse> albums) {
}
