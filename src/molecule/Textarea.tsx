import React, {InputHTMLAttributes, ReactNode, TextareaHTMLAttributes} from 'react';
import styled from 'styled-components'
import Label from "./Label";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const Textarea: React.FC<Props> = (
  {
    ...props
  }) => {
  return (
    <CustomTextarea {...props} />
  )
}

export default Textarea;

const CustomTextarea = styled.textarea`
  resize: none;
  border: 1px solid ${({theme}) => theme.colors.gray400};
  box-shadow: none;
  border-radius: 4px;
  padding: 5px 10px;
  &:focus-visible {
    box-shadow: none;
    border: 1px solid ${({theme}) => theme.colors.primary};
    outline: none;
  }
  width: 100%;
`;
