import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text, Heading, VStack, HStack, Divider, Button, Badge, Tooltip, Flex } from "@chakra-ui/react";
import { FaCrown, FaKey } from "react-icons/fa";
import userState from "../../atoms/userState";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Dashboard/Header";
import { useTheme } from "../../Themes/ThemeContext";

const Usage = () => {
  const userContext = useRecoilValue(userState);

  useEffect(() => {}, [userContext]);

  const {
    generatedImages,
    tokensCount,
    subscriptionTier,
    subscriptionStatus,
    apiKey,
    subscriptionPlan,
    tokenCount,
    cancelAt,
    cancelAtPeriodEnd,
  } = userContext || {};


  const {theme} = useTheme()
  return (
    <>
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
   
    <Box p={8} bg={theme.background} borderRadius="lg" boxShadow="xl" maxW="800px" mx="auto" mt={8}>
      <Heading as="h2" size="lg" mb={6} color={theme.textColor}>
        Usage Overview
      </Heading>
      <VStack spacing={6} align="stretch">
        {/* Subscription Info */}
        <Box p={4} bg={theme.background} borderRadius="md" boxShadow="md">
          <HStack justifyContent="space-between">
            <Heading as="h3" size="md" color={theme.textColor}>
              Subscription Plan
            </Heading>
            <Badge colorScheme={subscriptionStatus === "active" ? "green" : "red"}>{subscriptionStatus}</Badge>
          </HStack>
          <Divider my={2} />
          <Text color={theme.textColor} fontSize="lg">
            <strong>Plan:</strong> {subscriptionPlan || "N/A"}
          </Text>
          <Text color={theme.textColor} fontSize="lg">
            <strong>Tier:</strong> {subscriptionTier || "N/A"} <FaCrown color={primaryColorPurple} style={{ display: "inline" }} />
          </Text>
       
          {cancelAtPeriodEnd && (
            <Text fontSize="lg" color="red.500">
              Your subscription will end on {cancelAt || "N/A"}
            </Text>
          )}
        </Box>

      

        {/* Usage Stats */}
        <Box p={4} bg={theme.background} borderRadius="md" boxShadow="md">
          <Heading as="h3" size="md" color={theme.textColor}>
            Usage Statistics
          </Heading>
          <Divider my={2} />
          <HStack justifyContent="space-between" spacing={8}>
            <VStack>
              <Text fontSize="2xl" color={primaryColorPurple}>
                {generatedImages || 0}
              </Text>
              <Text fontSize="lg" color={theme.textColor}>
                Images Generated
              </Text>
            </VStack>
            <Divider orientation="vertical" h={12} />
            <VStack>
              <Text fontSize="2xl" color={primaryColorPurple}>
                {tokensCount || 0}
              </Text>
              <Text fontSize="lg" color={theme.textColor}>
                Tokens Used
              </Text>
            </VStack>
          </HStack>
        </Box>

       
      </VStack>
    </Box>
    </>
  );
};

export default Usage;
