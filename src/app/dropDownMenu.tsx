import React, { useEffect, useState } from "react";
import { listInfo } from "react-list-player";
import { CgMusicNote } from "react-icons/cg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TrendingTrack } from "./trackInterfaces";


export const MyListInfoCard = ({ track }: { track: TrendingTrack }) => {
    const [favorite, setFavorite] = useState(track.favorite?track.favorite:false);
    useEffect(() => {
        setFavorite(track.favorite?track.favorite:false);
    }, [track]);

    const imgChangeHandler = (e: { persist: () => void; }) => {
        e.persist();
        if(!favorite) {
            track.favorite = true;
            setFavorite(true);
        }else{
            track.favorite = false;
            setFavorite(false);
        }
    };
    return (
        <div className="lt-info-card" style={{height: '90%'}}>
            <div className="lt-info-panel">
                <div className="lt-info-stats">
                    <span className="text pure">Song: {track.title}</span>
                </div>
                
                <div className="lt-info-stats">
                    <span className="text number">User: {track.user.name}</span>
                </div>
                <div>
                    <button onClick={imgChangeHandler}>{favorite ? <FaHeart/> : <FaRegHeart/> } </button>
                </div>
                <div>
                    <p >track.favorite_count: {""+track.favorite_count} </p>
                </div>
                
            </div>
            {
                track?.artwork
                ?   <div className="lt-info-img-cont">
                        <img className="lt-info-img" src={track.artwork?.["480x480"]} alt="list image" />
                    </div>
                :   <div className="lt-info-art-placeholder-cont">
                        <div className="lt-info-placeholder">
                            <span>
                                <CgMusicNote />
                            </span>
                        </div>
                    </div>
            }   
        </div>
        
    )
};