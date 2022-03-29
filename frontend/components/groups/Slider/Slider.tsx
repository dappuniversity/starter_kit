import { FC, ReactNode } from 'react';
import SlickSlider from 'react-slick';
import classnames from 'classnames';

import { useScreenSize } from 'hooks';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Slider.module.scss';

type Props = {
  children: ReactNode,
  className?: string,
  dots?: boolean,
  infinite?: boolean,
  rows?: number,
  slides?: number,
  smSlides?: number,
  lgSlides?: number,
};

const defaultProps = {
  className: '',
  dots: false,
  infinite: false,
  rows: 1,
  slides: 3,
  smSlides: 1.125,
  lgSlides: 2.125,
};

const Slider: FC<Props> = ({
  children, className, infinite, dots, rows,
  slides, lgSlides, smSlides,
}) => {
  const sliderClassNames = classnames(styles.Slider, className);
  const { isSM, isLG } = useScreenSize();

  let slidesToScroll = 2;
  if (slides) slidesToScroll = slides / 2;
  if (isLG && lgSlides) slidesToScroll = lgSlides;
  if (isSM && smSlides) slidesToScroll = smSlides;
  slidesToScroll = Math.floor(slidesToScroll);

  return (
    <SlickSlider
      accessibility
      arrows={ false }
      autoPlay={ infinite }
      className={ sliderClassNames }
      dots={ dots }
      focusOnSelect
      infinite={ infinite }
      infiniteSpeed={ 2000 }
      responsive={ [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: lgSlides,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: smSlides,
          },
        },
      ] }
      rows={ rows }
      slidesToScroll={ slidesToScroll }
      slidesToShow={ slides }
    >
      { children }
    </SlickSlider>
  );
};

Slider.defaultProps = defaultProps;

export default Slider;
