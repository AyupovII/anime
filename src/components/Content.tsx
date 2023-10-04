import styled from "styled-components";
import loopIcon from "../assest/img/loop.png"
import filterIcon from "../assest/img/filterIcon.png"
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import AnimeList from "./AnimeList";
import { fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Main } from "../styles/global";
import { debounce } from "lodash"


const H1 = styled.div`
color: black;
font-size: 30px;
font-weight: 600;
padding: 10px 0;
`
const InputContainer = styled.div`
  display: flex;

   & > input{
    background-color: white;
    border-radius: 5px;
    color: grey;
    font-size: 24px;
    padding: 0 50px;
    height: 50px;
    width: 100%;
    box-sizing: border-box;
   };
   & img:first-child{
    position: absolute;
    height: 30px;
    padding: 12px;
   };
   & img:last-child{
    position: absolute;
    padding: 7px;
    right: 40px;
    width: 35px;
    color: grey;
    cursor: pointer;
    &:hover{
      background-color: #acacac8b;
      border-radius: 8px;
    }
   } 
  `

const Content = () => {

  const params = useSelector((state: any) => state.todos.params);
  const search = useSelector((state: any) => state.todos.params.search);
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  
  const onChange = useCallback((async (e: BaseSyntheticEvent) => {
      console.log(e);
      dispatch(setParams({ search: e.target.value, page: 1 }));
      dispatch(setIsAccumlateData(false));
      debounceFunc(e);
  }),[]);


const debounceFunc=(debounce((e: BaseSyntheticEvent)=>{
  dispatch(fetchTodos({ ...params, search: e.target.value }) as unknown as AnyAction)
}, 600));

  return <Main>
    <H1>Поиск аниме</H1>
    <InputContainer>
      <img src={loopIcon} alt="Поиск" />
      <input type="text" placeholder="Что вы ищете?" value={search} onChange={onChange} />
      <img src={filterIcon} alt="Фильтр" onClick={()=>setFilterOpen(!filterOpen)}/>
    </InputContainer>
    <AnimeList filterOpen={filterOpen} />
  </Main>
};

export default Content;

