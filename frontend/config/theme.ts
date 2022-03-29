import { MantineGradient, MantineThemeOverride } from '@mantine/core';

const theme: {
    mantine: MantineThemeOverride,
    accentColor: string,
    primaryGradient: MantineGradient,
    accentGradient: MantineGradient,
    deleteGradient: MantineGradient,
    whiteGradient: MantineGradient,
    darkGradient: MantineGradient,
    transitionDuration: number,
} = {
  // Mantine
  mantine: {
    colorScheme: 'dark',
    colors: {
      white: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ],
      cyan: [
        '#E3FAFC',
        '#C5F6FA',
        '#99E9F2',
        '#66D9E8',
        '#3BC9DB',
        '#22B8CF',
        '#15AABF',
        '#1098AD',
        '#0C8599',
        '#0B7285',
      ],
      dark: [
        '#ffffff',
        '#395A60',
        '#254950',
        '#0F373F',
        '#0C2A30',
        '#081C20',
        '#040E10',
        '#020708',
        '#010304',
        '#000000',
      ],
    },
    primaryColor: 'cyan',
    loader: 'bars',
    breakpoints: {
      xs: 500,
      sm: 800,
      md: 1000,
      lg: 1200,
      xl: 1400,
    },
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'Blessed Light, monospace',
    headings: { fontFamily: 'Blessed Light, monospace' },
  },

  // Extended
  accentColor: 'orange',

  primaryGradient: { from: 'white', to: 'cyan', deg: 35 },
  accentGradient: { from: 'yellow', to: 'orange', deg: 45 },
  deleteGradient: { from: 'pink', to: 'red', deg: 45 },
  darkGradient: { from: 'dark', to: 'cyan', deg: 35 },
  whiteGradient: { from: 'white', to: 'gray', deg: 25 },

  transitionDuration: 700,
};

export default theme;
