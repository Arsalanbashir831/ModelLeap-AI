import { SmallAddIcon, AddIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const NewChatButton = ({ onClick }) => {
  return (
    <Button
      leftIcon={<AddIcon/>}
      bg="#ff914d"
    //   border="2px solid #ba2cc1"
      color="white"
      _hover={{ bg: "#1e2a39", borderColor: "#00BFFF" }}
      _active={{ bg: "#24303f" }}
      borderRadius="md"
      px={6}
      py={4}
      fontWeight="bold"
      fontSize={{ base: "sm", md: "md" }}
      onClick={onClick}
    >
      Create
    </Button>
  );
};

export default NewChatButton;
