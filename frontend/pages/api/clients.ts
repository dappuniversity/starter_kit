import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, PrismaClient } from '@prisma/client';

import { api } from 'config/routing';

export const path = api.clients;

export type ClientType = {
  email: string,
}

export interface Data {
  client: ClientType,
}

const prisma = typeof window === 'undefined' ? new PrismaClient() : undefined;

export const createClient = async (_client: ClientType): Promise<Data | { error: string }> => {
  console.log('pre createClient', _client);

  const res = await fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(_client),
  });

  const data: { client: ClientType } = await res.json();
  console.log('createClient', _client, data);

  return data;
};

const _createClient = async (client: ClientType): Promise<Client> => prisma.client.create({
  data: client,
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) => {
  const {
    body,
    method,
  } = req;

  console.log('body', body, method);

  console.log('handler', typeof body);

  if (method === 'POST') {
    try {
      const _client: ClientType = body;

      const client = await _createClient(_client);
      console.log('handler DB client', _client, client);

      if (client) {
        res.status(200).json({ client });
      } else res.status(404);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error creating client' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
