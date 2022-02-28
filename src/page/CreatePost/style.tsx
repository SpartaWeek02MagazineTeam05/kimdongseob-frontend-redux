import styled from "styled-components";

export const CreateListWrapper = styled.div`
  //max-width: 300px;
`;
export const CreateWrapper = styled.div`
  width: 100%;
  //border: 1px solid red;
`;
export const CreateBody = styled.div`
  > p {
    padding: 0 16px;
  }
`;
export const SelectTypeInner = styled.div`
  display: flex;

  > div {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
export const SelectTypeWrapper = styled.div`
  padding: 1rem;
  background-color: ${({theme}) => theme.colors.gray200};
  border-radius: 8px;
  margin: 1rem 0;

  > div {
    margin-top: 1rem;
  }
`;