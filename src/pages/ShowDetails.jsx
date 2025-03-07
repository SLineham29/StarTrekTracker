import {useParams} from "react-router";
import {getShowDetails} from "../api/tmdbAPI.js";
import {useEffect, useState} from "react";
import ShowPoster from "../api/ShowPoster.jsx";

function ShowDetails() {
    let {id} = useParams();
    let [details, setDetails] = useState(null);

    useEffect(() => {
        async function getDetails() {
            var jsonDetails = await getShowDetails(id);
            console.log(jsonDetails)

            setDetails(jsonDetails);
        }
        getDetails();
    },[id]);

    if(!details) {
        return null;
    }

    return(
        <>
            <h1>{details.name}</h1>
            <ShowPoster tvShowID={id}></ShowPoster>
            <h2>{details.overview}</h2>
            <h2>Number of Episodes: {details.number_of_episodes}</h2>
        </>
    )
}

export default ShowDetails