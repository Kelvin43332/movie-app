import Header from './Components/Header';
import Landing from './Components/Landing' 
import Planner from './Components/Planner' 
import Shopping from './Components/Shopping' 
import Cart from './Components/Cart' 
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App(props) {

    // const upcomingMovies = props.oUpcomingMovies.map(upcomingMovie => (
    //     <UpcomingMovies oUpcomingMovie = {upcomingMovie}/>
    //   ))

    return (
        <div>
            <Header></Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing></Landing>} />
                    <Route path="/planner" element={<Planner></Planner>}/>
                    <Route path="/shopping" element={<Shopping></Shopping>}/>
                </Routes>
            </BrowserRouter>
            <Cart></Cart>
        </div>
    );
}

  export default App;