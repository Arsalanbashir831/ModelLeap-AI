import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

import FeaturedHeading from './FeaturedPack/FeaturedHeading';
import SimpleIntegrationCard from './FeaturedPack/SimpleIntegrationCard';
import InfiniteScalabilityCard from './FeaturedPack/InfiniteScalabilityCard';

const FeaturedPack = () => {
  const graphImage = 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66843f56ca9b074f34ccf364_pic--graph.svg'; 

  return (
    <Box w="100%" maxW="100%" px={"10%"} mx="auto" py={14} >

      <FeaturedHeading />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>

        <SimpleIntegrationCard />

        <InfiniteScalabilityCard graphImage={graphImage} />
      </SimpleGrid>
    </Box>
  );
};

export default FeaturedPack;
