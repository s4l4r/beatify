package com.paradise.beatify.service;

import com.paradise.beatify.domain.Album;
import com.paradise.beatify.domain.Artist;
import com.paradise.beatify.domain.Band;
import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.ArtistSummaryResponse;
import com.paradise.beatify.dto.BandSummaryResponse;
import com.paradise.beatify.dto.PlaylistSummaryResponse;
import com.paradise.beatify.dto.SearchResponse;
import com.paradise.beatify.dto.SongSummaryResponse;
import com.paradise.beatify.repository.AlbumRepository;
import com.paradise.beatify.repository.ArtistRepository;
import com.paradise.beatify.repository.BandRepository;
import com.paradise.beatify.repository.SongRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SearchService {

    private final AlbumRepository albumRepository;
    private final ArtistRepository artistRepository;
    private final BandRepository bandRepository;
    private final SongRepository songRepository;
    private final AlbumService albumService;
    private final PlaylistService playlistService;

    public SearchService(AlbumRepository albumRepository, ArtistRepository artistRepository,
                         BandRepository bandRepository, SongRepository songRepository,
                         AlbumService albumService, PlaylistService playlistService) {
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
        this.bandRepository = bandRepository;
        this.songRepository = songRepository;
        this.albumService = albumService;
        this.playlistService = playlistService;
    }

    public SearchResponse search(String query, String email) {
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
                .map(song -> {
                    var album = song.getAlbum();
                    var summary = album != null ? albumService.mapToSummary(album) : null;
                    return new SongSummaryResponse(
                            song.getId(),
                            song.getTitle(),
                            song.getDuration(),
                            song.getServerURL(),
                            album != null ? album.getTitle() : null,
                            album != null ? album.getId() : null,
                            summary != null ? summary.albumArtURL() : null,
                            summary != null ? summary.artistName() : null
                    );
                })
                .toList();

        List<PlaylistSummaryResponse> playlistResponses = email != null
                ? playlistService.searchPublicPlaylists(query, email)
                : List.of();

        return new SearchResponse(albumResponses, artistResponses, bandResponses, songResponses, playlistResponses);
    }
}
