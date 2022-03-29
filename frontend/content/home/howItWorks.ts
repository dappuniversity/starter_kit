import { MantineGradient } from '@mantine/core';

import { paths } from 'config/routing';
import theme from 'config/theme';

export type HowItWorksStep = {
  step: number,
  text: string,
}

export type HowItWorksCardInfo = {
  title: string,
  subtitle?: string,
  shapeClassName?: string,
  gradient?: MantineGradient,
  steps: HowItWorksStep[],
  linkButton?: {
    label: string,
    to: string,
  }
}

const howItWorks: HowItWorksCardInfo[] = [
  {
    title: 'bakers',
    subtitle: 'Advertisers',
    shapeClassName: 'BreadShape',
    gradient: theme.accentGradient,
    steps: [
      {
        step: 1,
        text: 'Bakers create a bread basket for a specific domain',
      },
      {
        step: 2,
        text: 'Define the total BREAD price to be paid per new user user acquisition',
      },
    ],
    linkButton: {
      label: 'Create a basket',
      to: paths.baskets,
    },
  },
  {
    title: 'pickers',
    subtitle: 'Marketers & Publishers',
    shapeClassName: 'CrumbsShape',
    gradient: theme.primaryGradient,
    steps: [
      {
        step: 3,
        text: 'Pickers go to the market and create a crumb link to basket domain',
      },
      {
        step: 4,
        text: 'Place the link on their own domains, services, platforms, chats...',
      },
    ],
    linkButton: {
      label: 'Go to market',
      to: paths.market,
    },
  },
  {
    title: 'travelers',
    subtitle: 'Users & Customers',
    shapeClassName: 'CommunityShape',
    gradient: theme.whiteGradient,
    steps: [
      {
        step: 5,
        text: 'Users click a crumb link and go to baker domain. New bread crumb is created',
      },
      {
        step: 6,
        text: 'New transacticon is triggered to pay the bread crumb. BREAD price is transfered from baker to picker',
      },
    ],
  },
];

export default howItWorks;
