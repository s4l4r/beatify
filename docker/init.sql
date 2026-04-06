-- Beatify seed data: Radiohead - In Rainbows
-- This script runs once on first MySQL initialization

-- Schema (Hibernate JOINED inheritance)

CREATE TABLE IF NOT EXISTS ENTITIES (
    DTYPE VARCHAR(31) NOT NULL,
    id BIGINT NOT NULL AUTO_INCREMENT,
    active BIT(1) NOT NULL,
    title VARCHAR(255),
PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS BANDS (
    id BIGINT NOT NULL,
    nationality INT,
    yearsActive VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ARTISTS (
    id BIGINT NOT NULL,
    nationality INT,
    yearsActive VARCHAR(255),
    bandArtist BIT(1) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    BAND_ID BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id),
    FOREIGN KEY (BAND_ID) REFERENCES BANDS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ALBUMS (
    id BIGINT NOT NULL,
    albumArtURL VARCHAR(255),
    bandAlbum BIT(1) NOT NULL,
    popularity BIGINT NOT NULL,
    year INT NOT NULL,
    ARTIST_ID BIGINT,
    BAND_ID BIGINT,
    ARTIST_ORDER INT,
    BAND_ORDER INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS SONGS (
    id BIGINT NOT NULL,
    duration VARCHAR(255),
    serverURL VARCHAR(255),
    ALBUM_ID BIGINT,
    ALBUM_ORDER INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id),
    FOREIGN KEY (ALBUM_ID) REFERENCES ALBUMS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS USERS (
    id BIGINT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    username VARCHAR(255),
    googleId VARCHAR(255) UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ARTIST_GENRE (
    Band_id BIGINT NOT NULL,
    GENRE VARCHAR(255),
    FOREIGN KEY (Band_id) REFERENCES BANDS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ALBUM_GENRE (
    Album_id BIGINT NOT NULL,
    GENRE VARCHAR(255),
    FOREIGN KEY (Album_id) REFERENCES ALBUMS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ARTIST_OCCUPATION (
    Artist_id BIGINT NOT NULL,
    OCCUPATION VARCHAR(255),
    FOREIGN KEY (Artist_id) REFERENCES ARTISTS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ARTIST_INSTRUMENT (
    Artist_id BIGINT NOT NULL,
    INSTRUMENT VARCHAR(255),
    FOREIGN KEY (Artist_id) REFERENCES ARTISTS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS PLAYLISTS (
    id BIGINT NOT NULL,
    icon VARCHAR(10),
    isPublic BIT(1) NOT NULL DEFAULT 0,
    USER_ID BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES ENTITIES(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS PLAYLIST_SONG (
    PLAYLIST_ID BIGINT NOT NULL,
    SONG_ID BIGINT NOT NULL,
    FOREIGN KEY (PLAYLIST_ID) REFERENCES PLAYLISTS(id),
    FOREIGN KEY (SONG_ID) REFERENCES SONGS(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS USER_SAVED_PLAYLIST (
    PLAYLIST_ID BIGINT NOT NULL,
    USER_ID BIGINT NOT NULL,
    PRIMARY KEY (PLAYLIST_ID, USER_ID),
    FOREIGN KEY (PLAYLIST_ID) REFERENCES PLAYLISTS(id),
    FOREIGN KEY (USER_ID) REFERENCES USERS(id)
) ENGINE=InnoDB;

-- =============================================================================
-- Seed data
-- =============================================================================

-- Base entity rows (JOINED inheritance: every entity needs a row here)
INSERT INTO ENTITIES (id, DTYPE, active, title) VALUES
-- Band
(1, 'Band', 1, 'Radiohead'),
-- Artists
(2, 'Artist', 1, 'Thom Yorke'),
(3, 'Artist', 1, 'Jonny Greenwood'),
(4, 'Artist', 1, 'Colin Greenwood'),
(5, 'Artist', 1, 'Ed O''Brien'),
(6, 'Artist', 1, 'Philip Selway'),
-- Album
(7, 'Album', 1, 'In Rainbows'),
-- Songs
(8,  'Song', 1, '15 Step'),
(9,  'Song', 1, 'Bodysnatchers'),
(10, 'Song', 1, 'Nude'),
(11, 'Song', 1, 'Weird Fishes/Arpeggi'),
(12, 'Song', 1, 'All I Need'),
(13, 'Song', 1, 'Faust Arp'),
(14, 'Song', 1, 'Reckoner'),
(15, 'Song', 1, 'House of Cards'),
(16, 'Song', 1, 'Jigsaw Falling into Place'),
(17, 'Song', 1, 'Videotape');

-- Band: Radiohead (nationality 1 = UK ordinal)
INSERT INTO BANDS (id, nationality, yearsActive) VALUES
(1, 1, '1985-present');

-- Band genres
INSERT INTO ARTIST_GENRE (Band_id, GENRE) VALUES
(1, 'AlternativeRock'),
(1, 'Experimental'),
(1, 'Electronica');

-- Artists (all UK, bandArtist = true, linked to Radiohead)
INSERT INTO ARTISTS (id, nationality, yearsActive, bandArtist, firstName, lastName, BAND_ID) VALUES
(2, 1, '1985-present', 1, 'Thom',   'Yorke',     1),
(3, 1, '1985-present', 1, 'Jonny',  'Greenwood',  1),
(4, 1, '1985-present', 1, 'Colin',  'Greenwood',  1),
(5, 1, '1985-present', 1, 'Ed',     'O''Brien',   1),
(6, 1, '1985-present', 1, 'Philip', 'Selway',     1);

-- Artist occupations
INSERT INTO ARTIST_OCCUPATION (Artist_id, OCCUPATION) VALUES
(2, 'Singer'), (2, 'SongWriter'), (2, 'Musician'),
(3, 'Musician'), (3, 'Composer'),
(4, 'Musician'),
(5, 'Musician'), (5, 'Singer'),
(6, 'Musician');

-- Artist instruments
INSERT INTO ARTIST_INSTRUMENT (Artist_id, INSTRUMENT) VALUES
(2, 'Vocals'), (2, 'Guitar'), (2, 'Piano'),
(3, 'Guitar'), (3, 'Piano'),  (3, 'Viola'),
(4, 'BassGuitar'),
(5, 'Guitar'), (5, 'Vocals'),
(6, 'DrumKit');

-- Album: In Rainbows (2007, band album by Radiohead)
INSERT INTO ALBUMS (id, year, popularity, bandAlbum, albumArtURL, BAND_ID, ARTIST_ID, BAND_ORDER, ARTIST_ORDER) VALUES
(7, 2007, 0, 1, '/media/radiohead/in-rainbows/cover.jpg', 1, NULL, 0, NULL);

-- Album genres
INSERT INTO ALBUM_GENRE (Album_id, GENRE) VALUES
(7, 'AlternativeRock'),
(7, 'Experimental'),
(7, 'IndieRock');

-- Songs (In Rainbows tracklist)
INSERT INTO SONGS (id, duration, serverURL, ALBUM_ID, ALBUM_ORDER) VALUES
(8,  '3:57', '/media/radiohead/in-rainbows/01-15-step.mp3',                    7, 0),
(9,  '4:02', '/media/radiohead/in-rainbows/02-bodysnatchers.mp3',              7, 1),
(10, '4:15', '/media/radiohead/in-rainbows/03-nude.mp3',                        7, 2),
(11, '5:18', '/media/radiohead/in-rainbows/04-weird-fishes-arpeggi.mp3',        7, 3),
(12, '3:49', '/media/radiohead/in-rainbows/05-all-i-need.mp3',                  7, 4),
(13, '2:10', '/media/radiohead/in-rainbows/06-faust-arp.mp3',                   7, 5),
(14, '4:50', '/media/radiohead/in-rainbows/07-reckoner.mp3',                    7, 6),
(15, '5:28', '/media/radiohead/in-rainbows/08-house-of-cards.mp3',              7, 7),
(16, '4:09', '/media/radiohead/in-rainbows/09-jigsaw-falling-into-place.mp3',   7, 8),
(17, '4:40', '/media/radiohead/in-rainbows/10-videotape.mp3',                   7, 9);
