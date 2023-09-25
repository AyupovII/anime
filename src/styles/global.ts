import { styled } from "styled-components";

interface PropsFlexBox {
  direction?: "row" | "column"
}

export const FlexBox = styled.div<PropsFlexBox>`
display: flex;
flex-wrap: wrap;
flex-direction: row;
column-gap: 15px;
flex-direction: ${p=>p.direction};
`;

export const TitleBlock = styled.div`
background-color: #d6d3d3;
font-weight: 600;
color: black;
padding-left: 15px;
width: 100%;
`;

export const Main = styled.div`
padding: 10px 40px 10px 40px;
background-color: #f7f7f7;
`;