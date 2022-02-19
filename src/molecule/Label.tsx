import React from 'react';
// import styled from 'styled-components'

interface Props {
    text: string;
}
const Label: React.FC<Props> = (
  {
    text,
    ...props
  }) => {
  return (
    <>
      <label {...props}>{text}</label>
    </>
  )
}

export default Label;
// const Wrapper = styled.label`
//
// `;
