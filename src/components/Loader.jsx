import { Spinner, HStack, Center } from "@chakra-ui/react";

const Loader = () => {
  return (
    <HStack
      // w={"full"}
      h={"90vh"}
      alignItems={"center"}
      justifyContent={"Center"}
    >
      <Spinner color="black" padding={20} thickness="10px" />
    </HStack>
  );
};

export default Loader;
