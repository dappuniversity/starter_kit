import useToggle from './useToggle';

const useToggleOpened = () => {
  const { value, toggle, setFirst, setSecond } = useToggle(false, true);
  return {
    opened: value,
    toggleOpened: toggle,
    open: setSecond,
    close: setFirst,
  };
};

export default useToggleOpened;
