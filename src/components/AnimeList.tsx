import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { AnyAction } from "@reduxjs/toolkit";

const AnimeList = () => {
  const animeList = useSelector((state: any) => state.todos.data);
  const loading = useSelector((state: any) => state.todos.loading);
  const FlexBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 15px;
  `
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
        dispatch(fetchTodos(params) as unknown as AnyAction)
        dispatch(setParams({ page: params.page + 1 }))
        console.log("Visible");
      }
    })
    if (node) observer.current.observe(node);
  }, [hasMore, loading, params]);

  return (<>
    {<FlexBox>
      {
        animeList.map((anime: any, index: number) => {
          return (

            <Box ref={(animeList.length === index + 1) ? observerBlock : null}>
              <img
                src={"https://shikimori.one/" + anime.image.x96}
                alt={anime.russian} width={"100px"} height={"150px"}
              />
              <Title>
                {
                  anime.russian ? anime.russian : anime.name
                }</Title>
            </Box>

          )
        })
      }
    </FlexBox>}
  </>
  )
}

export default AnimeList;