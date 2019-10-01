import React from 'react';
import css from './typography.css';
import cx from 'classnames';
import { LabelProps, DivProps } from '../types/react';

export const Body = ({ children, className, ...props }: DivProps) => (
  <div className={cx(className, css.body)} {...props}>
    {children}
  </div>
);
export const Label = ({ children, className, ...props }: LabelProps) => (
  <div className={cx(className, css.labelOuter)}>
    <label className={css.label} {...props}>
      {children}
    </label>
  </div>
);
