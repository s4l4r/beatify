package com.paradise.beatify.dto;

import java.util.List;

public record PlaylistResponse(Long id, String title, List<SongResponse> songs) {
}
