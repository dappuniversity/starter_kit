import { ElementType, FC, MouseEventHandler, ReactNode } from 'react';
import NextLink from 'next/link';
import { Button, ButtonProps } from '@mantine/core';
import classNames from 'classnames';

import styles from './Link.module.scss';

export const TARGET = {
  BLANK: '_blank',
};

export const REL = {
  BLANK: 'noopener noreferrer',
  NOFOLLOW: 'nofollow',
};

interface Props extends ButtonProps<ElementType> {
  children: ReactNode,
  to: string,
  className?: string,
  isAccent?: boolean,
  isBlank?: boolean,
  isButton?: boolean,
  isDisabled?: boolean,
  isNoFollow?: boolean,
  title?: string,
  onClick?: MouseEventHandler,
}

const defaultProps = {
  className: '',
  isAccent: false,
  isBlank: false,
  isButton: false,
  isDisabled: false,
  isNoFollow: false,
  title: '',
  onClick: undefined,
};

const Link: FC<Props> = ({
  children, to, className, title, isNoFollow,
  isBlank, isButton, isAccent, isDisabled, onClick, ...buttonProps
}: Props) => {
  const isOnPageLink = to.startsWith('/') || to.startsWith('#');
  const isChildrenString = typeof children === 'string' || children instanceof String;
  const linkTitle = title || (isChildrenString ? children : undefined);
  const linkClassNames = classNames(styles.Link, {
    [styles.Accent]: isAccent,
    [styles.Disabled]: isDisabled,
  }, className);

  const formatLinkUrl = (_url: string) => (_url.startsWith('/') ? `${_url.replace(/\/$/, '')}/` : _url);

  let rel = '';
  rel = isBlank ? REL.BLANK : rel;
  rel = isNoFollow ? `${rel} ${REL.NOFOLLOW}` : rel;
  rel = rel.trim();
  const target = isBlank ? TARGET.BLANK : undefined;
  const href = isOnPageLink ? formatLinkUrl(to) : to;

  if (isButton) {
    return (
      <NextLink
        href={ href }
        passHref
        prefetch={ isOnPageLink }
        target={ target }
        title={ linkTitle }
      >
        { isButton && (
        <Button
          className={ linkClassNames }
          component="a"
          disabled={ isDisabled }
          variant="subtle"
          onClick={ onClick }
          { ...buttonProps }
        >
          { children }
        </Button>
        ) }
      </NextLink>
    );
  }

  return (
    <NextLink
      href={ href }
      passHref
      prefetch={ isOnPageLink }
      target={ target }
      title={ linkTitle }
    >
      <a
        className={ linkClassNames }
        href={ isDisabled ? 'undefined' : href }
        rel={ rel }
        target={ target }
        onClick={ onClick }
      >
        { children }
      </a>
    </NextLink>
  );
};

Link.defaultProps = defaultProps;

export default Link;
