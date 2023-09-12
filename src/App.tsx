import './App.css';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import ScrollButton from './components/ScrollButton';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <ScrollButton/>
    </div>
  );
}

export default App;
