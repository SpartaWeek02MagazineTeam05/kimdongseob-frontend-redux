import React, {InputHTMLAttributes, ReactNode} from 'react';
import styled from 'styled-components'
import Label from "./Label";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightBtn?: ReactNode;
}

const Input: React.FC<Props> = (
  {
    label,
    rightBtn,
    children,
    ...props
  }) => {
  return (
    <>
      {label ?
        <InputLabelWrapper>
          <Label text={label}/>
          <InputWrapper>
            <CustomInput {...props} />
            {rightBtn}
          </InputWrapper>
        </InputLabelWrapper>
        : <CustomInput {...props} />
      }
    </>
  )
}

export default Input;
const CustomInput = styled.input`
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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  
  button:last-child {
    margin-left: 4px;
  }
`;

const InputLabelWrapper = styled.div`
  margin: 16px 0;
`;

