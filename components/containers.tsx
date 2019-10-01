import React from 'react';
import css from './containers.css';
import cx from 'classnames';
import { DivProps } from '../types/react';

interface PanelExtraProps {
  centered?: boolean | { x?: boolean; y?: boolean };
}

export const Panel = ({ children, centered = false }: DivProps & PanelExtraProps) => (
  <div
    className={cx(
      (centered === true || (centered !== false && centered.x)) && css.centeredX,
      (centered === true || (centered !== false && centered.y)) && css.centeredY,
    )}
  >
    <div className={css.panel}>{children}</div>
  </div>
);
