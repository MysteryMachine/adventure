import React from 'react';
import { ChildrenMixin } from '../types/react';
import css from './typography.css';

export const Body = ({ children }: ChildrenMixin) => (
  <div className={css.body}> {children} </div>
);
