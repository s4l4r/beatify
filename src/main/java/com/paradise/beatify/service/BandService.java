package com.paradise.beatify.service;

import com.paradise.beatify.domain.Band;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.ArtistSummaryResponse;
import com.paradise.beatify.dto.BandResponse;
import com.paradise.beatify.repository.BandRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BandService {

    private final BandRepository bandRepository;
    private final AlbumService albumService;

    public BandService(BandRepository bandRepository, AlbumService albumService) {
        this.bandRepository = bandRepository;
        this.albumService = albumService;
    }

    public BandResponse getById(Long id) {
        Band band = bandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Band not found with id: " + id));

        Set<String> genres = band.getGenres().stream()
                .map(genre -> genre.getTitle())
                .collect(Collectors.toSet());

        String nationality = band.getNationality() != null ? band.getNationality().getTitle() : null;

        List<ArtistSummaryResponse> members = band.getArtists().stream()
                .map(artist -> new ArtistSummaryResponse(artist.getId(), artist.getFirstName(), artist.getLastName()))
                .toList();

        List<AlbumSummaryResponse> albums = band.getAlbums().stream()
                .map(albumService::mapToSummary)
                .toList();

        return new BandResponse(
                band.getId(),
                band.getTitle(),
                band.getYearsActive(),
                nationality,
                genres,
                members,
                albums
        );
    }
}
