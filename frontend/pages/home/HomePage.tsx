import type { NextPage } from 'next';
import Image from 'next/image';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';

import * as Sections from 'components/pages/home/sections';
import sections from 'config/routing/sections';
import { partners } from 'content/home';

import styles from './HomePage.module.scss';

const HomePage: NextPage = () => {
  const [roadMapRef, roadMapObserver] = useIntersection({ rootMargin: '200px', threshold: 0.3 });
  const [partnersRef, partnersObserver] = useIntersection({ threshold: 0.5 });

  const roadMapClassName = classnames(styles.RoadMapSection, { [styles.RoadMapEffect]: roadMapObserver?.isIntersecting });
  const partnersClassName = classnames(styles.PartnersSection, { [styles.PartnersEffect]: partnersObserver?.isIntersecting });

  const showPartnersSection = partners.length > 0;

  return (
    <div className={ styles.HomePage }>
      <Image
        alt="Space background"
        className={ styles.BackgroundImage }
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src="/static/images/home/page-background.jpg"
      />
      <Sections.HeaderSection
        className={ styles.HeaderSection }
        id={ sections.home.header }
      />
      <Sections.WhatIsSection
        className={ styles.WhatIsSection }
        id={ sections.home.whatIs }
      />
      <Sections.BannerSection
        className={ styles.BannerSection }
        id={ sections.home.banner }
      />
      <Sections.ExampleSection
        className={ styles.ExampleSection }
        id={ sections.home.example }
      />
      <Sections.HowItWorksSection
        className={ styles.HowItWorksSection }
        id={ sections.home.howItWorks }
      />
      <Sections.AdvantagesSection
        className={ styles.AdvantagesSection }
        id={ sections.home.header }
      />
      <Sections.PlayersSection
        className={ styles.PlayersSection }
        id={ sections.home.players }
      />
      <Sections.SubscriptionSection
        className={ styles.SubscriptionSection }
        id={ sections.home.subscription }
      />
      <div ref={ roadMapRef }>
        <Sections.RoadMapSection
          className={ roadMapClassName }
          id={ sections.home.roadmap }
        />
      </div>
      { showPartnersSection && (
        <div ref={ partnersRef }>
          <Sections.PartnersSection
            className={ partnersClassName }
            id={ sections.home.partners }
          />
        </div>
      ) }
    </div>
  );
};

export default HomePage;
