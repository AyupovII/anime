import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { AnyAction } from "@reduxjs/toolkit";
import { NavLink, useRoutes } from "react-router-dom";
import { FlexBox } from "../styles/global";

const Box = styled.div`
    padding-bottom: 15px;
    cursor: pointer;
    max-width: 100px;
    &:hover{
      background-color: rgba(0,0,0,0.3);
      filter: brightness(40%);
    }
    /* @media (min-width: 300px){
      width: 50%;
    }
    @media (min-width: 600px){
      width: 33%;
    }
    @media (min-width: 900px){
      width: 15%;
    } */
  `
const Title = styled.div`
    text-align: center;
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `
const AnimeList = () => {
  const animeList = useSelector((state: any) => state.todos.data) as Array<any>;
  const loading = useSelector((state: any) => state.todos.loading);

  const dispatch = useDispatch();

  const observer = useRef<IntersectionObserver | null>(null);
  const params = useSelector((state: any) => state.todos.params);
  const hasMore = useSelector((state: any) => state.todos.hasMore);
  const observerBlock = useCallback((node: HTMLInputElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(enteries => {
      console.log("Visible1", hasMore);

      if (enteries[0].isIntersecting && hasMore) {
        dispatch(setIsAccumlateData(true));
        dispatch(setParams({ page: params.page + 1 }))
        dispatch(fetchTodos(params) as unknown as AnyAction);
      }
    })
    if (node) observer.current.observe(node);
  }, [hasMore, loading]);

  return (<>
    {<FlexBox>
      {
        animeList?.map((anime: any, index: number) => {
          return (
            <NavLink to={`${anime.id}`} >
              <Box
                key={`${index}_${anime.id}`}
                ref={(animeList?.length === index + 1) ? observerBlock : null}
              >
                <img
                  src={"https://shikimori.one/" + anime.image.x96}
                  alt={anime.russian} width={"100px"} height={"150px"}
                />
                <Title>
                  {
                    anime.russian ? anime.russian : anime.name
                  }</Title>
              </Box>
            </NavLink>
          )
        })
      }
    </FlexBox>}
  </>
  )
}

export default AnimeList;