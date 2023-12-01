import { styled } from "styled-components";

export const GridBox = styled.div`
display: grid;
grid-template-columns: repeat(10, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 10px;
grid-row-gap: 5px;
justify-items: center;
@media (max-width: 1200px){
  grid-template-columns: repeat(9, 1fr);
};
@media (max-width: 1070px){
  grid-template-columns: repeat(8, 1fr);
};
@media (max-width: 970px){
  grid-template-columns: repeat(7, 1fr);
};
@media (max-width: 850px){
  grid-template-columns: repeat(6, 1fr);
};
@media (max-width: 750px){
  grid-template-columns: repeat(5, 1fr);
};
@media (max-width: 650px){
  grid-template-columns: repeat(4, 1fr);
};
@media (max-width: 550px){
  grid-template-columns: repeat(3, 1fr);
};
@media (max-width: 450px){
  grid-template-columns: repeat(2, 1fr);
};
`;

export const TitleBlock = styled.div`
background-color: #d6d3d3;
font-weight: 600;
color: black;
padding-left: 10px;
width: 100%;
`;

export const Main = styled.div`
padding: 10px 40px 10px 40px;
/* background-color: #f7f7f7; */
`;