import {
  ActivityLogIcon, BarChartIcon,
  FilePlusIcon, LapTimerIcon,
  LightningBoltIcon, Link2Icon,
  PersonIcon,
  PieChartIcon, Share1Icon,
} from '@radix-ui/react-icons';

import { paths } from 'config/routing';

import styles from 'components/pages/home/sections/PlayersSection/PlayersSection.module.scss';

export type Player = {
  title: string,
  subtitle: string,
  className: string,
  advantages?: string[],
  highlights?: string[][],
  icons?: any[],
  buttonText?: string,
  buttonLink?: string,
}

const players: Player[] = [
  {
    title: 'pickers',
    subtitle: 'You want to promote other projects or brands',
    className: styles.PickersCard,
    advantages: [
      'All your favorite websites on one easy to use platform',
      'Automatic and instant payments with BREAD tokens',
      'Lower network commissions, higher earnings',
    ],
    highlights: [
      ['easy to use'],
      ['Automatic', 'instant payments'],
      ['higher earnings'],
    ],
    icons: [
      Link2Icon,
      LapTimerIcon,
      BarChartIcon,
    ],
    buttonText: 'Earn BREAD token by sharing links',
    buttonLink: paths.market,
  },
  {
    title: 'bakers',
    subtitle: 'You want to grow your brand/project by increasing users/clients/community.',
    className: styles.BakersCard,
    advantages: [
      'Trade tokens for visibility. Launch an ISO!',
      'Create affiliate or referral campaigns in a couple of clicks.',
      'Unlimited influencers and publishers',
    ],
    highlights: [
      ['visibility', 'ISO'],
      ['affiliate', 'referral'],
      ['influencers', 'publishers'],
    ],
    icons: [
      Share1Icon,
      FilePlusIcon,
      PersonIcon,
    ],
    buttonText: 'Start promoting your brand',
    buttonLink: paths.baskets,
  },
  {
    title: 'investors',
    subtitle: 'You trust the BreadCrumbs project and want to invest in it or help to build it up',
    className: styles.InvestorsCard,
    advantages: [
      'Built on blockchain. 100% service availability.',
      'Transparent and real-time user traffic tracking.',
      'Buy or stake BREAD tokens to improve your investment profits',
    ],
    highlights: [
      ['100%', 'availability'],
      ['Transparent', 'real-time'],
      ['BREAD tokens', 'investment profits'],
    ],
    icons: [
      LightningBoltIcon,
      ActivityLogIcon,
      PieChartIcon,
    ],
    buttonText: 'Check BradCrumbs ISO',
    buttonLink: paths.market,
  },
];

export default players;
