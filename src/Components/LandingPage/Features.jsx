import React from 'react';
import { Box, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { primaryColorOrange, primaryColorPurple } from '../../colorCodes';


const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const FeatureCard = ({ number, label, color, delay }) => {
  return (
    <MotionBox
      p={8}
      bg="rgba(255, 255, 255, 0.7)"
      borderRadius="xl"
      backdropFilter="blur(15px)"
      boxShadow="lg"
      textAlign="center"
      w="100%"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <Heading fontSize="8xl" color={color} mb={2}>
        {number}
      </Heading>
      <Text fontSize="lg" fontWeight="bold">
        {label}
      </Text>
    </MotionBox>
  );
};

const Features = () => {


  return (
    <Box pt={16} pb={16} w="100%" textAlign="center">
      <MotionText
        fontSize="sm"
        color={primaryColorPurple}
        mb={2}
        textTransform="uppercase"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Features
      </MotionText>

      <MotionHeading
        fontSize={{ base: '3xl', md: '5xl' }}
        mb={4}
        fontWeight="bold"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Fastest Inference
      </MotionHeading>

      <MotionText
        fontSize="lg"
        color="gray.600"
        mb={12}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Top-tier serverless infrastructure <br></br> reduces deployment and maintenance<br></br> 
        costs.
      </MotionText>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} maxW="700px" mx="auto">
        <FeatureCard number="200+" label="AI Models" color={primaryColorPurple} delay={0.8} />
        <FeatureCard number="#1" label="Data Security" color={primaryColorOrange} delay={1.0} />
        <FeatureCard number="99%" label="Uptime" color={primaryColorPurple} delay={1.2} />
        <FeatureCard number="24/7" label="Support" color={primaryColorOrange} delay={1.4} />
      </SimpleGrid>
    </Box>
  );
};

export default Features;
