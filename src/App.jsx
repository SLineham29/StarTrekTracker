import './App.css'
import ShowPoster from "./ShowPoster.jsx"

var showIDs = [253, 655, 580, 1855, 314, 67198, 85949, 103516];

function App() {

  return (
    <>
        <title>
            Star Trek Tracker
        </title>
        <header className='Logo'>
            Star Trek Tracker
        </header>

        <div className='posterGrid'>
            {showIDs.map((id) => (
                <ShowPoster key={id} tvShowID={id} />
            ))}
        </div>
    </>
  )
}

export default App
