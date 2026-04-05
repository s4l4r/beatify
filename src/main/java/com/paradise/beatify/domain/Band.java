package com.paradise.beatify.domain;

import com.paradise.beatify.domain.enums.Genre;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "BANDS")
public class Band extends Musician {

    @OneToMany(mappedBy = "band")
    private Set<Artist> artists = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "ARTIST_GENRE", joinColumns = @JoinColumn(name = "Band_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "GENRE")
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "band")
    private Set<Album> albums = new HashSet<>();

    public Band() {
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }
}
