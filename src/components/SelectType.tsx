import {Radio} from "../molecule";
import React, {ChangeEventHandler} from "react";

interface Props {
  data?: any;
  onChangeType?: ChangeEventHandler;
  checked?: boolean;
}

const SelectType: React.FC<Props> = (
  {
    data,
    onChangeType,
    checked
  }) => {
  return (
    <>
      <Radio
        id={"full"}
        name={"type"}
        value={"full"}
        label={"이미지 상"}
        onChange={onChangeType}
        checked={data?.type === "full"}
      />
      <Radio
        id={"left"}
        name={"type"}
        value={"left"}
        label={"이미지 좌"}
        onChange={onChangeType}
        checked={data?.type === "left"}
      />
      <Radio
        id={"right"}
        name={"type"}
        value={"right"}
        label={"이미지 우"}
        onChange={onChangeType}
        checked={data?.type === "right"}
      />
    </>
  )
}

export default SelectType;