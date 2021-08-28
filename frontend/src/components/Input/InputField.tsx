import React from "react";
import { Text, Input, Box } from "@chakra-ui/react";

type Props = {
  value?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  required?: boolean;
};

const InputField = ({ value, label, onChange, password, required }: Props) => {
  return (
    <Box>
      <Text fontSize="sm" color="gray.600" fontWeight="bold">
        {label}
      </Text>
      <Input
        type={password ? "password" : "text"}
        value={value ? value : ""}
        variant="filled"
        mt={0}
        onChange={onChange}
        required={required}
      />
    </Box>
  );
};

export default InputField;
