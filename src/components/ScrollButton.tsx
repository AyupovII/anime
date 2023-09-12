import { useState } from "react";
import arrowUpIcon from "../assest/img/arrow-up.png"
import { styled } from "styled-components";

export const Button = styled.div`
   position: fixed; 
   right: 0%;
   bottom: 0;
   z-index: 1;
   cursor: pointer;
   background-color: green;
   border-radius: 50%;
   opacity: 80%;
   & > img{
     padding: 15px;
   }
   &:hover{
    opacity: 100%;
   }
`

const ScrollButton = () =>{
  
  const [visible, setVisible] = useState<Boolean>(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <Button>
     <img src={arrowUpIcon} onClick={scrollToTop} alt="dawd" width={"25px"} 
     style={{display: visible ? 'inline' : 'none'}} />
    </Button>
  );
}
  
export default ScrollButton;