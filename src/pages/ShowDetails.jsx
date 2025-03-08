import {useParams, useNavigate} from "react-router";
import {getShowDetails} from "../api/tmdbAPI.js";
import {useEffect, useState} from "react";
import ShowPoster from "../api/ShowPoster.jsx";

function ShowDetails() {
    let {id} = useParams();
    let [details, setDetails] = useState(null);
    let [chosenSeason, changeChosenSeason] = useState(1)

    let navigate = useNavigate();

    useEffect(() => {
        async function getDetails() {
            var jsonDetails = await getShowDetails(id);
            setDetails(jsonDetails);
        }
        getDetails();
    },[id]);

    if(!details) {
        return null;
    }

    let seasonNums = Array.from( {length:details.number_of_seasons},
        (_, index) => index + 1);

    let handleSeasonChange = (event) => {
        changeChosenSeason(event.target.value);
    }

    return(
        <>
            <h1>{details.name}</h1>
            <ShowPoster tvShowID={id}></ShowPoster>
            <h2>{details.overview}</h2>
            <h2>Number of Episodes: {details.number_of_episodes}</h2>

            <div>
                <h2>Go to Season: </h2>
                <select id='chosenSeason' onChange={handleSeasonChange}>
                    {seasonNums.map((season) => (
                        <option key={season} value={season}>
                            Season {season}
                        </option>
                        ))}
                </select>
                <button onClick={() => navigate(`/show/${id}/${chosenSeason}`)}>Go</button>
            </div>
        </>
    )
}

export default ShowDetails