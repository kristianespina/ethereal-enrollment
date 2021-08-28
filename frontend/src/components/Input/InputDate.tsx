import React from "react";
import { Text, Box } from "@chakra-ui/react";

import DatePicker from "./DatePicker";

type Props = {
  label: string;
  placeholder?: string;
  onChange: (d: Date) => void;
  value?: Date;
};
const InputDate = ({ value, label, placeholder, onChange }: Props) => {
  return (
    <Box>
      <Text fontWeight="bold" fontSize={12} mb={1}>
        {label}
      </Text>
      <DatePicker
        placeholderText={placeholder}
        onChange={onChange}
        selected={value}
        required
      />
    </Box>
  );
};

export default InputDate;
