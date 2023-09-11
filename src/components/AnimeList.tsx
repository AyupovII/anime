import { useSelector } from "react-redux";
import { styled } from "styled-components";

const AnimeList = () => {
  const animeList = useSelector((state: any) => state.todos.data);

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
    max-width: 284px;
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
    font-size: 20px
  `
  return (
    <FlexBox>
      {
        animeList.map((anime: any) => {
          return (
            <Box>
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.slug} width={"284px"} />
              <Title>
                {
                  anime.attributes.titles.en ?? anime.attributes.titles.en_jp
                }</Title>
            </Box>

          )
        })
      }
    </FlexBox>
  )
}

export default AnimeList;