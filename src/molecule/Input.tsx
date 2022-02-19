import React, {InputHTMLAttributes, ReactNode} from 'react';
// import styled from 'styled-components'
import Label from "./Label";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
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
                <>
                    <Label text={label}/>
                    <div>
                        <input {...props} />
                        {rightBtn}
                    </div>
                </>
                : <input {...props} />}
        </>
    )
}

export default Input;
// const Wrapper = styled.input`
//
// `;
