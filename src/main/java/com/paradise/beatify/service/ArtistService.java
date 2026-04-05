package com.paradise.beatify.service;

import com.paradise.beatify.domain.Artist;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.ArtistResponse;
import com.paradise.beatify.dto.BandSummaryResponse;
import com.paradise.beatify.repository.ArtistRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final AlbumService albumService;

    public ArtistService(ArtistRepository artistRepository, AlbumService albumService) {
        this.artistRepository = artistRepository;
        this.albumService = albumService;
    }

    public ArtistResponse getById(Long id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Artist not found with id: " + id));

        Set<String> occupations = artist.getOccupations().stream()
                .map(Enum::name)
                .collect(Collectors.toSet());

        Set<String> instruments = artist.getInstruments().stream()
                .map(instrument -> instrument.getTitle())
                .collect(Collectors.toSet());

        BandSummaryResponse bandSummary = null;
        if (artist.getBand() != null) {
            bandSummary = new BandSummaryResponse(artist.getBand().getId(), artist.getBand().getTitle());
        }

        String nationality = artist.getNationality() != null ? artist.getNationality().getTitle() : null;

        List<AlbumSummaryResponse> albums = artist.getAlbums().stream()
                .map(albumService::mapToSummary)
                .toList();

        return new ArtistResponse(
                artist.getId(),
                artist.getFirstName(),
                artist.getLastName(),
                artist.getYearsActive(),
                nationality,
                artist.isBandArtist(),
                occupations,
                instruments,
                bandSummary,
                albums
        );
    }
}
