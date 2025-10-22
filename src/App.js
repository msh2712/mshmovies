import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Home from './Component/Home';
import Showdetaills from './Component/Showdetailss'
import SearchPage from './Component/SearchPage';
import LikedMoviesList from './Component/LikedMoviesList';

function App() {
  return (
    <Router>
      <div className="w-screen m-0 overflow-hidden flex bg-black  dark:bg-green-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/detaills/:id' element={<Showdetaills />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/likedatas' element={<LikedMoviesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
