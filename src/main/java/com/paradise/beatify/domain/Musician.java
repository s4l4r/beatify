package com.paradise.beatify.domain;

import com.paradise.beatify.domain.enums.Country;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Musician extends BaseEntity {

    @Column(name = "yearsActive")
    private String yearsActive;

    @Enumerated
    @Column(name = "nationality")
    private Country nationality;

    public Musician() {
    }

    public String getYearsActive() {
        return yearsActive;
    }

    public void setYearsActive(String yearsActive) {
        this.yearsActive = yearsActive;
    }

    public Country getNationality() {
        return nationality;
    }

    public void setNationality(Country nationality) {
        this.nationality = nationality;
    }
}
