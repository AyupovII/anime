import { styled, keyframes } from "styled-components";

const spin = keyframes`
   from { transform: rotate(0deg); }
   to { transform: rotate(360deg); }
`;

const Spinner = styled.div`  
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
  `

const SpinerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
`

export default function Loader() {
  return (
    <SpinerContainer>
      <Spinner />
    </SpinerContainer>
  );
}