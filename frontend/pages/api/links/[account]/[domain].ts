import type { NextApiRequest, NextApiResponse } from 'next';
import { Link, PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

import { api, paths } from 'config/routing';
import site from 'config/site';
import { domainToUrl } from 'utils/string';

export type LinkType = {
    id: number,
    domain: string | null,
    url: string | null,
    longUrl: string | null,
    shortId: string | null,
    shortUrl: string | null,
    account: string | null,
}

export interface Data {
    link: LinkType,
}

export const path = api.link;

const prisma = typeof window === 'undefined' ? new PrismaClient() : undefined;

const _createShortId = (account: string, domain: string) => nanoid(8);

export const createShortUrl = (shortId: string): string => `${site.BASE_URL}/${shortId}`;

export const createLongUrl = (account: string, domain: string): string => `${site.BASE_URL}${paths.crumb(domain, account)}`;

const _getLink = async (account: string, domain: string): Promise<Link | null> => prisma.link.findFirst({
  where: {
    account,
    domain,
  },
});

const _createLink = async (account: string, domain: string): Promise<Link> => {
  const shortId = _createShortId(account, domain);

  return prisma.link.create({
    data: {
      account,
      domain,
      short_id: shortId,
    },
  });
};

export const formatLink = (dbLink: Link): LinkType => ({
  id: dbLink.id,
  domain: dbLink.domain,
  url: dbLink.domain
    ? domainToUrl(dbLink.domain) : null,
  longUrl: (dbLink.account && dbLink.domain)
    ? createLongUrl(dbLink.account, dbLink.domain)
    : null,
  shortId: dbLink.short_id,
  shortUrl: dbLink.short_id
    ? createShortUrl(dbLink.short_id)
    : null,
  account: dbLink.account,
});

export const getLink = async (account: string, domain: string): Promise<LinkType> => {
  const res = await fetch(api.link(account, domain));
  const data: { link: LinkType } = await res.json();

  return data.link || undefined;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const { account: accounts, domain: domains } = req.query;

  const account = Array.isArray(accounts) ? accounts[0] : accounts;
  const domain = Array.isArray(domains) ? domains[0] : domains;

  try {
    let dbLink = await _getLink(account, domain);
    if (!dbLink) dbLink = await _createLink(account, domain);

    if (dbLink) {
      res.status(200).json({
        link: formatLink(dbLink),
      });
    } else res.status(404);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error retrieving link' });
  }
};

export default handler;
