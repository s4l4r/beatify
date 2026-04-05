package com.paradise.beatify.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "AUTHORITIES")
public class Authority extends BaseEntity {

    @Column(name = "role")
    private String role;

    @Column(name = "username")
    private String username;

    public Authority() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
