export type Header = {
  title: string,
  subtitle: string[],
  feature: {
    title: string,
    subtitle: string,
    button: string,
  }
}

const header: Header = {
  title: 'digital word-of-mouth revolution',
  subtitle: ['the referral chain made ',
    'simple', ', ', 'open', ' and ', 'reliable'],
  feature: {
    title: 'The frist Initial Shared Offering (ISO)',
    subtitle: 'Earn BREAD tokens by sharing BreadCrumbs website',
    button: 'Get your sharing link',
  },
};

export default header;
