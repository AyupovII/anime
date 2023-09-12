import styled from "styled-components";
import loopIcon from "../../assest/img/loop.png"
import { useEffect } from "react";
import AnimeList from "../AnimeList";
import { fetchTodos, setIsAccumlateData, setParams } from "../../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";

const Main = styled.div`
  padding: 10px 40px 10px 40px;
  background-color: #f7f7f7;
  `;

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
   & > img{
    position: absolute;
    height: 30px;
    padding: 12px;
   } 
  `
const Content = () => {
  const params = useSelector((state: any) => state.todos.params);
  const dispatch = useDispatch();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setParams({ search: e.currentTarget.value, page: 0 }));
    dispatch(setIsAccumlateData(false));
  }
  useEffect(() => {
    dispatch(fetchTodos(params) as unknown as AnyAction);
  }, [params])

  return <Main>
    <H1>Поиск аниме</H1>
    <InputContainer>
      <img src={loopIcon} alt="Поиск" />
      <input type="text" placeholder="Что вы ищете?" onChange={onChange} />
    </InputContainer>
    <AnimeList />
  </Main>
};

export default Content;

