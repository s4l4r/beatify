package com.paradise.beatify.service;

import com.paradise.beatify.domain.Album;
import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumDetailResponse;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.SongResponse;
import com.paradise.beatify.repository.AlbumRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AlbumService {

    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Transactional
    public AlbumDetailResponse getById(Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Album not found with id: " + id));

        album.setPopularity(album.getPopularity() + 1);
        albumRepository.save(album);

        Set<String> genres = album.getGenres().stream()
                .map(genre -> genre.getTitle())
                .collect(Collectors.toSet());

        String artistName = getArtistName(album);
        Long artistId = getArtistId(album);
        boolean isBand = album.isBandAlbum();

        List<SongResponse> songs = album.getSongs().stream()
                .map(song -> mapToSongResponse(song))
                .toList();

        return new AlbumDetailResponse(
                album.getId(),
                album.getTitle(),
                album.getYear(),
                album.getAlbumArtURL(),
                album.getPopularity(),
                album.isBandAlbum(),
                genres,
                artistName,
                artistId,
                isBand,
                songs
        );
    }

    @Transactional
    public AlbumSummaryResponse increasePopularity(Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Album not found with id: " + id));
        album.setPopularity(album.getPopularity() + 1);
        albumRepository.save(album);
        return mapToSummary(album);
    }

    public long getOverallPopularity() {
        return albumRepository.getOverallPopularity();
    }

    public List<AlbumSummaryResponse> getRecentAlbums(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Album> albums = albumRepository.findAllByOrderByIdDesc(pageable);
        return albums.stream().map(this::mapToSummary).toList();
    }

    public List<AlbumSummaryResponse> getFeaturedAlbums(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return albumRepository.findAll(pageable).getContent().stream()
                .map(this::mapToSummary)
                .toList();
    }

    public AlbumSummaryResponse mapToSummary(Album album) {
        String artistName = getArtistName(album);
        Long artistId = getArtistId(album);
        boolean isBand = album.isBandAlbum();

        return new AlbumSummaryResponse(
                album.getId(),
                album.getTitle(),
                album.getYear(),
                album.getAlbumArtURL(),
                album.isBandAlbum(),
                artistName,
                artistId,
                isBand
        );
    }

    private SongResponse mapToSongResponse(Song song) {
        AlbumSummaryResponse albumSummary = mapToSummary(song.getAlbum());
        return new SongResponse(
                song.getId(),
                song.getTitle(),
                song.getDuration(),
                song.getServerURL(),
                albumSummary
        );
    }

    private String getArtistName(Album album) {
        if (album.isBandAlbum() && album.getBand() != null) {
            return album.getBand().getTitle();
        } else if (album.getArtist() != null) {
            return album.getArtist().getFirstName() + " " + album.getArtist().getLastName();
        }
        return "";
    }

    private Long getArtistId(Album album) {
        if (album.isBandAlbum() && album.getBand() != null) {
            return album.getBand().getId();
        } else if (album.getArtist() != null) {
            return album.getArtist().getId();
        }
        return null;
    }
}
