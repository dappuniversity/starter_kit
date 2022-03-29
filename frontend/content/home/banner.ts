import { paths } from 'config/routing';

export type Banner = {
  title: string,
  subtitle: string,
  button: {
    text: string,
    to: string,
  },
  accentButton: {
    text: string,
    to: string,
  },
}

const banner: Banner = {
  title: 'Join the first ISO',
  subtitle: 'Share BreadCrumbs website, earn BREAD tokens',
  button: {
    text: 'Invest & Stake',
    to: 'https://coinmarketcap.com/es/currencies/bread/',
  },
  accentButton: {
    text: 'Get my sharing link',
    to: paths.market,
  },
};

export default banner;
