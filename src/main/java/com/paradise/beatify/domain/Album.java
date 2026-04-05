package com.paradise.beatify.domain;

import com.paradise.beatify.domain.enums.Genre;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ALBUMS")
public class Album extends AudioContent {

    @Column(name = "year")
    private int year;

    @Column(name = "popularity")
    private long popularity;

    @Column(name = "bandAlbum")
    private boolean bandAlbum;

    @Column(name = "albumArtURL")
    private String albumArtURL;

    @ManyToOne
    @JoinColumn(name = "BAND_ID")
    @OrderColumn(name = "BAND_ORDER")
    private Band band;

    @ManyToOne
    @JoinColumn(name = "ARTIST_ID")
    @OrderColumn(name = "ARTIST_ORDER")
    private Artist artist;

    @OneToMany(mappedBy = "album")
    private Set<Song> songs = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "ALBUM_GENRE", joinColumns = @JoinColumn(name = "Album_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "GENRE")
    private Set<Genre> genres = new HashSet<>();

    public Album() {
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public long getPopularity() {
        return popularity;
    }

    public void setPopularity(long popularity) {
        this.popularity = popularity;
    }

    public boolean isBandAlbum() {
        return bandAlbum;
    }

    public void setBandAlbum(boolean bandAlbum) {
        this.bandAlbum = bandAlbum;
    }

    public String getAlbumArtURL() {
        return albumArtURL;
    }

    public void setAlbumArtURL(String albumArtURL) {
        this.albumArtURL = albumArtURL;
    }

    public Band getBand() {
        return band;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }
}
