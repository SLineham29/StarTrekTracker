import '../css/SeasonDetails.css'
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getShowSeason} from "../api/tmdbAPI.js";
import ShowStill from "../api/ShowStill.jsx";
import ShowImage from "../api/ShowImage.jsx";
import SeasonSelector from "./SeasonSelector.jsx";

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
    },[id, seasonNum]);

    if(!season) {
        return null;
    }

    let episodes = season.episodes;
    let averagePercentage = Math.floor((episodes[episodeNum-1].vote_average * 10));

    return(
        <>
            <div className='EpisodeList'>
                <SeasonSelector></SeasonSelector>
                {episodes.map((episode) => (
                    <button className='EpisodeButton' key={`${id}_season_${seasonNum}_episode_${episode.episode_number}`} onClick={() => setEpisode(episode.episode_number)}>
                        <h2>Episode {episode.episode_number} - {episode.name}</h2>
                    </button>
                ))}
            </div>

            <div className='EpisodeDetails'>
                <h1 id='SeasonEpisodeCombo'>
                    Season {season.season_number} - Episode {episodeNum}
                </h1>
                <h1 id='EpisodeName'>
                    {episodes[episodeNum-1].name}
                </h1>

                <div className='EpisodeInformation'>
                    <ShowStill stillPath={episodes[episodeNum-1].still_path}></ShowStill>
                    <div>
                        <h1>{episodes[episodeNum-1].overview}</h1>
                        <h1>Average Rating: {averagePercentage}%</h1>
                    </div>
                </div>

                <h2>Guest Stars</h2>
                <div className='GuestStars'>
                    {episodes[episodeNum-1].guest_stars.map((guest, index) => (
                        <div key={`${id}_season_${seasonNum}_episode_${episodeNum-1}_guest_${index}_div`}>
                            <ShowImage imagePath={guest.profile_path}></ShowImage>
                            <h2 key={`${id}_season_${seasonNum}_episode_${episodeNum-1}_guest_${index}_name`}>{guest.name}</h2>
                            <h3 key={`${id}_season_${seasonNum}_episode_${episodeNum-1}_guest_${index}_character`}>{guest.character}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SeasonDetails