import { sections } from 'config/routing';

export type FooterLink = {
  label: string,
  to: string,
  isDisabled?: boolean,
}

export type FooterSection = {
  title: string,
  links: FooterLink[],
}

const footer: FooterSection[] = [
  {
    title: 'Project',
    links: [
      {
        label: 'How It Works',
        to: `#${sections.home.example}`,
      },
      {
        label: 'Benefits',
        to: `#${sections.home.advantages}`,
      },
      {
        label: 'Partners',
        to: `#${sections.home.partners}`,
      },
      {
        label: 'FAQs',
        to: `#${sections.home.faqs}`,
        isDisabled: true,
      },
      {
        label: 'Whitepaper',
        to: '/whitepaper',
        isDisabled: true,
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'Contact',
        to: '/contact',
        isDisabled: true,
      },
      {
        label: 'Telegram EN',
        to: '/telegram-en',
        isDisabled: true,
      },
      {
        label: 'Telegram ES',
        to: '/telegram-es',
        isDisabled: true,
      },
    ],
  },
  {
    title: 'Market',
    links: [
      {
        label: 'CoinMarketCap',
        to: 'https://coinmarketcap.com/',
        isDisabled: true,
      },
      {
        label: 'CoinGecko',
        to: 'https://www.coingecko.com/',
        isDisabled: true,
      },
    ],
  },
  {
    title: 'BREAD token',
    links: [
      {
        label: 'Binance',
        to: '/binance',
        isDisabled: true,
      },
      {
        label: 'KuCoin',
        to: '/kucoin',
        isDisabled: true,
      },
      {
        label: 'PancakeSwap',
        to: '/pancakeswap',
        isDisabled: true,
      },
    ],
  },
];

export default footer;
