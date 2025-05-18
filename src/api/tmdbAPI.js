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

export async function storeShowProgress(showID) {

    if(localStorage.getItem(`${showID}_NumOfEpisodes`) == null) {
        let show = localStorage.getItem(`showDetails_${showID}`)

        if(!show) {
            show = await getShowDetails(showID)
        }
        else {
            show = JSON.parse(show)
        }

        localStorage.setItem(`${showID}_NumOfEpisodes`, show.number_of_episodes);
        localStorage.setItem(`${showID}_Progress`, '0');
    }
}

export async function getShowDetails(showID) {
    let storedShow = localStorage.getItem(`showDetails_${showID}`)

    let show;

    if(storedShow) {
        show = JSON.parse(storedShow);
    }
    else {
        let response = await fetch(`https://api.themoviedb.org/3/tv/${showID}?api_key=${apiKey}`);

        show = await response.json();

        localStorage.setItem(`showDetails_${showID}`, JSON.stringify(show));
    }

    return show;
}

export async function getShowSeason(showID, seasonNum) {

    let season;

    let storedSeason = localStorage.getItem(`showSeason_${showID}_${seasonNum}`);

    if(storedSeason != null) {
        season = JSON.parse(storedSeason)
    }
    else {
        let response = await fetch(`https://api.themoviedb.org/3/tv/${showID}/season/${seasonNum}?api_key=${apiKey}`)

        season = await response.json();

        localStorage.setItem(`showSeason_${showID}_${seasonNum}`, JSON.stringify(season))

        let episodeProgress = []

        for(let i = 0; i < season.episodes.length; i++) {
            episodeProgress.push({ episodeNum: i + 1, watched: false})
        }

        localStorage.setItem(`${showID}_Season_${seasonNum}_EpisodesWatched`, JSON.stringify(episodeProgress))
    }
    return season;
}