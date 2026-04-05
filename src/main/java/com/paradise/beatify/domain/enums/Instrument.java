package com.paradise.beatify.domain.enums;

public enum Instrument {
    Accordion("Accordion"),
    Bagpipes("Bagpipes"),
    Banjo("Banjo"),
    BassGuitar("Bass Guitar"),
    Bassoon("Bassoon"),
    Bell("Bell"),
    Bongo("Bongo"),
    Bugle("Bugle"),
    Carillon("Carillon"),
    Castanet("Castanet"),
    Cello("Cello"),
    Chimes("Chimes"),
    Clarinet("Clarinet"),
    Clavichord("Clavichord"),
    Conga("Conga"),
    Cornet("Cornet"),
    Cymbal("Cymbal"),
    DoubleBass("Double Bass"),
    DrumKit("Drum Kit"),
    Dulcimer("Dulcimer"),
    Fiddle("Fiddle"),
    Fife("Fife"),
    Flute("Flute"),
    FrenchHorn("French Horn"),
    Glockenspiel("Glockenspiel"),
    Gong("Gong"),
    Guitar("Guitar"),
    Harmonica("Harmonica"),
    Harp("Harp"),
    Harpsichord("Harpsichord"),
    Kazoo("Kazoo"),
    Kettledrum("Kettledrum"),
    Keyboard("Keyboard"),
    Lute("Lute"),
    Lyre("Lyre"),
    Mandolin("Mandolin"),
    Maracas("Maracas"),
    Marimba("Marimba"),
    Microphone("Microphone"),
    Oboe("Oboe"),
    Ocarina("Ocarina"),
    Organ("Organ"),
    Pan("Pan"),
    Piano("Piano"),
    Piccolo("Piccolo"),
    Recorder("Recorder"),
    Saxophone("Saxophone"),
    Sitar("Sitar"),
    SnareDrum("Snare Drum"),
    Synthesizer("Synthesizer"),
    Tambourine("Tambourine"),
    Triangle("Triangle"),
    Trombone("Trombone"),
    Trumpet("Trumpet"),
    Tuba("Tuba"),
    Ukulele("Ukulele"),
    Viola("Viola"),
    Violin("Violin"),
    Vocals("Vocals"),
    Xylophone("Xylophone"),
    Zither("Zither");

    private final String title;

    Instrument(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
