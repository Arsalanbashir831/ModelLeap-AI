import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';
import {primaryColorOrange, primaryColorPurple} from '../../../colorCodes';

const InfiniteScalabilityCard = ({ graphImage }) => (
    <Box
    bg="#F2F4F8"
    borderRadius="xl"
    p={6}
    boxShadow="md"
    h="100%"
    textAlign="left"
    border="1px solid #f0f0f0"
    position="relative"
    overflow="hidden"
  >
    <Box color={primaryColorOrange} fontSize="2xl" mb={4}>
      <FaChartLine />
    </Box>
    <Heading size="md" mb={4}>
      Infinite Scalability
    </Heading>
    <Text fontSize="sm" color="gray.500" mb={4}>
      Experience low latency with our AI API, deploy instantly, and surpass rate limits without impact.
    </Text>
    <Image
      src={graphImage}
      alt="Scalability graph"
      position="absolute"
      bottom={0}
      right={0}
      w="80%"
      h="auto"
      objectFit="contain"
    />
  </Box>
);

export default InfiniteScalabilityCard;
