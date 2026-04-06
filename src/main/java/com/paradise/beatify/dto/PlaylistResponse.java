package com.paradise.beatify.dto;

import java.util.List;

public record PlaylistResponse(Long id, String title, String icon, boolean isPublic,
                               String ownerName, int songCount, List<SongResponse> songs,
                               boolean isOwner, boolean isSaved) {
}
