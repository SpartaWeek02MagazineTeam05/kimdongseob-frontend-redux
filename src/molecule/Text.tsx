import React from 'react';
import styled from 'styled-components'

interface Props {
  color?: string;
}

const Text: React.FC<Props> = (
  {
    color,
    children,
  }) => {
  return (
    <CustomText color={color}>
      {children}
    </CustomText>
  );
};

export default Text;

const CustomText = styled.p`
  color: ${({theme}) => theme.colors.black};
  margin: 0;
`;
