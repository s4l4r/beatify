package com.paradise.beatify.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PLAYLISTS")
public class Playlist extends AudioContent {

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

    public Playlist() {
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
}
