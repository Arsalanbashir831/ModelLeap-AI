import React from 'react';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

const logosRow1 = [
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac27ab6738da91466dd_Group%201000007783.svg', label: 'Google AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683ba99f86f2b87e4f237fb_Group%201000007780.svg', label: 'Microsoft' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac32e6117c63a426294_Group%201000007784.svg', label: 'Mistral AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c6bb875f1845806550e9_Group%201799369455d.svg', label: 'Meta AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6676e783047401d212c9e8f0_logo_icon.svg', label: 'Anthropic' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c33b42155f8095abea24_8e5365de-b40b-48ab-8116-2c9923bb5b99%20copy.svg', label: 'Stability AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c23efc93986fbddd5ee4_480px-Suno_AI_icon.svg.svg', label: 'Suno AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac9178721caf9fcb31dadb_6683bb33a52384168b9c06c6_Group%201000007788.png', label: 'Hugging Face' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac91dc59a8176025a3e09d_6683bb3265e24a89c1902484_Group%201000007787.png', label: 'Databricks' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c33b42155f8095abea24_8e5365de-b40b-48ab-8116-2c9923bb5b99%20copy.svg', label: 'AI21' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8efceae8eb917768b12_hd3QCLnAkFFGI07Z5d1Ol.webp', label: 'OpenChat' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac3f9bd6412dc6d3f5b_Group%201000007781.svg', label: 'Open AI' },
];

const logosRow2 = [
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683ba99f86f2b87e4f237fb_Group%201000007780.svg', label: 'Microsoft' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac32e6117c63a426294_Group%201000007784.svg', label: 'Mistral AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c6bb875f1845806550e9_Group%201799369455d.svg', label: 'Meta AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c3671822ccf54e14247e_xMBly9PUMphrFVMxLX4kq.svg', label: 'DeepSeek' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c258b6290985056f5cfb_deepgram_logo.svg', label: 'Deepgram' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac9178721caf9fcb31dadb_6683bb33a52384168b9c06c6_Group%201000007788.png', label: 'Hugging Face' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/66ac91dc59a8176025a3e09d_6683bb3265e24a89c1902484_Group%201000007787.png', label: 'Databricks' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683c33b42155f8095abea24_8e5365de-b40b-48ab-8116-2c9923bb5b99%20copy.svg', label: 'AI21' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8efceae8eb917768b12_hd3QCLnAkFFGI07Z5d1Ol.webp', label: 'OpenChat' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bb32b048168509806240_channels4_profile.svg', label: 'Eleuther AI' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683b8ef98117f1dc257dd5e_T_J4xxgaVC2CuzPE1VRbe.webp', label: 'Zero-one' },
  { src: 'https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/6683bac3f9bd6412dc6d3f5b_Group%201000007781.svg', label: 'Open AI' },
];

const duplicateLogos = (logos) => [...logos, ...logos];

const SlideShow = () => {
  const animationDuration = 40;

  const logoSize = useBreakpointValue({ base: 8, md: 12 });
  const spacing = useBreakpointValue({ base: 2, md: 4 });
  const textSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const minWidthValue = useBreakpointValue({ base: '110px', md: '150px' });

  return (
    <Box overflow="hidden" w="100%" bg="white" py={4}>

      <MotionFlex
        justify="space-around"
        align="center"
        minW="100%"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: animationDuration,
        }}
      >
        {duplicateLogos(logosRow1).map((logo, index) => (
          <Flex key={index} mx={spacing} alignItems="center" minWidth={minWidthValue}>
            <Image src={logo.src} alt={logo.label} h={logoSize} />
            <Text ml={spacing} fontSize={textSize} fontWeight="bold" color="gray.800">
              {logo.label}
            </Text>
          </Flex>
        ))}
      </MotionFlex>

      <MotionFlex
        justify="space-around"
        align="center"
        minW="100%" 
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: animationDuration,
        }}
        mt={6}
      >
        {duplicateLogos(logosRow2).map((logo, index) => (
          <Flex key={index} mx={spacing} alignItems="center" minWidth={minWidthValue}>
            <Image src={logo.src} alt={logo.label} h={logoSize} borderRadius={'full'} />
            <Text ml={spacing} fontSize={textSize} fontWeight="bold" color="gray.800">
              {logo.label}
            </Text>
          </Flex>
        ))}
      </MotionFlex>
    </Box>
  );
};

export default SlideShow;
