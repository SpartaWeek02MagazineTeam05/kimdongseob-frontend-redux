import styled from "styled-components";

const PostListWrapper = styled.div`
  //position: relative;
`;
const CreateBtnWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  //transform: translateX(400px);
`;
const CreateBtn = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.primary};
  border:1px solid ${({theme}) => theme.colors.primary};
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
    transition: all 0.2s ease;
  }
`;

const CreateBtnDisabled = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.gray400};
  border:1px solid ${({theme}) => theme.colors.gray400};
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: all 0.2s ease;
`;

export {
  PostListWrapper,
  CreateBtn,
  CreateBtnDisabled,
  CreateBtnWrapper
}