import { nanoid } from 'nanoid';

import { CrumbType } from 'types';

export type Example = {
  title: string,
  description: string,
  exampleTitle: string[],
  crumb: CrumbType,
}

const currentDate = new Date();

const example: Example = {
  title: 'How It Works',
  description: 'The BreadCrumbs network is the first blockchain service that creates a market and a decentralized economy to provide affiliation/referal programs without limits',
  exampleTitle: [
    '1 new user',
    ' = ',
    '0.1 BREAD',
  ],
  crumb: {
    sessionId: nanoid(8),
    domain: 'baker-domain.com',
    date: new Date(),
    payments: [
      {
        fromAccount: '0x0f07a87AAc8F060147b568A10648E94b4B9A6DB2',
        toAccount: '0x53f3ead0230A663542D7f5949D915c4Bf51876eA',
        price: 0.1,
        paid: true,
        date: new Date(currentDate.setSeconds(currentDate.getSeconds() + 60)),
      },
    ],
    paymentsCount: 1,
  },
};

export default example;
