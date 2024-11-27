import { styled } from "styled-components";
import { TitleBlock } from "../styles/global";
import ReactStars from "react-stars";

const InfoBLock = styled.div`
/* min-width: 250px; */
flex: 1;
`

const Box = styled.div`
    flex: 1;
    min-width: 225px;
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  flex-grow: 1;
`

const MainInfo = ({ data }: { data: any }) => {
  return (
    <Content>
      <InfoBLock style={{ minWidth: 225 }}>
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
        <InfoBLock style={{ minWidth: 225 }}>
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