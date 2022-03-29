const api = {
  baskets: '/api/baskets',
  upcomingBaskets: '/api/baskets/upcoming',
  basket: (domain: string) => `/api/baskets/${domain}`,
  link: (account: string, domain: string) => `/api/links/${account}/${domain}`,
  shortLink: (linkId: string) => `/api/links/short/${linkId}`,
  clients: '/api/clients',
};

export default api;
