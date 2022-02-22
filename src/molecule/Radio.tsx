import React, {ChangeEventHandler} from 'react';
import styled from 'styled-components'

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler;
  label?: string;
}

const Radio: React.FC<Props> = (
  {
    id,
    value,
    name,
    checked,
    onChange,
    label,
  }) => {
  return (
    <Wrapper>
      <input
        id={id}
        value={value}
        name={name}
        type={"radio"}
        checked={checked}
        onChange={onChange}
      />
      <CustomLabel htmlFor={id}>{label}</CustomLabel>
    </Wrapper>
  );
};

export default Radio;

const Wrapper = styled.div`
  // color: ${({theme}) => theme.colors.black};
  display: flex;
  align-items: center;
`;
const CustomLabel = styled.label`
  color: ${({theme}) => theme.colors.black};
  margin-left: 8px;
`;