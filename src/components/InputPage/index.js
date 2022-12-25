import React from "react";
import InputTextField from "../../containers/InputText";
import DropdownMenu from "../../containers/Dropdown";

const InputPage = () => {
  return (
    <>
      <DropdownMenu />
      <InputTextField title="Hi" />
    </>
  );
};

export default InputPage;
