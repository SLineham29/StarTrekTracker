import {useEffect, useState} from "react";
import {storeShowProgress} from "./tmdbAPI.js";

const ShowProgress = ({ showID }) => {

    const [numOfEpisodes, setNumOfEpisodes] = useState(0)
    const [episodeProgress, setEpisodeProgress] = useState(0)

    useEffect(() => {
        async function getEpisodeProgress() {
            if(numOfEpisodes == 0) {
                await storeShowProgress(showID)
            }

            let storedNumOfEpisodes = localStorage.getItem(`${showID}_NumOfEpisodes`);
            let storedEpisodeProgress = localStorage.getItem(`${showID}_Progress`);

            setNumOfEpisodes(parseInt(storedNumOfEpisodes) || 0);
            setEpisodeProgress(parseInt(storedEpisodeProgress) || 0);
        }
        getEpisodeProgress();
    }, [showID]);

    return (
        <div className='progressBar'>
            <progress value={episodeProgress} max={numOfEpisodes}></progress>
            <h3>{episodeProgress} / {numOfEpisodes} Episodes Watched</h3>
        </div>
    )
}

export default ShowProgress;