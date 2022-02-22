import React from 'react';
import styled from 'styled-components'

interface Props {
  color?: string;
  style?: any;
}

const Text: React.FC<Props> = (
  {
    color,
    children,
    style,
  }) => {
  return (
    <CustomText color={color} style={style}>
      {children}
    </CustomText>
  );
};

export default Text;

const CustomText = styled.p`
  color: ${({theme}) => theme.colors.black};
  margin: 0;
`;
