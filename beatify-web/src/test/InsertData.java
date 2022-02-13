import com.paradise.beatify.core.domain.audiocontent.album.Album;
import com.paradise.beatify.core.domain.audiocontent.song.Song;
import com.paradise.beatify.core.domain.info.Country;
import com.paradise.beatify.core.domain.info.Genre;
import com.paradise.beatify.core.domain.info.Instrument;
import com.paradise.beatify.core.domain.info.Occupation;
import com.paradise.beatify.core.domain.musician.Artist;
import com.paradise.beatify.core.domain.musician.Band;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import java.util.HashSet;
import java.util.Set;

public class InsertData {

    public static void main(String[] args) {

        EntityManager entityManager = Persistence.createEntityManagerFactory("beatify-pu")
                .createEntityManager();
        entityManager.getTransaction().begin();

        Band band = new Band();
        band.setActive(true);
        band.setNationality(Country.US);
        band.setTitle("Linkin Park");
        band.setYearsActive("1986 - Present");
        Set<Genre> genreSet = new HashSet<>();
        genreSet.add(Genre.HeavyMetal);
        genreSet.add(Genre.HardRock);
        band.setGenres(genreSet);
        entityManager.persist(band);

        Artist artist = new Artist();
        artist.setActive(true);
        artist.setNationality(Country.US);
        artist.setYearsActive("1977 - 2017");
        artist.setBand(band);
        artist.setBandArtist(true);
        artist.setFirstName("Chester");
        artist.setLastName("Bennington");
        Set<Occupation> occupations = new HashSet<>();
        occupations.add(Occupation.Singer);
        occupations.add(Occupation.SongWriter);
        artist.setOccupations(occupations);
        artist.setBand(band);
        Set<Instrument> instruments = new HashSet<>();
        instruments.add(Instrument.Vocals);
        artist.setInstruments(instruments);
        Set<Artist> artists = new HashSet<>();
        artists.add(artist);
        band.setArtists(artists);


        Album album = new Album();
        album.setPopularity(0);
        album.setBandAlbum(true);
        album.setBand(band);
        album.setGenres(genreSet);
        album.setYear(2003);
        album.setActive(true);
        album.setTitle("Meteora");
        album.setAlbumArtURL("http://localhost:8080/beatify-web/resources/images/albumcovers/Meteora.jpg");

        Song song = new Song();
        song.setAlbum(album);
        song.setDuration("3:35");
        song.setServerURL("http://localhost:8080/beatify-web/resources/mp3/Forgotten.mp3");
        song.setActive(true);
        song.setTitle("Forgotten");

        Set<Song> songs = new HashSet<>();
        songs.add(song);
        album.setSongs(songs);

        Set<Album> albums = new HashSet<>();
        albums.add(album);


        band.setAlbums(albums);

        entityManager.persist(artist);
        entityManager.persist(song);

        entityManager.persist(album);

        entityManager.getTransaction().commit();
        System.exit(0);
    }
}
