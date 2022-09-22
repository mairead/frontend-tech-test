import styled from "styled-components";

// static asset handling in Vite?
const backgroundImage = new URL("../assets/stars.jpeg", import.meta.url).href;

const StyledBackground = styled.div`
  background: #111;
  color: white;
  background-image: url(${backgroundImage}) 0 0 no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledScores = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  p:last-child {
    margin-left: auto;
  }
`;

export { StyledBoard, StyledBackground, StyledScores };
