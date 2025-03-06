const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const posterURL = "https://image.tmdb.org/t/p/w500";

export async function getTVShowPoster(showID) {
    try {
        var response = await fetch(`https://api.themoviedb.org/3/tv/${showID}?api_key=${apiKey}`);

        var show = await response.json();

        return `${posterURL}${show.poster_path}`
    }
    catch (error) {
        console.error(`Could not find show with ID ${showID}`, error);
    }
}