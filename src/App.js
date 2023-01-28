import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import SearchPage from './components/SearchPage/SearchPage';
import VideoPage from './components/videoPage/videoPage';
import ChannelPage from './components/Home/ChannelPage';
import {BrowserRouter as Router ,Route,Routes,Link}from 'react-router-dom'
import SubsPage from './components/Home/SubsPage';
import LikedVids from './components/Home/LikedVids';
function App() {
  return (
    <>
   <Router>
   <Routes>
   <Route  path='/' element={<Home />}exact/>
   <Route  path='/SubsPage' element={<SubsPage />}exact/>
   <Route  path='/LikedVids' element={<LikedVids />}exact/>
   <Route path="/:title" element={<VideoPage/>} />
   <Route path="/SearchPage/:name" element={<SearchPage/>} />
   <Route path="/ChannelPage/:namee" element={<ChannelPage/>} />
    </Routes>
</Router>

   </>
  );
}

export default App;


