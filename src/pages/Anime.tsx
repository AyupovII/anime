import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAnime } from "../toolkitRedux/anime";
import { GridBox, Main, TitleBlock } from "../styles/global";
import styled from "styled-components";
import ReactStars from 'react-stars'
import Loading from "../components/Loader";
import PreviewVideos from "../components/PreviewVideos";
import MainInfo from "../components/MainInfo";

const Anime = () => {
  const data = useSelector((state: any) => state.anime.animeData);
  const loading = useSelector((state: any) => state.anime.loading);
  const dispatch = useDispatch();
  const { id = "" } = useParams();
  useEffect(() => {
    dispatch(fetchAnime(id) as unknown as AnyAction);
  }, [])

  const InfoBLock = styled.div`
    /* min-width: 250px; */
    background-color: rgba(0,0,0,0.1);

  `
  const Box = styled.div`
    
  `
  const MainInfoStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 10px;
  `
  const InfoContent = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    column-gap: 15px;
    row-gap: 10px;
    @media (max-width: 768px) {
    flex-wrap: wrap;
};
  `;
  return (<Main>
    {loading ? <Loading /> :
      <>
        <div>
          {data?.russian + " / " + data.name}
        </div>
        <InfoContent>
          <InfoBLock>
            <img
              src={"https://shikimori.one/" + data.image?.original}
              alt={data.name}
            />
          </InfoBLock>
          <MainInfo data={data} />
        </InfoContent>
        <InfoBLock>
          <TitleBlock>ОПИСАНИЕ</TitleBlock>
          <div><script>{data.description_html}</script></div>
          <div dangerouslySetInnerHTML={{ __html: data.description_html }} />
        </InfoBLock>
        <PreviewVideos id={id} />
      </>
    }
  </Main >)
}

export default Anime;