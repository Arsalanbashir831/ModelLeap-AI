import React from 'react';
import { Box, Flex, SimpleGrid, Text, Link, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const footerLinks = {
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Discord Community', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Affiliate Program', href: '#' },
    { label: 'AI/ML API Academy', href: '#' },
    { label: 'Brand Guidelines', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ],
  comparisons: [
    { label: 'LLaMa 3 vs. ChatGPT 3.5', href: '#' },
    { label: 'Qwen 2 vs. LLaMa 3', href: '#' },
    { label: 'Qwen 2 vs. ChatGPT 4.0', href: '#' },
    { label: 'Claude 3.5 vs. ChatGPT 4.0', href: '#' },
    { label: 'Llama 3.1 88B vs. ChatGPT-4.0 mini', href: '#' },
    { label: 'Llama 405B vs. Mixtal 8x22B', href: '#' },
    { label: 'OpenAI Comparison', href: '#' },
  ],
  product: [
    { label: 'Explore Use-Cases', href: '#' },
    { label: 'AI API for Low-Code', href: '#' },
    { label: 'ChatGPT-5 AI API', href: '#' },
    { label: 'Get OpenAI API Key', href: '#' },
    { label: "Meta's Llama 3 API", href: '#' },
    { label: 'Get Claude 3 API', href: '#' },
  ],
  models: [
    { label: 'Mistral 7B Instruct v0.3', href: '#' },
    { label: 'Stable Diffusion 1.5', href: '#' },
    { label: 'ChatGPT 4.0 mini', href: '#' },
    { label: 'Stable Diffusion 3', href: '#' },
    { label: 'Qwen 2', href: '#' },
    { label: 'All Models', href: '#' },
  ],
  developer: [
    { label: 'Sign Up', href: '#' },
    { label: 'AI Playground', href: '#' },
    { label: 'Billing', href: '#' },
    { label: 'Key Management', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
};

const FooterSection = ({ title, links }) => (
  <Box>
    <Text fontWeight="bold" mb={3}>
      {title}
    </Text>
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        display="block"
        mb={2}
        _hover={{ color: 'gray.500', textDecoration: 'none' }} 
      >
        {link.label}
      </Link>
    ))}
  </Box>
);

const Footer = () => {
  return (
    <Box bg="white" py={10} px={5} w="100%">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 5 }}
        spacing={10}
        maxW="1200px"
        mx="auto"
        textAlign={{ base: 'center', lg: 'left' }}
      >
        <FooterSection title="Resources" links={footerLinks.resources} />
        <FooterSection title="Comparisons" links={footerLinks.comparisons} />
        <FooterSection title="Product" links={footerLinks.product} />
        <FooterSection title="Models" links={footerLinks.models} />
        <FooterSection title="Developer" links={footerLinks.developer} />
      </SimpleGrid>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        mt={10}
        textAlign={{ base: 'center', md: 'left' }}
      >

        <Text color="gray.500">hello@modelleapai.com</Text>
        <Flex mt={{ base: 4, md: 0 }}>
          <Link href="#" isExternal mx={2}>
            <Icon as={FaTwitter} w={6} h={6} _hover={{ color: 'gray.500' }} />
          </Link>
          <Link href="#" isExternal mx={2}>
            <Icon as={FaLinkedin} w={6} h={6} _hover={{ color: 'gray.500' }} />
          </Link>
          <Link href="#" isExternal mx={2}>
            <Icon as={FaFacebook} w={6} h={6} _hover={{ color: 'gray.500' }} />
          </Link>
          <Link href="#" isExternal mx={2}>
            <Icon as={FaGithub} w={6} h={6} _hover={{ color: 'gray.500' }} />
          </Link>
        </Flex>

        <Text color="gray.500" mt={{ base: 4, md: 0 }}>
          © Copyright Model Leap AI 2024
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
