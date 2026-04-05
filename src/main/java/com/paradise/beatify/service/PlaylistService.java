package com.paradise.beatify.service;

import com.paradise.beatify.domain.BeatifyUser;
import com.paradise.beatify.domain.Playlist;
import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.CreatePlaylistRequest;
import com.paradise.beatify.dto.PlaylistResponse;
import com.paradise.beatify.dto.SongResponse;
import com.paradise.beatify.repository.PlaylistRepository;
import com.paradise.beatify.repository.SongRepository;
import com.paradise.beatify.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final AlbumService albumService;

    public PlaylistService(PlaylistRepository playlistRepository, SongRepository songRepository,
                           UserRepository userRepository, AlbumService albumService) {
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.userRepository = userRepository;
        this.albumService = albumService;
    }

    public List<PlaylistResponse> getUserPlaylists(String username) {
        BeatifyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        List<Playlist> playlists = playlistRepository.findByBeatifyUserId(user.getId());
        return playlists.stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public PlaylistResponse createPlaylist(String username, CreatePlaylistRequest request) {
        BeatifyUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Playlist playlist = new Playlist();
        playlist.setTitle(request.title());
        playlist.setBeatifyUser(user);
        playlist.setActive(true);

        playlistRepository.save(playlist);
        return mapToResponse(playlist);
    }

    @Transactional
    public PlaylistResponse addSong(Long playlistId, Long songId, String username) {
        Playlist playlist = getPlaylistForUser(playlistId, username);
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new EntityNotFoundException("Song not found with id: " + songId));

        playlist.getSongs().add(song);
        playlistRepository.save(playlist);
        return mapToResponse(playlist);
    }

    @Transactional
    public void removeSong(Long playlistId, Long songId, String username) {
        Playlist playlist = getPlaylistForUser(playlistId, username);
        playlist.getSongs().removeIf(song -> song.getId().equals(songId));
        playlistRepository.save(playlist);
    }

    @Transactional
    public void deletePlaylist(Long playlistId, String username) {
        Playlist playlist = getPlaylistForUser(playlistId, username);
        playlistRepository.delete(playlist);
    }

    private Playlist getPlaylistForUser(Long playlistId, String username) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + playlistId));

        if (!playlist.getBeatifyUser().getUsername().equals(username)) {
            throw new IllegalArgumentException("You do not have permission to modify this playlist");
        }

        return playlist;
    }

    private PlaylistResponse mapToResponse(Playlist playlist) {
        List<SongResponse> songs = playlist.getSongs().stream()
                .map(song -> {
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
                })
                .toList();

        return new PlaylistResponse(playlist.getId(), playlist.getTitle(), songs);
    }
}
