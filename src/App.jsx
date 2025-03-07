import './App.css'
import ShowPoster from "./api/ShowPoster.jsx"

var showIDs = [253, 655, 580, 1855, 314, 67198, 85949, 103516];

function App() {

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
                    <button key={id}>
                        <ShowPoster key={id} tvShowID={id} />
                    </button>
                    <caption>Progress: 0%</caption>
                </div>
            ))}
        </div>
    </>
  )
}

export default App
