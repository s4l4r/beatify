package com.paradise.beatify.domain;

import com.paradise.beatify.domain.enums.Instrument;
import com.paradise.beatify.domain.enums.Occupation;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ARTISTS")
public class Artist extends Musician {

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "bandArtist")
    private boolean bandArtist;

    @ManyToOne
    @JoinColumn(name = "BAND_ID")
    private Band band;

    @ElementCollection
    @CollectionTable(name = "ARTIST_OCCUPATION", joinColumns = @JoinColumn(name = "Artist_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "OCCUPATION")
    private Set<Occupation> occupations = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "ARTIST_INSTRUMENT", joinColumns = @JoinColumn(name = "Artist_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "INSTRUMENT")
    private Set<Instrument> instruments = new HashSet<>();

    @OneToMany(mappedBy = "artist")
    private Set<Album> albums = new HashSet<>();

    public Artist() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isBandArtist() {
        return bandArtist;
    }

    public void setBandArtist(boolean bandArtist) {
        this.bandArtist = bandArtist;
    }

    public Band getBand() {
        return band;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public Set<Occupation> getOccupations() {
        return occupations;
    }

    public void setOccupations(Set<Occupation> occupations) {
        this.occupations = occupations;
    }

    public Set<Instrument> getInstruments() {
        return instruments;
    }

    public void setInstruments(Set<Instrument> instruments) {
        this.instruments = instruments;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }
}
