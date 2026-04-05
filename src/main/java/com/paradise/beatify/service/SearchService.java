package com.paradise.beatify.service;

import com.paradise.beatify.domain.Album;
import com.paradise.beatify.domain.Artist;
import com.paradise.beatify.domain.Band;
import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.ArtistSummaryResponse;
import com.paradise.beatify.dto.BandSummaryResponse;
import com.paradise.beatify.dto.SearchResponse;
import com.paradise.beatify.dto.SongSummaryResponse;
import com.paradise.beatify.repository.AlbumRepository;
import com.paradise.beatify.repository.ArtistRepository;
import com.paradise.beatify.repository.BandRepository;
import com.paradise.beatify.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final AlbumRepository albumRepository;
    private final ArtistRepository artistRepository;
    private final BandRepository bandRepository;
    private final SongRepository songRepository;
    private final AlbumService albumService;

    public SearchService(AlbumRepository albumRepository, ArtistRepository artistRepository,
                         BandRepository bandRepository, SongRepository songRepository,
                         AlbumService albumService) {
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
        this.bandRepository = bandRepository;
        this.songRepository = songRepository;
        this.albumService = albumService;
    }

    public SearchResponse search(String query) {
        List<Album> albums = albumRepository.findByTitleContainingIgnoreCase(query);
        List<Artist> artists = artistRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query);
        List<Band> bands = bandRepository.findByTitleContainingIgnoreCase(query);
        List<Song> songs = songRepository.findByTitleContainingIgnoreCase(query);

        List<AlbumSummaryResponse> albumResponses = albums.stream()
                .map(albumService::mapToSummary)
                .toList();

        List<ArtistSummaryResponse> artistResponses = artists.stream()
                .map(artist -> new ArtistSummaryResponse(artist.getId(), artist.getFirstName(), artist.getLastName()))
                .toList();

        List<BandSummaryResponse> bandResponses = bands.stream()
                .map(band -> new BandSummaryResponse(band.getId(), band.getTitle()))
                .toList();

        List<SongSummaryResponse> songResponses = songs.stream()
                .map(song -> new SongSummaryResponse(
                        song.getId(),
                        song.getTitle(),
                        song.getDuration(),
                        song.getAlbum() != null ? song.getAlbum().getTitle() : null,
                        song.getAlbum() != null ? song.getAlbum().getId() : null
                ))
                .toList();

        return new SearchResponse(albumResponses, artistResponses, bandResponses, songResponses);
    }
}
