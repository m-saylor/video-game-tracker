// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import { Button, HStack } from './components';

// 3. extend the theme
const theme = extendTheme(
  // color mode config
  {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    components: {
      Button, HStack,
    },
  },
  // {
  //   // define new text styles
  //   textStyles: {
  //     navButtonText: {
  //       fontSize: '13.5px',
  //       fontWeight: '700',
  //     },
  //     largeNumberRankingsText: {
  //       fontSize: '56px',
  //       fontWeight: '700',
  //     },
  //     gameTitleRankingsText: {
  //       fontSize: '18px',
  //       fontWeight: '700',
  //     },
  //   },
  // },
);

export default theme;
