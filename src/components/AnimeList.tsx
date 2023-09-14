import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { AnyAction } from "@reduxjs/toolkit";
import { NavLink, useRoutes } from "react-router-dom";
import { FlexBox } from "../styles/global";

const BoxItem = styled.div`
    padding-bottom: 15px;
    cursor: pointer;
    width: 100px;
    &:hover{
      background-color: rgba(0,0,0,0.3);
      filter: brightness(40%);
    }
    & > img{
     
      @media (max-width: 600px){
      width: 150px;
    }
     @media (max-width: 580px){
      width: 200px
    }
    }
   
    @media (max-width: 600px){
      width: 150px
    } @media (max-width: 580px){
      width: 200px
    }
    @media (max-width: 520px){
      width: 300px
    }
  `
const Title = styled.div`
    text-align: center;
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
const Box = styled.div`
  padding: 10px 0px;
`
const AnimeList = () => {
  const animeList = useSelector((state: any) => state.todos.data) as Array<any>;
  const loading = useSelector((state: any) => state.todos.loading);
console.log(animeList);
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

  return (<Box>
    {<FlexBox>
      {
        animeList?.map((anime: any, index: number) => {
          return (
            <NavLink to={`${anime.id}`} key={`${index}_${anime.id}`}>
              <BoxItem
                
                ref={(animeList?.length === index + 1) ? observerBlock : null}
              >
                <img
                  src={"https://shikimori.one/" + anime.image.x96}
                  alt={anime.russian}
                />
                <Title>
                  {
                    anime.russian ? anime.russian : anime.name
                  }</Title>
              </BoxItem>
            </NavLink>
          )
        })
      }
    </FlexBox>}
  </Box>
  )
}

export default AnimeList;