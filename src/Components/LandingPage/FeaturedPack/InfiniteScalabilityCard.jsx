import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';
import { primaryColorOrange } from '../../../colorCodes';

const InfiniteScalabilityCard = ({ graphImage }) => (
  <Box
    bg="#F2F4F8"
    borderRadius="xl"
    p={{ base: 4, md: 6 }}
    boxShadow="md"
    h="100%"
    textAlign="left"
    border="1px solid #f0f0f0"
    position="relative"
    overflow="hidden"
  >

    <Box color={primaryColorOrange} fontSize={{ base: "xl", md: "2xl" }} mb={4}>
      <FaChartLine />
    </Box>

    <Heading size={{ base: "sm", md: "md" }} mb={4}>
      Infinite Scalability
    </Heading>

    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={4}>
      Experience low latency with our AI API, deploy instantly, and surpass rate limits without impact.
    </Text>


    <Image
      src={graphImage}
      alt="Scalability graph"
      position="absolute"
      bottom={0}
      right={0}
      w={{ base: "100%", md: "80%" }}
      h="auto"
      objectFit="contain"
      opacity={0.9} 
    />
  </Box>
);

export default InfiniteScalabilityCard;
