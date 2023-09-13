import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAnime } from "../toolkitRedux/anime";
import { FlexBox, Main, TitleBlock } from "../styles/global";
import styled from "styled-components";
import ReactStars from 'react-stars'

const Anime = () => {
  const data = useSelector((state: any) => state.anime.animeData)
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(fetchAnime(params.id) as unknown as AnyAction)
  }, [])

  const InfoBLock = styled.div`
    min-width: 150px;
  `
  return (<Main>
    <div>
      {data.russian + " / " + data.name}
    </div>
    <FlexBox direction="column"><FlexBox>
      <InfoBLock>
        <img
          src={"https://shikimori.one/" + data.image?.original}
          alt={data.name}
        />
      </InfoBLock>
      
        {/* //////////// */}

        {/* /////////////// */}
        <InfoBLock>
          <TitleBlock>ИНФОРМАЦИЯ</TitleBlock>
          <div>Тип: {data.kind}</div>
          <div>Эпизоды: {data.episodes}</div>
          <div>Длительность эпизода: {data.duration} мин</div>
          <div>Статус:{data.status}</div>
          <div>Жанр: {data.genres?.[0].russian}</div>
          <div>Рейтинг: {data.rating}</div>
          <div>Альтернативные названия: {data.license_name_ru}</div>
          <div>У аниме: {data.kind}</div>
        </InfoBLock>
        <FlexBox direction={"column"} style={{justifyContent: "normal"}}>
          {/* ////////////////// */}
          <InfoBLock>
            <TitleBlock>РЕЙТИНГ</TitleBlock>
            <div>{data.score}</div>
            <ReactStars
              value={data.score / 2}
              edit={false}
              count={5}
              size={50}
              color2={'#ffd700'} />
          </InfoBLock>
          {/* ///////////// */}
          <InfoBLock>
            <TitleBlock>СТУДИИ</TitleBlock>
            <div>{data.studios?.map(({ name }: { name: string }) => name).join(", ")}</div>
          </InfoBLock>
        </FlexBox>

      </FlexBox>
      <InfoBLock>
        <TitleBlock>ОПИСАНИЕ</TitleBlock>
        <div>Тип: {data.description}</div>
      </InfoBLock>
    </FlexBox>
  </Main>)
}

export default Anime;