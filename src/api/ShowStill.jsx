import {useEffect, useState} from "react";

const ShowStill = ({ stillPath }) => {

    const [stillURL, setStillURL] = useState(null)
    const baseURL = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        async function getStill() {
            var url = baseURL + stillPath;
            setStillURL(url);
        }
        getStill(stillPath);
    }, [stillPath]);

    return (
        <img src={stillURL} alt="Episode Still" />
    )
}

export default ShowStill;