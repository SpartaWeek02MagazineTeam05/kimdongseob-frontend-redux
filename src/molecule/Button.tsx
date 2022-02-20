import React, {ButtonHTMLAttributes} from 'react';
import styled, {css} from 'styled-components'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined';
  fluid?: boolean;
}

const Button: React.FC<Props> = (
  {
    children,
    variant,
    fluid,
    ...props
  }) => {
  return (
    <CustomBtn fluid={fluid} variant={variant} {...props}>
      <div>
        {children}
      </div>
    </CustomBtn>
  )
}

Button.defaultProps = {
  variant: "contained"
}

export default Button;

const CustomBtn = styled.button<Props>`
  width: ${({fluid}) => fluid ? '100%' : 'auto'};
  background-color: ${({variant, theme}) => {
  if (variant === "contained") {
    return theme.colors.primary;
  } else {
    return theme.colors.white;
  }
}};
  color: ${({variant, theme}) => {
  if (variant === "contained") {
    return theme.colors.white;
  } else {
    return theme.colors.primary;
  }
}};
  border-radius: 4px;
  box-shadow: none;
  outline: none;
  border: 1px solid ${({variant, theme}) => {
  if (variant === "contained") {
    return theme.colors.primary;
  } else {
    return theme.colors.primary;
  }
}};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
 `;