import './css/App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router";
import MainMenu from "./pages/MainMenu.jsx";
import ShowDetails from "./pages/ShowDetails.jsx";
import SeasonDetails from "./pages/SeasonDetails.jsx";



function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainMenu />} />
                <Route path='/show/:id' element={<ShowDetails />} />
                <Route path='/show/:id/:seasonNum' element={<SeasonDetails />} />
            </Routes>
        </Router>
    )
}

export default App
