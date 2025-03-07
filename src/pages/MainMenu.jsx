import ShowPoster from "../api/ShowPoster.jsx";
import {useNavigate} from "react-router";

const showIDs = [253, 655, 580, 1855, 314, 67198, 85949, 103516];

function MainMenu() {
    let navigate = useNavigate();
    return (
        <>
            <title>
                Star Trek Tracker
            </title>
            <header className='logo'>
                Star Trek Tracker
            </header>

            <div className='posterGrid'>
                {showIDs.map((id) => (
                    <div key={id}>
                        <button key={id} onClick={() => navigate(`/show/${id}`)}>
                            <ShowPoster key={id} tvShowID={id} />
                        </button>
                        <h2>Progress: 0%</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MainMenu