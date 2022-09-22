import styled from "styled-components";

const StyledCard = styled.div`
  // opacity: ${(props) => (props.isActive ? `1` : `0.7`)};
  min-height: 532px;
  width: 320px;
  border-radius: 4px;
  background-color: #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const StyledHeading = styled.h2`
  background: #ffc625;
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #000000;
  padding: 24px 0 24px 0;
  margin: 0;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  text-indent: 24px;
`;

const StyledImage = styled.img`
  height: 175px;
  width: 320px;
  object-fit: cover;
`;

const StyledCategories = styled.ul`
  padding: 32px 24px 24px 24px;
`;

export { StyledHeading, StyledCard, StyledImage, StyledCategories };
