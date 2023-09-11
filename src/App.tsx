import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { fetchTodos } from './toolkitRedux/toolkitReducer';
import { AnyAction } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch();
  const animeList = useSelector((state: any)=> state.todos.data);
  console.log(animeList);
  useEffect(()=>{
    dispatch(fetchTodos({search: ""}) as unknown as AnyAction)
  },[])
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
