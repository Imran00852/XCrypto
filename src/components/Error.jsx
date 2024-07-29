import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Center,
} from "@chakra-ui/react";

const Error = ({msg}) => {
  return (
    <HStack h={"70vh"} w={"40%"} m={"auto"} alignItems={"center"}>
      <Alert status="error">
        <AlertIcon />
        {msg}
      </Alert>
    </HStack>
  );
};

export default Error;
