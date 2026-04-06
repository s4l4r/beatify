package com.paradise.beatify.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "PLAYLISTS")
public class Playlist extends AudioContent {

    @Column(name = "icon")
    private String icon;

    @Column(name = "isPublic")
    private boolean isPublic;

    @Column(name = "favorites")
    private Boolean favorites = false;

    @ManyToMany
    @JoinTable(
            name = "PLAYLIST_SONG",
            joinColumns = @JoinColumn(name = "PLAYLIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "SONG_ID")
    )
    private List<Song> songs = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private BeatifyUser beatifyUser;

    @ManyToMany
    @JoinTable(
            name = "USER_SAVED_PLAYLIST",
            joinColumns = @JoinColumn(name = "PLAYLIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID")
    )
    private Set<BeatifyUser> savedByUsers = new HashSet<>();

    public Playlist() {
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public boolean isFavorites() {
        return Boolean.TRUE.equals(favorites);
    }

    public void setFavorites(Boolean favorites) {
        this.favorites = favorites;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public BeatifyUser getBeatifyUser() {
        return beatifyUser;
    }

    public void setBeatifyUser(BeatifyUser beatifyUser) {
        this.beatifyUser = beatifyUser;
    }

    public Set<BeatifyUser> getSavedByUsers() {
        return savedByUsers;
    }

    public void setSavedByUsers(Set<BeatifyUser> savedByUsers) {
        this.savedByUsers = savedByUsers;
    }
}
