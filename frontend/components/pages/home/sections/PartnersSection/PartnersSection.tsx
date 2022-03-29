import { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';

import Slider from 'components/groups/Slider';
import { partners } from 'content/home';

import styles from './PartnersSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PartnersSection: FC<Props> = ({ className, id }) => {
  const partnersClassnames = classnames(styles.PartnersSection, className);

  return (
    <div
      className={ partnersClassnames }
      id={ id }
    >
      <Slider
        className={ styles.Slider }
        dots
        infinite
        lgSlides={ 5 }
        slides={ 5 }
        smSlides={ 2.2 }
      >
        { partners.map(partner => (
          <Image
            key={ `partner-${partner.alt}` }
            alt={ partner.alt }
            className={ styles.PartnerImage }
            height={ 100 }
            src={ partner.src }
            width={ 100 }
          />
        ))}
      </Slider>
    </div>
  );
};

PartnersSection.defaultProps = defaultProps;

export default PartnersSection;
