package com.paradise.beatify.dto;

public record PlaylistSummaryResponse(Long id, String title, String icon, boolean isPublic,
                                      String ownerName, int songCount, boolean isOwner, boolean isSaved) {
}
