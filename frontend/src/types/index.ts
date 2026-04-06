export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AlbumSummary {
  id: number;
  title: string;
  year: number;
  albumArtURL: string;
  bandAlbum: boolean;
  artistName: string;
  artistId: number;
  isBand: boolean;
}

export interface AlbumDetail extends AlbumSummary {
  popularity: number;
  genres: string[];
  songs: Song[];
}

export interface Song {
  id: number;
  title: string;
  duration: string;
  serverURL: string;
  album?: AlbumSummary;
}

export interface SongSummary {
  id: number;
  title: string;
  duration: string;
  serverURL: string;
  albumTitle: string;
  albumId: number;
  albumArtURL: string | null;
  artistName: string | null;
}

export interface ArtistDetail {
  id: number;
  firstName: string;
  lastName: string;
  yearsActive: string;
  nationality: string;
  bandArtist: boolean;
  occupations: string[];
  instruments: string[];
  band: BandSummary | null;
  albums: AlbumSummary[];
}

export interface BandDetail {
  id: number;
  title: string;
  yearsActive: string;
  nationality: string;
  genres: string[];
  members: ArtistSummary[];
  albums: AlbumSummary[];
}

export interface ArtistSummary {
  id: number;
  firstName: string;
  lastName: string;
}

export interface BandSummary {
  id: number;
  title: string;
}

export interface PlaylistSummary {
  id: number;
  title: string;
  icon: string;
  isPublic: boolean;
  ownerName: string;
  songCount: number;
  isOwner: boolean;
  isSaved: boolean;
}

export interface PlaylistDetail {
  id: number;
  title: string;
  icon: string;
  isPublic: boolean;
  ownerName: string;
  songCount: number;
  songs: Song[];
  isOwner: boolean;
  isSaved: boolean;
}

export interface SearchResults {
  albums: AlbumSummary[];
  artists: ArtistSummary[];
  bands: BandSummary[];
  songs: SongSummary[];
  playlists: PlaylistSummary[];
}
