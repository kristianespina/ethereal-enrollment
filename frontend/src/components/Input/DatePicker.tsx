import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useColorMode } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

function DatePicker(props: ReactDatePickerProps) {
  const { isClearable = false, showPopperArrow = false, ...rest } = props;
  const isLight = useColorMode().colorMode === "light"; //you can check what theme you are using right now however you want

  return (
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text"
        {...rest}
      />
    </div>
  );
}

export default DatePicker;
