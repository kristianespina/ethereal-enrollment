import React from "react";
import { Text, Select, Box } from "@chakra-ui/react";

type Props = {
  options: string[];
  value?: string;
  label: string;
  placeholder?: string;
  onChange: (e: any) => void;
};

const SelectInput = ({
  options,
  value,
  label,
  placeholder,
  onChange,
}: Props) => {
  return (
    <Box>
      <Text fontWeight="bold" fontSize={12} mb={1}>
        {label}
      </Text>
      <Select
        variant="filled"
        bgColor="gray.200"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
