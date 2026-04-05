package com.paradise.beatify.domain.enums;

public enum Genre {
    Rock("Rock"),
    Folk("Folk"),
    Jazz("Jazz"),
    Blues("Blues"),
    MusicalTheatre("Musical Theatre"),
    Country("Country"),
    Pop("Pop"),
    HipHop("Hip Hop"),
    RythmsAndBlues("Rythms and Blues"),
    Reggae("Reggae"),
    Classical("Classical"),
    Popular("Popular"),
    PunkRock("Punk Rock"),
    HeavyMetal("Heavy Metal"),
    Funk("Funk"),
    Soul("Soul"),
    Techno("Techno"),
    House("House"),
    Singing("Singing"),
    AlternativeRock("Alternative Rock"),
    Dance("Dance"),
    ElectronicDance("Electronic Dance"),
    Electro("Electro"),
    Disco("Disco"),
    Trance("Trance"),
    Ambient("Ambient"),
    Psychedelic("Psychedelic"),
    Instrumental("Instrumental"),
    Dubstep("Dubstep"),
    Gospel("Gospel"),
    ProgressiveRock("Progressive Rock"),
    PopRock("Pop Rock"),
    Industrial("Industrial"),
    Breakbeat("Breakbeat"),
    Orchestra("Orchestra"),
    Dub("Dub"),
    Experimental("Experimental"),
    Baroque("Baroque"),
    Grunge("Grunge"),
    IndieRock("Indie Rock"),
    Progressive("Progressive"),
    Ska("Ska"),
    DrumAndBass("Drum and Bass"),
    Swing("Swing"),
    HardRock("Hard Rock"),
    SynthPop("Synth Pop"),
    UKGarage("UK Garage"),
    Opera("Opera"),
    Electronica("Electronica"),
    Bass("Bass"),
    Soundtrack("Soundtrack");

    private final String title;

    Genre(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
