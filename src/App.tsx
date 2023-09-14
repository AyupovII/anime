import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Anime from './pages/Anime';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        
        <Route path="/" element={<Navigate to="/anime" />} />
        <Route path="/anime" element={<Home />} />
        <Route path="/anime/:id" element={<Anime />} />
      </Routes>


    </div>
  );
}

export default App;
