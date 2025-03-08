import '../css/SeasonDetails.css'
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getShowSeason} from "../api/tmdbAPI.js";

function SeasonDetails () {

    let {id, seasonNum} = useParams();
    let [season, setSeason] = useState(null);
    let [episodeNum, setEpisode] = useState(1);

    useEffect(() => {
        async function getDetails() {
            var jsonDetails = await getShowSeason(id, seasonNum);
            setSeason(jsonDetails);
        }
        getDetails();
    },[id]);

    if(!season) {
        return null;
    }

    let episodes = season.episodes;

    return(
        <>
            <h1>Season {season.season_number}</h1>

            <div className='EpisodeList'>
                {episodes.map((episode, index) => (
                    <button key={index} onClick={() => setEpisode(episode.episode_number)}>
                        <h2>Episode {episode.episode_number} - {episode.name}</h2>
                    </button>
                ))}
            </div>
            <h1>{episodeNum}</h1>
        </>
    )
}

export default SeasonDetails