import styled from "styled-components";


const ReactWrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${({theme}) => theme.colors.grayBg};
  height: 60px;
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export {
  ReactWrapper,
  Wrapper,
  BtnGroup,
}