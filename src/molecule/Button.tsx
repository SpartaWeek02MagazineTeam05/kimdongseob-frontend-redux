import React, {ButtonHTMLAttributes} from 'react';
// import styled from 'styled-components'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const Button: React.FC<Props> = (
  {
    children,
    ...props
  }) => {
  return (
    <button {...props}>
      <div>
        { children }
      </div>
    </button>
  )
}

export default Button;
// const Wrapper = styled.button`
//
// `;
