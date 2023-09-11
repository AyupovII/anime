import { useSelector } from "react-redux";
import { styled } from "styled-components";

const AnimeList = () => {
  const animeList = useSelector((state: any) => state.todos.data);
  console.log(animeList);
  const FlexBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
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
  return (
    <FlexBox>
      {
        animeList.map((anime: any) => {
          return (
            <Box>
              <img
                src={"https://shikimori.one/" + anime.image.x96}
                alt={anime.russian} width={"100px"}
              />
              <Title>
                {
                  anime.russian ? anime.russian : anime.name
                }</Title>
            </Box>

          )
        })
      }
    </FlexBox>
  )
}

export default AnimeList;