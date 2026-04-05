package com.paradise.beatify.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "SONGS")
public class Song extends AudioContent {

    @Column(name = "duration")
    private String duration;

    @Column(name = "serverURL")
    private String serverURL;

    @ManyToOne
    @JoinColumn(name = "ALBUM_ID")
    @OrderColumn(name = "ALBUM_ORDER")
    private Album album;

    public Song() {
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getServerURL() {
        return serverURL;
    }

    public void setServerURL(String serverURL) {
        this.serverURL = serverURL;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
}
