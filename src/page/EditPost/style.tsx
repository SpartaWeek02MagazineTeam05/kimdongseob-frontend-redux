import styled from "styled-components";


const SelectTypeInner = styled.div`
  display: flex;

  > div {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
const SelectTypeWrapper = styled.div`
  padding: 1rem;
  background-color: ${({theme}) => theme.colors.gray200};
  border-radius: 8px;
  margin: 1rem 0;

  > div {
    margin-top: 1rem;
  }
`;

const CreateListWrapper = styled.div`
  //max-width: 300px;
`;
const CreateWrapper = styled.div`
  width: 100%;
  //border: 1px solid red;
`;
const CreateBody = styled.div`
  > p {
    padding: 0 16px;
  }
`;

export {
  SelectTypeInner,
  SelectTypeWrapper,
  CreateListWrapper,
  CreateWrapper,
  CreateBody,
}