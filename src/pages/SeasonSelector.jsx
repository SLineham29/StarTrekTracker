import {useNavigate, useParams} from "react-router";
import {useState} from "react";

const SeasonSelector = () => {

    let {id, seasonNum} = useParams();
    let [chosenSeason, changeChosenSeason] = useState(parseInt(seasonNum) || 1)

    let details = JSON.parse(localStorage.getItem(`showDetails_${id}`));

    let navigate = useNavigate();

    let handleSeasonChange = (event) => {
        changeChosenSeason(event.target.value);

    }

    let seasonNums = Array.from( {length:details.number_of_seasons},
        (_, index) => index + 1);

    return(
        <div className='SeasonSelector'>
            <h2>Go to Season: </h2>
            <select id='chosenSeason' value={chosenSeason} onChange={handleSeasonChange}>
                {seasonNums.map((season) => (
                    <option key={`season-${season}`} value={season}>
                        Season {season}
                    </option>
                ))}
            </select>
            <button onClick={() => navigate(`/show/${id}/${chosenSeason}`)}>Go</button>
        </div>
    )
}

export default SeasonSelector