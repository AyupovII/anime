import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchAnime } from "../toolkitRedux/anime";
import { FlexBox, Main, TitleBlock } from "../styles/global";
import styled from "styled-components";
import ReactStars from 'react-stars'
import Loading from "../components/Loader";
import PreviewVideos from "../components/PreviewVideos";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Anime = () => {
  const data = useSelector((state: any) => state.anime.animeData);
  const loading = useSelector((state: any) => state.anime.loading);
  const dispatch = useDispatch();
  const { id = "" } = useParams();
  useEffect(() => {
    dispatch(fetchAnime(id) as unknown as AnyAction);
  }, [])

  const InfoBLock = styled.div`
    min-width: 150px;
    min-height: 100px;
    
  `
  return (<Main>
    {loading ? <Loading /> :
      <>
        <div>
          {data?.russian + " / " + data.name}
        </div>
        <FlexBox direction="column" ><FlexBox style={{ justifyContent: "normal", columnGap: "30px" }}>
          <InfoBLock>
            <img
              src={"https://shikimori.one/" + data.image?.original}
              alt={data.name}
            />
          </InfoBLock>
          <InfoBLock>
            <TitleBlock>ИНФОРМАЦИЯ</TitleBlock>
            <div>Тип: {data.kind}</div>
            <div>Эпизоды: {data.episodes}</div>
            <div>Длительность эпизода: {data.duration} мин</div>
            <div>Статус:{data.status}</div>
            <div>Жанр: {data.genres?.[0]?.russian}</div>
            <div>Рейтинг: {data.rating}</div>
            <div>Альтернативные названия: {data.license_name_ru}</div>
            <div>У аниме: {data.kind}</div>
          </InfoBLock>
          <FlexBox direction={"column"} style={{ justifyContent: "normal" }}>
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
            <InfoBLock>
              <TitleBlock>СТУДИИ</TitleBlock>
              <div>{data.studios?.map(({ name }: { name: string }) => name).join(", ")}</div>
            </InfoBLock>
          </FlexBox>
          <InfoBLock>
            <TitleBlock>СТАТУСЫ</TitleBlock>
            <ResponsiveContainer width={700} height={300}>
              <BarChart
                width={500}
                height={300}
                data={data.rates_statuses_stats}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6f69e7" />
              </BarChart>
            </ResponsiveContainer>
          </InfoBLock>

        </FlexBox>
          <InfoBLock>
            <TitleBlock>ОПИСАНИЕ</TitleBlock>
            {!!data.description ? <>
              <div><script>{data.description_html}</script></div>
              <div dangerouslySetInnerHTML={{ __html: data.description_html }} />
            </> :
              <div>Нет описания</div>
            }

          </InfoBLock>
        </FlexBox>
        <InfoBLock>
          <TitleBlock>ВИДЕО</TitleBlock>
          <PreviewVideos id={id} />
        </InfoBLock>
      </>}

  </Main >)
}

export default Anime;