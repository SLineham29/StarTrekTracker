using System.Net.Http;
using System.IO;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using TMDbLib;
using TMDbLib.Client;
using TMDbLib.Objects.TvShows;
using MicaWPF.Controls;
using TMDbLib.Objects.Movies;

namespace StarTrekTracker;

public partial class MainWindow : MicaWindow
{
    private TMDbClient client;

    private int[] showIDs = { 253, 655, 580, 1855, 314, 67198, 85949 };

    private int filmID = 152;

    public MainWindow()
    {
        InitializeComponent();
        string apiKey = File.ReadAllText("TMDB_API_Key.txt");
        client = new TMDbClient(apiKey);

        Image[] showImages = [imgTOS, imgTNG, imgDSN, imgV, imgE, imgD, imgP];

        for (int i = 0; i < showIDs.Length; i++)
        {
            LoadShowImagesAsync(showIDs[i], showImages[i]);
        }
        LoadFilmImagesAsync(filmID, imgFilms);
    }

    private async Task LoadShowImagesAsync(int showID, Image showImage)
    {
        TvShow show = await client.GetTvShowAsync(showID);
        string posterUrl = $"https://image.tmdb.org/t/p/w500{show.PosterPath}";
        showImage.Source = new BitmapImage(new Uri(posterUrl));
    }

    private async Task LoadFilmImagesAsync(int filmID, Image filmImage)
    {
        Movie film = await client.GetMovieAsync(filmID);
        string posterUrl = $"https://image.tmdb.org/t/p/w500{film.PosterPath}";
        filmImage.Source = new BitmapImage(new Uri(posterUrl));
    }
}