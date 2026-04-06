package com.paradise.beatify.service;

import com.paradise.beatify.domain.BaseEntity;
import com.paradise.beatify.domain.BeatifyUser;
import com.paradise.beatify.domain.Playlist;
import com.paradise.beatify.domain.Song;
import com.paradise.beatify.dto.AlbumSummaryResponse;
import com.paradise.beatify.dto.CreatePlaylistRequest;
import com.paradise.beatify.dto.PlaylistResponse;
import com.paradise.beatify.dto.PlaylistSummaryResponse;
import com.paradise.beatify.dto.SongResponse;
import com.paradise.beatify.repository.PlaylistRepository;
import com.paradise.beatify.repository.SongRepository;
import com.paradise.beatify.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
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

    public List<PlaylistSummaryResponse> getUserLibrary(String email) {
        BeatifyUser user = getUser(email);
        List<PlaylistSummaryResponse> result = new ArrayList<>();

        List<Playlist> owned = playlistRepository.findByBeatifyUserId(user.getId());
        Set<Long> ownedIds = owned.stream().map(BaseEntity::getId).collect(Collectors.toSet());

        for (Playlist p : owned) {
            if (!p.isFavorites()) {
                result.add(mapToSummary(p, user));
            }
        }

        for (Playlist p : user.getSavedPlaylists()) {
            if (!ownedIds.contains(p.getId())) {
                result.add(mapToSummary(p, user));
            }
        }

        return result;
    }

    public PlaylistResponse getPlaylistDetail(Long playlistId, String email) {
        BeatifyUser user = getUser(email);
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));

        if (!playlist.isPublic() && !playlist.getBeatifyUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You do not have access to this playlist");
        }

        return mapToResponse(playlist, user);
    }

    @Transactional
    public PlaylistResponse createPlaylist(String email, CreatePlaylistRequest request) {
        BeatifyUser user = getUser(email);

        Playlist playlist = new Playlist();
        playlist.setTitle(request.title());
        playlist.setIcon(request.icon() != null ? request.icon() : "\uD83C\uDFB5");
        playlist.setPublic(request.isPublic());
        playlist.setBeatifyUser(user);
        playlist.setActive(true);

        playlistRepository.save(playlist);
        return mapToResponse(playlist, user);
    }

    @Transactional
    public PlaylistResponse updatePlaylist(Long playlistId, String email, CreatePlaylistRequest request) {
        Playlist playlist = getOwnedPlaylist(playlistId, email);
        playlist.setTitle(request.title());
        if (request.icon() != null) {
            playlist.setIcon(request.icon());
        }
        playlist.setPublic(request.isPublic());
        playlistRepository.save(playlist);

        return mapToResponse(playlist, getUser(email));
    }

    @Transactional
    public PlaylistResponse addSong(Long playlistId, Long songId, String email) {
        Playlist playlist = getOwnedPlaylist(playlistId, email);
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new EntityNotFoundException("Song not found with id: " + songId));

        boolean alreadyAdded = playlist.getSongs().stream().anyMatch(s -> s.getId().equals(songId));
        if (!alreadyAdded) {
            playlist.getSongs().add(song);
            playlistRepository.save(playlist);
        }

        return mapToResponse(playlist, getUser(email));
    }

    @Transactional
    public void removeSong(Long playlistId, Long songId, String email) {
        Playlist playlist = getOwnedPlaylist(playlistId, email);
        playlist.getSongs().removeIf(song -> song.getId().equals(songId));
        playlistRepository.save(playlist);
    }

    @Transactional
    public void deletePlaylist(Long playlistId, String email) {
        Playlist playlist = getOwnedPlaylist(playlistId, email);
        playlist.getSavedByUsers().clear();
        playlistRepository.delete(playlist);
    }

    @Transactional
    public void savePlaylist(Long playlistId, String email) {
        BeatifyUser user = getUser(email);
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));

        if (!playlist.isPublic()) {
            throw new IllegalArgumentException("Cannot save a private playlist");
        }
        if (playlist.getBeatifyUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Cannot save your own playlist");
        }

        playlist.getSavedByUsers().add(user);
        playlistRepository.save(playlist);
    }

    @Transactional
    public void unsavePlaylist(Long playlistId, String email) {
        BeatifyUser user = getUser(email);
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));

        playlist.getSavedByUsers().remove(user);
        playlistRepository.save(playlist);
    }

    public List<PlaylistSummaryResponse> searchPublicPlaylists(String query, String email) {
        BeatifyUser user = getUser(email);
        List<Playlist> playlists = playlistRepository.findByIsPublicTrueAndTitleContainingIgnoreCase(query);
        return playlists.stream()
                .filter(p -> !p.isFavorites())
                .map(p -> mapToSummary(p, user))
                .toList();
    }

    public Playlist getOrCreateFavorites(BeatifyUser user) {
        return playlistRepository.findByBeatifyUserIdAndFavoritesTrue(user.getId())
                .orElseGet(() -> {
                    Playlist fav = new Playlist();
                    fav.setTitle("Favorites");
                    fav.setIcon("\u2764\uFE0F");
                    fav.setFavorites(true);
                    fav.setPublic(false);
                    fav.setBeatifyUser(user);
                    fav.setActive(true);
                    return playlistRepository.save(fav);
                });
    }

    @Transactional
    public void addFavorite(Long songId, String email) {
        BeatifyUser user = getUser(email);
        Playlist favorites = getOrCreateFavorites(user);
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new EntityNotFoundException("Song not found"));

        boolean already = favorites.getSongs().stream().anyMatch(s -> s.getId().equals(songId));
        if (!already) {
            favorites.getSongs().add(song);
            playlistRepository.save(favorites);
        }
    }

    @Transactional
    public void removeFavorite(Long songId, String email) {
        BeatifyUser user = getUser(email);
        Playlist favorites = getOrCreateFavorites(user);
        favorites.getSongs().removeIf(s -> s.getId().equals(songId));
        playlistRepository.save(favorites);
    }

    public List<Long> getFavoriteIds(String email) {
        BeatifyUser user = getUser(email);
        Playlist favorites = getOrCreateFavorites(user);
        return favorites.getSongs().stream().map(BaseEntity::getId).toList();
    }

    public PlaylistResponse getFavoritesDetail(String email) {
        BeatifyUser user = getUser(email);
        Playlist favorites = getOrCreateFavorites(user);
        return mapToResponse(favorites, user);
    }

    private BeatifyUser getUser(String email) {
        return userRepository.findByUsername(email)
                .or(() -> userRepository.findByGoogleId(email))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    private Playlist getOwnedPlaylist(Long playlistId, String email) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + playlistId));

        if (!playlist.getBeatifyUser().getUsername().equals(email)) {
            throw new IllegalArgumentException("You do not have permission to modify this playlist");
        }

        return playlist;
    }

    private String ownerName(Playlist playlist) {
        BeatifyUser owner = playlist.getBeatifyUser();
        return owner.getFirstName() + " " + owner.getLastName();
    }

    private boolean isOwner(Playlist playlist, BeatifyUser user) {
        return playlist.getBeatifyUser().getId().equals(user.getId());
    }

    private boolean isSaved(Playlist playlist, BeatifyUser user) {
        return playlist.getSavedByUsers().stream().anyMatch(u -> u.getId().equals(user.getId()));
    }

    private PlaylistSummaryResponse mapToSummary(Playlist playlist, BeatifyUser user) {
        return new PlaylistSummaryResponse(
                playlist.getId(),
                playlist.getTitle(),
                playlist.getIcon(),
                playlist.isPublic(),
                ownerName(playlist),
                playlist.getSongs().size(),
                isOwner(playlist, user),
                isSaved(playlist, user)
        );
    }

    private PlaylistResponse mapToResponse(Playlist playlist, BeatifyUser user) {
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

        return new PlaylistResponse(
                playlist.getId(),
                playlist.getTitle(),
                playlist.getIcon(),
                playlist.isPublic(),
                ownerName(playlist),
                playlist.getSongs().size(),
                songs,
                isOwner(playlist, user),
                isSaved(playlist, user)
        );
    }
}
