import React from 'react';
import css from './typography.css';
import cx from 'classnames';
import NextLink from 'next/link';
import { LabelProps, DivProps, AnchorProps } from '../types/react';

export const Body = ({ children, className, ...props }: DivProps) => (
  <div className={cx(css.body, className)} {...props}>
    {children}
  </div>
);
export const Label = ({ children, className, ...props }: LabelProps) => (
  <div className={cx(css.labelOuter, className)}>
    <label className={css.label} {...props}>
      {children}
    </label>
  </div>
);

export const Link = ({ href, className, children, ...props }: AnchorProps & { href: string }) => (
  <NextLink href={href}>
    <a className={cx(css.link, className)} {...props}>
      {children}
    </a>
  </NextLink>
);
