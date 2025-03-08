const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const posterURL = "https://image.tmdb.org/t/p/w342";

export async function getTVShowPoster(showID) {
    try {
        let show = await getShowDetails(showID);

        return `${posterURL}${show.poster_path}`
    }
    catch (error) {
        console.error(`Could not find show with ID ${showID}`, error);
    }
}

export async function getShowDetails(showID) {
    let storedShow = localStorage.getItem(`showDetails_${showID}`)

    let show;

    if(storedShow) {
        show = JSON.parse(storedShow);
    }
    else {
        var response = await fetch(`https://api.themoviedb.org/3/tv/${showID}?api_key=${apiKey}`);

        show = await response.json();

        localStorage.setItem(`showDetails_${showID}`, JSON.stringify(show))
    }
    return show;
}

export async function getShowSeason(showID, seasonNum) {
    let storedSeason = localStorage.getItem(`showSeason_${showID}_${seasonNum}`)

    let season;

    if(storedSeason) {
        season = JSON.parse(storedSeason)
    }
    else {
        var response = await fetch(`https://api.themoviedb.org/3/tv/${showID}/season/${seasonNum}?api_key=${apiKey}`)

        season = await response.json();

        localStorage.setItem(`showSeason_${showID}_${seasonNum}`, JSON.stringify(season))
    }
    return season;
}