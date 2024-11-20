import styled from "styled-components";
import loopIcon from "../assest/img/loop.png";
import filterIcon from "../assest/img/filter.png";
import { useEffect, useMemo } from "react";
import AnimeList from "./AnimeList";
import { fetchTodos, setIsAccumlateData, setOpenFilter, setParams } from "../toolkitRedux/toolkitReducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Main } from "../styles/global";
import { debounce } from "lodash";


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

  `;
const ImgSearch = styled.img`
    position: absolute;
    height: 30px;
    padding: 12px;
`;
const ImgFilter = styled.img<{ isChange: boolean }>`
    position: absolute;
    height: 24px;
    padding: 12px;
    right: 40px;
    cursor: pointer;
    background-color: ${(props) => props.isChange ? " rgba(0,0,0,0.1)" : ""};
`;

const Content: React.FC = () => {

  const params = useSelector((state: any) => state.todos.params);
  const search = useSelector((state: any) => state.todos.params.search);
  const openFilter = useSelector((state: any) => state.todos.openFilter);
  const genresChange = useSelector((state: any) => state.todos.params.genre);
  const dispatch = useDispatch();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    dispatch(setParams({ search: value, page: 1 }));
    dispatch(setIsAccumlateData(false));
    dispatch(fetchTodos({ ...params, search: value }) as unknown as AnyAction);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(onChange, 500),
    []
  );
  const onClickFilter = () => {
    dispatch(setOpenFilter(!openFilter));
  }

  useEffect(() => {
    dispatch(fetchTodos(params) as unknown as AnyAction);
  }, [search]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, []);

  return <Main>
    <H1>Поиск аниме</H1>
    <InputContainer>
      <ImgSearch src={loopIcon} alt="Поиск" />
      <input type="text" placeholder="Что вы ищете?" defaultValue={search} onChange={debouncedChangeHandler} />
      <ImgFilter src={filterIcon} alt="Фильтр" onClick={onClickFilter} isChange={!!genresChange.length} />
    </InputContainer>
    <AnimeList filterOpen={openFilter} />
  </Main>
};

export default Content;

