import React, { useState } from 'react';
import { SimpleGrid, Box, Button, Flex, Divider} from '@chakra-ui/react';
import SearchBar from './SearchBar';
import CategoryToggle from './CategoryToggle';
import ModelCard from './ModelCard';
import { primaryColorOrange, primaryColorPurple } from '../../colorCodes';

const modelsData = [
  // Language Generation Models
  {
    name: 'Gemini 1.5 Flash',
    brand: 'Google',
    type: 'language',
    context: '1M',
    image: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac27ab6738da91466dd_Group%201000007783.svg',
  },
  {
    name: 'Gemini 1.5 Pro',
    brand: 'Google',
    type: 'language',
    context: '2M',
    image: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac27ab6738da91466dd_Group%201000007783.svg',
  },
  {
    name: 'GPT-4o-2024-08-06',
    brand: 'OpenAI',
    type: 'language',
    context: '128K',
    image: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac3f9bd6412dc6d3f5b_Group%201000007781.svg',
  },
  {
    name: 'Claude 2.0',
    brand: 'Anthropic',
    type: 'language',
    context: '100K',
    image: 'https://cdn.anthropic.com/claude-logo.svg',
  },
  {
    name: 'Llama 3.2 3B Instruct Turbo',
    brand: 'Meta',
    type: 'language',
    context: '131K',
    image: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c6bb875f1845806550e9_Group%201799369455d.svg',
  },

  // Image Generation Models
  {
    name: 'Flux v2',
    brand: 'Stability AI',
    type: 'Image Generation',
    context: '10M',
    image: 'https://user-images.githubusercontent.com/848607/196954523-efba3345-4670-4be2-b76a-b49f33390071.png',
  },
  {
    name: 'SDXL 1.0',
    brand: 'Stability AI',
    type: 'Image Generation',
    context: '2M',
    image: 'https://user-images.githubusercontent.com/848607/196954523-efba3345-4670-4be2-b76a-b49f33390071.png',
  },
  {
    name: 'DALL·E 3',
    brand: 'OpenAI',
    type: 'Image Generation',
    context: '5M',
    image: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac3f9bd6412dc6d3f5b_Group%201000007781.svg',
  },
  {
    name: 'MidJourney 5.2',
    brand: 'MidJourney',
    type: 'Image Generation',
    context: '10M',
    image: 'https://user-images.githubusercontent.com/848607/196954523-efba3345-4670-4be2-b76a-b49f33390071.png',
  }
];

const categories = [
 
  'Image Generation',
  'Language',
  
];

const ModelsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('language');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredModels = modelsData.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      model.type.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <>
    <Box w="100%" maxW="100%" px={"10%"} py={8}>
      <Box textAlign="center" mb={6} w="100%">
        <Box color={primaryColorPurple} textTransform="uppercase" fontSize="sm" mb={1}>
          Models
        </Box>
        <Box fontSize={{ base: '3xl', md: '6xl' }} fontWeight="bold">
          200+ AI Models
        </Box>
      </Box>

      <Box maxW="100%" mb={4} w="100%">
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </Box>

      <Box maxW="100%" mb={6} w="100%">
        <CategoryToggle
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} w="100%">
        {filteredModels.map((model, index) => (
          <ModelCard key={index} model={model} />
        ))}
      </SimpleGrid>

      {/* <Flex justifyContent="center" mt={8}>
        <Button mr={4} borderRadius="full" variant="outline" bg={primaryColorPurple} color={'white'} _hover={{ bg: primaryColorOrange }}>
          Load More
        </Button>
        <Button borderRadius="full" bg={'white'} color="black" boxShadow={'lg'} _hover={{bg: primaryColorOrange, color: "white"}} >
          Explore All
        </Button>
      </Flex> */}
    </Box>
    <Divider/>
 
    </>
  );
};

export default ModelsSection;
