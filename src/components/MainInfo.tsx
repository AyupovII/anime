import { styled } from "styled-components";
import { TitleBlock } from "../styles/global";
import ReactStars from "react-stars";

const InfoBLock = styled.div`
min-width: 250px;
`

const Box = styled.div`
    
`
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 15px;
  @media (max-width: 860px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
}
`

const MainInfo = ({ data }: { data: any }) => {
  return (<Content>
    <InfoBLock>
      <TitleBlock>ИНФОРМАЦИЯ</TitleBlock>
      <div>Тип: {data.kind}</div>
      <div>Эпизоды: {data.episodes}</div>
      <div>Длительность эпизода: {data.duration} мин</div>
      <div>Статус: {data.status}</div>
      <div>Жанр: {data.genres?.[0]?.russian}</div>
      <div>Рейтинг: {data.rating}</div>
      <div>Альтернативные названия: {data.license_name_ru}</div>
      <div>У аниме: {data.kind}</div>
    </InfoBLock>
    <Box>
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
    </Box>
  </Content>)
}

export default MainInfo;