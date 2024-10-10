import { Text, theme } from '@chakra-ui/react'
import React from 'react'
import { useTheme } from '../../Themes/ThemeContext'


const Description = ({ description }) => {
    const { theme } = useTheme();
  return (
    <Text
      fontSize={['sm', 'md', 'md']} 
      color={theme.textColor}
      ml={2}
      bg="transparent" 
      p={2} 
      textAlign="justify"
      lineHeight="1.6" 
    >
      {description}
    </Text>
  )
}

export default Description
