import type { NextApiRequest, NextApiResponse } from 'next';
import { Link, PrismaClient } from '@prisma/client';

import { api } from 'config/routing';

import { formatLink, LinkType } from '../[account]/[domain]';

export const path = api.shortLink;

export interface Data {
    link: LinkType,
}

const prisma = typeof window === 'undefined' ? new PrismaClient() : undefined;

const _getLink = async (shortId: string): Promise<Link | null> => prisma.link.findFirst({
  where: {
    short_id: shortId,
  },
});

export const getLink = async (shortId: string): Promise<LinkType> => {
  const res = await fetch(api.shortLink(shortId));
  const data: { link: LinkType } = await res.json();

  return data.link || undefined;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const { shortId: shortIds } = req.query;

  const shortId = Array.isArray(shortIds) ? shortIds[0] : shortIds;

  try {
    const dbLink = await _getLink(shortId);

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
