import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About';
import NotFound from "./pages/NotFound.jsx"; // 👈 Import your 404 page



function App() {
  return (
    <>
      

      <Routes>
       <Route path ="/" element={<Home/>} ></Route>
       <Route path ="/about" element={<About/>} ></Route>
       <Route path="*" element={<NotFound />} /> {/* 👈 404 page here */}


      </Routes>
    </>
  );
}

export default App;
