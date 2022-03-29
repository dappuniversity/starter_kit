import type { NextApiRequest, NextApiResponse } from 'next';
import parse from 'html-metadata-parser';

import { api } from 'config/routing';
import { domainToUrl } from 'utils/string';

export type SiteType = {
  domain: string,
  url?: string,
  title?: string,
  description?: string,
  image?: string
}

export interface Data {
  site: SiteType,
}

export const path = api.basket;
export const manyPath = api.basket('sites'); // Only used as SWR key

export const getSiteData = async (domain:string): Promise<SiteType> => {
  let website = {
    meta: {},
    og: {},
  };

  try {
    website = await parse(domainToUrl(domain));
  } catch (error) {
    console.warn(`Error parsing website data from ${domain}`);
  }

  let image = website?.og?.image?.startsWith('/') ? `${domainToUrl(domain)}${website.og?.image}` : website.og?.image;
  if (!image) image = website.meta?.image;
  if (!image) {
    image = (website?.images?.find(({ src }: { src:string}) => ['.jpg', '.jpeg', '.png']
      .some(ext => src.endsWith(ext))) || {}).src;
  }

  const site: SiteType = {
    domain,
    title: domain,
    ...website.meta,
    ...website.og,
    image: image || null,
  };

  return site;
};

export const getManySitesData = async (domains: string[]): Promise<SiteType[]> => Promise.all(domains.map(getSiteData));

export const get = async (domain: string): Promise<SiteType> => {
  const res = await fetch(api.basket(domain));
  const data: { site: SiteType } = await res.json();

  return data.site || {};
};

export const getMany = async (domains: string[]): Promise<SiteType[] > => Promise.all(domains.map(get));

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { domain } = req.query;

  const basketDomain = Array.isArray(domain) ? domain[0] : domain;

  res.status(200).json({
    site: (await getSiteData(basketDomain)),
  });
};

export default handler;
