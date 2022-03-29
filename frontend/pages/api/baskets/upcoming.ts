import type { NextApiRequest, NextApiResponse } from 'next';

import config from 'config';
import { api } from 'config/routing';
import { BasketType } from 'types';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

export type Data = {
  baskets: BasketType[]
}

export const path = api.upcomingBaskets;

export const initialData = [{
  account: '0xFeefEa490f9075E2eC50A82a6FE52bB7D9e842Df',
  domain: config.site.DOMAIN,
  amount: 10000,
  price: 1,
  image: DEFAULT_IMAGE,
  title: 'Bread Crumbs',
},
{
  account: '0xFeefEa490f9075E2eC50A82a6FE52bB7D9e842Df',
  domain: config.site.DOMAIN,
  amount: 10000,
  price: 0.5,
  image: DEFAULT_IMAGE,
  title: 'Bread Crumbs',
},
{
  account: '0xFeefEa490f9075E2eC50A82a6FE52bB7D9e842Df',
  domain: config.site.DOMAIN,
  amount: 10000,
  price: 0.2,
  image: DEFAULT_IMAGE,
  title: 'Bread Crumbs',
}];

export const get = async (): Promise<BasketType[]> => {
  const res = await fetch(api.upcomingBaskets);
  const data: { baskets: BasketType[] } = await res.json();
  return data.baskets || [];
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  res.status(200).json({
    baskets: initialData,
  });
};

export default handler;
