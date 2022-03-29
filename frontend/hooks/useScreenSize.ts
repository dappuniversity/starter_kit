import { useMediaQuery } from '@mantine/hooks';

const useScreenSize = () => ({
  isXS: useMediaQuery('(max-width: 576px)'),
  isSM: useMediaQuery('(max-width: 768px)'),
  isMD: useMediaQuery('(max-width: 992px)'),
  isLG: useMediaQuery('(max-width: 1200px)'),
  isXL: useMediaQuery('(max-width: 1400px)'),
});

export default useScreenSize;
