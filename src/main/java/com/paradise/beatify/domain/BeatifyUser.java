package com.paradise.beatify.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class BeatifyUser extends BaseEntity {

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "username")
    private String username;

    @Column(name = "googleId", unique = true)
    private String googleId;

    @OneToMany(mappedBy = "beatifyUser")
    private Set<Playlist> playlists = new HashSet<>();

    @ManyToMany(mappedBy = "savedByUsers")
    private Set<Playlist> savedPlaylists = new HashSet<>();

    public BeatifyUser() {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }

    public Set<Playlist> getSavedPlaylists() {
        return savedPlaylists;
    }

    public void setSavedPlaylists(Set<Playlist> savedPlaylists) {
        this.savedPlaylists = savedPlaylists;
    }
}
