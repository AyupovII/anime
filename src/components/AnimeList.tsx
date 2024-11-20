import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, keyframes } from "styled-components";
import { fetchTodos, setIsAccumlateData, setParams } from "../toolkitRedux/toolkitReducer";
import { AnyAction } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { GridBox } from "../styles/global";
import backgroundIcon from "../assest/img/backgroundIcon.jpg"
import Filter from "./Filter";


export const ImageBox = styled.div`
  background: url(${backgroundIcon}) no-repeat center center;
  min-height: 150px;
  /* overflow: hidden; */
  &>img{
    transition: all 0.3s ease-in-out;
  }
`
const Title = styled.div`
    text-align: center;
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px 5px;
  `;

const BoxItem = styled.div`
    cursor: pointer;
    min-height: 210px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    max-width: 200px;
    
    &:hover{
      background-color: rgba(0,0,0,0.3);
      & > ${Title}{
        color: white;
    };
    & > ${ImageBox} > img{
      /* filter: brightness(40%); */
      transform: scale(1.1);
    };
    }
    & > ${ImageBox} > img{
      border-radius: 5px;
      width: 100%;
    };
    & > ${ImageBox}{
      background-size: 105%;
    };
  `
const Box = styled.div`
  padding: 10px 0px;
`

const AnimeList = ({ filterOpen }: { filterOpen: boolean }) => {
  const animeList = useSelector((state: any) => state.todos.data) as Array<any>;
  const loading = useSelector((state: any) => state.todos.loading);
  const dispatch = useDispatch();

  const observer = useRef<IntersectionObserver | null>(null);
  const params = useSelector((state: any) => state.todos.params);
  const hasMore = useSelector((state: any) => state.todos.hasMore);
  const openFilter = useSelector((state: any) => state.todos.openFilter);


  const observerBlock = useCallback((node: HTMLInputElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(enteries => {
      if (enteries[0].isIntersecting && hasMore) {
        dispatch(setIsAccumlateData(true));
        dispatch(setParams({ page: params.page + 1 }))
        dispatch(fetchTodos(params) as unknown as AnyAction);
      }
    })
    if (node) observer.current.observe(node);
  }, [hasMore, loading]);

  return (
    <Box>
      {openFilter && <Filter />}
      {animeList.length ?
        <GridBox>
          {
            animeList?.map((anime: any, index: number) => {
              return (
                <NavLink to={`${anime.id}`} key={`${index}_${anime.id}`} style={{ textDecoration: "none", color: "black", flex: 1, flexShrink: 0, flexGrow: 1, flexBasis: 120 }}>
                  <BoxItem

                    ref={(animeList?.length === index + 1) ? observerBlock : null}
                  >
                    <ImageBox>
                      <img
                        src={"https://shikimori.one/" + anime.image.x96}
                        alt={anime.russian}
                      />
                    </ImageBox>
                    <Title>
                      {
                        anime.russian ? anime.russian : anime.name
                      }
                    </Title>
                  </BoxItem>
                </NavLink>
              )
            })
          }
        </GridBox> : !loading ? "Ничего не найдено" : null}
    </Box>
  )
}

export default AnimeList;