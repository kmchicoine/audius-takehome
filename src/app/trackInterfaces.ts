import { track } from "react-list-player";

export interface User {
    bio?: string,
    name: string,
    id: string,
    
  }
  
export interface TrackProps {
    data: TrendingTrack[]
}
export interface TrendingTrack {
  artwork?: Artwork,
  description?: string,
  genre?: string,
  id: string,
  mood?: string,
  tags?: string,
  title: string,
  user: User,
  duration: number,
  favorite_count: number,
  favorite?: boolean,
}

export interface Artwork {
    "150x150": string,
    "480x480": string,
    "1000x1000": string
}

export function mapTracks(trendingTrack: TrendingTrack = emptyTrack): track {
  const { artwork, genre, mood, title, duration } = trendingTrack;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const playerTrack: track = {
    title: [{type: 'text', content: title}],
    album: [{type: 'text', content: mood?mood:''}],
    artist: [{type: 'text', content: genre?genre:''}],
    duration: minutes.toString() + ":" + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
    imageSrc: artwork?.["150x150"],
  };
  return playerTrack;
}

const emptyUser: User = {
  name: "",
  id: "",
}

const emptyArtwork: Artwork = {
  "150x150": "",
  "480x480": "",
  "1000x1000": "",
}

export const emptyTrack: TrendingTrack = {
  id: "",
  title: "",
  user: emptyUser,
  duration: 0,
  artwork: emptyArtwork,
  favorite: false,
  favorite_count: 0,
}




