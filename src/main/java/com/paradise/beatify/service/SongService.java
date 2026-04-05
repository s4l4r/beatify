package com.paradise.beatify.service;

import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.SongResponse;
import com.paradise.beatify.repository.SongRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final AlbumService albumService;

    public SongService(SongRepository songRepository, AlbumService albumService) {
        this.songRepository = songRepository;
        this.albumService = albumService;
    }

    public SongResponse getById(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Song not found with id: " + id));

        AlbumSummaryResponse albumSummary = null;
        if (song.getAlbum() != null) {
            albumSummary = albumService.mapToSummary(song.getAlbum());
        }

        return new SongResponse(
                song.getId(),
                song.getTitle(),
                song.getDuration(),
                song.getServerURL(),
                albumSummary
        );
    }
}
