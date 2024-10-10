import React from "react";
import { Box, Flex, Heading, Container, Stack } from "@chakra-ui/react";
import SupportForm from "../../Components/Dashboard/SupportForm";
import Header from "../../Components/Dashboard/Header";

const Support = () => {
  return (
    <Container maxW="container.xl" p={3}>
      <Stack spacing={1}>
        <Flex
          justify="center"
          align="center"
          bg="transparent"
          p={1}
        //   borderRadius="md"
        //   boxShadow="md"
        >
          <Header title="Support" />
        </Flex>

        <Box
          bg="transparent"
          p={2}
        //   borderRadius="md"
        //   boxShadow="lg"
          w={["100%", "80%", "60%"]}
          mx="auto"
        >
          <SupportForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default Support;
