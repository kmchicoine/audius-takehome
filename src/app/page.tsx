"use client";
import { useEffect, useRef, useState } from 'react';
import { listInfo, ListPlayer, ListPlayerContext, track } from 'react-list-player';
import { emptyTrack, mapTracks, TrackProps, TrendingTrack} from './trackInterfaces';
import  { MyListInfoCard } from './dropDownMenu';

const playlistInfo: listInfo = {
    type: 'playlist',
    name: 'Audius Trending Tracks',
    creationDate: "7/29/2024",
    numTracks: 100,
    duration: "",
}


  
function App() {
    const [selectedTrack, setSelectedTrack] = useState(0);   // -1 means no track is selected
    const [audioSrc, setAudioSrc] = useState();
    const [isPlaying, setIsPlaying] = useState(false);        // play/pause
    const [isMuted, setIsMuted] = useState(false);            // mute/unmute
    const [genre, setGenre] = useState("");
    const [trendingTracks, setTrendingTracks] = useState<TrackProps>();
    const [search, setSearch]: [string, (search: string) => void] = useState("");
    const [persistTracks, setPersistTracks] = useState<TrackProps>();
    const [checkBox, setCheckBox] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);


    //const audioSrcs = ["/free-audio/tokyo cafe.mp3", "/free-audio/my universe.mp3", "/free-audio/smoke.mp3", "/free-audio/good night.mp3", "/free-audio/hear me.mp3", "/free-audio/baby mandala.mp3", "/free-audio/midnight forest.mp3", "/free-audio/separation.mp3", "/free-audio/drive breakbeat.mp3", "/free-audio/glossy.mp3"];

    const handleOnPlay = (index:number, resume:boolean) => {
        if(index === selectedTrack && !resume) {
            audioRef.current?.load();
            audioRef.current?.play();
        } else {
            audioRef.current?.play();
        }
    }

    const handleOnPause = () => {
        audioRef.current?.pause();
    }
    
    const DropdownMenu = () => {
        return (
            <div className="dropdown-menu">
                <select onChange={(e) => setGenre(e.target.value)}>
                    <option value = "">Select Genre</option>
                    <option value="">All</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Hip-Hop/Rap">Hip-Hop/Rap</option>
                </select>
            </div>
        );
    };

    useEffect(() => {
        const fetchTrendingTracks = (newGenre: string) => {
            fetch('https://discoveryprovider.audius.co/v1/tracks/trending?genre=' + newGenre)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setTrendingTracks(data);
              setPersistTracks(data);
            });
        };
        fetchTrendingTracks(genre);
    }, [genre]);

    function searchResult(trendingTrack: TrendingTrack) {
        if (search == "" || trendingTrack.title.toLowerCase().includes(search.toLowerCase())) {
            return trendingTrack;
        }
    }

    useEffect(() => {
        const filterOnSearch = (search: string) => {
            if (persistTracks != undefined) {
                let searchResults = persistTracks.data.filter(searchResult);
                if (searchResults.length <= 0) {
                    searchResults = [emptyTrack];
                }
                const tp: TrackProps = {data: searchResults};
                setTrendingTracks(tp);
            } else {
                const tp: TrackProps = {data: [emptyTrack]};
                setTrendingTracks(tp);
            }
        };
        filterOnSearch(search);
    }, [search]);

    const handleSearchUpdate = (e: { target: { value: string; }; }) => {
        setSearch(e.target.value);
      };

    
    useEffect(() => {
        const sortByFav = (checkBox: boolean) => {
            if (trendingTracks != undefined) {
                if (checkBox) {
                    let sortedTracks = trendingTracks.data.sort((a,b) => {
                        const aRank = a.favorite !== undefined ? (a.favorite ? 1 : 0) : Infinity;
                        const bRank = b.favorite !== undefined ? (b.favorite ? 1 : 0) : Infinity;
                        return aRank - bRank;
                    })
                    const tp: TrackProps = {data: sortedTracks};
                    setTrendingTracks(tp);
                } else {
                    let sortedTracks = trendingTracks.data.sort((a,b) => b.favorite_count - a.favorite_count);
                    const tp: TrackProps = {data: sortedTracks};
                    setTrendingTracks(tp);
                }
            }   
        };
        sortByFav(checkBox);
    }, [checkBox]);

    const handleCheckBox = () => {
        setCheckBox(!checkBox);
    }

    // function songEnded = () => {
    //     setSelectedTrack(selectedTrack + 1);
    //     const fetchSrc = fetch("https://discoveryprovider.audius.co/v1/tracks/${trendingTracks?.data[selectedTrack].id}/stream")
    //     .then(resp => setAudioSrc(resp));
    // }
               

  return (
    <ListPlayerContext.Provider value={{selectedTrack, setSelectedTrack, isPlaying, setIsPlaying, isMuted, setIsMuted}}>
      <div className='container-for-sizing-player'>
        <ListPlayer  
          tracks={trendingTracks?trendingTracks.data.map(trendingTrack => (mapTracks(trendingTrack))):[mapTracks(emptyTrack)]}
          listInfo={playlistInfo} 
          playCallback={handleOnPlay} 
          pauseCallback={handleOnPause}
          children={
          <div className="lh-children-cont lh-listinfocard-cont">
            <MyListInfoCard track={trendingTracks?trendingTracks.data[selectedTrack]:emptyTrack}  />
            <div className='bottom-div' >
                <div className='title'><input type="text" placeholder="Search..." onChange={handleSearchUpdate} /></div>
                <div className='genre' ><DropdownMenu /> </div>
                <div className='genre'>
                    <label>Sort by favorites: <input type="checkbox" onChange={handleCheckBox} /></label> 
                </div>
            </div>
        </div>
        }
        />
      </div>
      <audio ref={audioRef} 
        src={audioSrc}
        muted={isMuted} 
        onEnded={() => {setSelectedTrack(selectedTrack + 1)}}
      />
    </ListPlayerContext.Provider>
  )
}


export default App;


