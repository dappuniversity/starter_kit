import theme from 'config/theme';

export type RoadStep = {
  title: string,
  date?: Date | string,
  features: string[],
}

export type Road = {
    target: string,
    color?: string,
    steps: RoadStep[],
  }

export type RoadMap = {
  roads: Road[],
}

const roadMap: RoadMap = {
  roads: [
    {
      target: 'Pickers',
      color: theme.mantine.primaryColor,
      steps: [
        {
          title: 'Milestone 0',
          date: '2022 Q1',
          features: [
            'User tracking system (crumbs creation)',
            'Pickers dashboard: Crumbs checking',
            'Market: Baskets listing',
            'Crumb rewards system',
            'Affiliation to web domains',
          ],
        },
        {
          title: 'Milestone 1',
          date: '2022 Q2-Q3',
          features: [
            'Security improvements',
            'Payments receipt assuarance',
            'Penalties for bakers or baskets with non-payments',
            'Market update: Baskets filtering and comparison info/stats',
          ],
        },
        {
          title: 'Milestone 2',
          date: '2022 Q4',
          features: [
            'Referals system',
            'Staking rewards',
            'Affiliation to targeted URLs',
            'Floating BREAD/USD prices for baskets',
          ],
        },
        {
          title: 'Milestone 3',
          date: '2023 Q1-Q2',
          features: [
            'Qualified user adquisition planning',
            'Qualified user acquisition: by time-on-page page measure',
            'Qualified user acquisition: by target-click',
            'Qualified user acquisition: by custom-action API call',
          ],
        },
      ],
    },
    {
      target: 'Bakers',
      color: theme.accentColor,
      steps: [
        {
          title: 'Milestone 0',
          date: '2022 Q1',
          features: [
            'User adquisition planning',
            'Baskers dashbaord: Basket creation, udpate, delete and publish featured',
            'Basket payments systtem',
            'Affiliation to web domains',
          ],
        },
        {
          title: 'Milestone 1',
          date: '2022 Q2-Q3',
          features: [
            'Security improvements',
            'Anti-cheating strategies',
            'Baker update improvements',
          ],
        },
        {
          title: 'Milestone 2',
          date: '2022 Q4',
          features: [
            'Referals system',
            'Staking engagment',
            'Affiliation to targeted URLs',
            'Floating BREAD / USD prices for baskets',
          ],
        },
        {
          title: 'Milestone 3',
          date: '2023 Q1-Q2',
          features: [
            'Qualified user adquisition planning',
            'Qualified user acquisition: by time-on-page page measure',
            'Qualified user acquisition: by target-click',
            'Qualified user acquisition: by custom-action API call',
          ],
        },
      ],
    },
  ],
};

export default roadMap;
