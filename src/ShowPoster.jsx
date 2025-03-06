import {useEffect, useState} from "react";
import { getTVShowPoster } from "./api/tmdbAPI.js";

// ({ tvShowID }) here means the variables that are usually sent as 'properties' are instead individual,
// meaning you don't need to use "props.??" to access them.
const ShowPoster = ({ tvShowID }) => {

    // UseState allows you to dynamically update and render ui elements if they're updated.
    // In this case, when the API returns the poster URL, setPosterURL is called and the image source is automatically updated to reflect it.
    const [posterURL, setPosterURL] = useState(null)

    // UseEffect lets you run functions either after the page is rendered, or when the variable in square brackets at the end is changed.
    useEffect(() => {
        async function getPoster() {
            var url = await getTVShowPoster(tvShowID);
            setPosterURL(url);
        }
        getPoster(tvShowID);
    }, [tvShowID]);
    // This effect will run whenever tvShowID changes.

    return (
        <img src={posterURL} alt="Show Poster" />
    )
}

export default ShowPoster;