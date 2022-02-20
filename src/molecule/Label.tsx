import React from 'react';
import styled from 'styled-components'

interface Props {
  text: string;
}

const Label: React.FC<Props> = (
  {
    text,
    ...props
  }) => {
  return (
    <CustomLabel {...props}>{text}</CustomLabel>
  )
}

export default Label;
const CustomLabel = styled.label`
  color: ${({theme}) => theme.colors.black};
`;
