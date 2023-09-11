import styled from "styled-components";
import loopIcon from "../../assest/img/loop.png"
import { useEffect } from "react";
import { useGetPokemonByNameQuery } from "../../services/anime";
import AnimeList from "../AnimeList";

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

  return <Main>
    <H1>Поиск аниме</H1>
    <InputContainer>
      <img src={loopIcon} alt="Поиск" />
      <input type="text" placeholder="Что вы ищете?" />
    </InputContainer>
    <AnimeList />
  </Main>
};

export default Content;

