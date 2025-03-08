import {useEffect, useState} from "react";
import DefaultProfileImage from '../assets/images/DefaultProfileImage.jpg'

const ShowGuest = ({ imagePath }) => {

    const [profileURL, setProfileURL] = useState(null)
    const baseURL = 'https://image.tmdb.org/t/p/w185'

    useEffect(() => {
        async function getImage() {
            var url = baseURL + imagePath;
            setProfileURL(url);
        }
        getImage(imagePath);
    }, [imagePath]);

    let handleNoActorImage = (event) => {
        event.target.onError = null;
        event.target.src = DefaultProfileImage;
    }

    return (
        <img src={profileURL} onError={handleNoActorImage}/>
    )
}

export default ShowGuest;