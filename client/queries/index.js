import { gql } from '@apollo/client';

export const FETCH_SONGS_QUERY = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;

export const FETCH_SONG_QUERY = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export const FETCH_LYRIC_QUERY = gql`
  query LyricQuery($id: ID!) {
    lyric(id: $id) {
      id
      song {
        id
        lyrics {
          id
        }
      }
    }
  }
`;
