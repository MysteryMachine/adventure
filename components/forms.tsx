import React from 'react';
import css from './forms.css';
import cx from 'classnames';
import { InputProps, ButtonProps } from '../types/react';

interface ExtraInputProps {
  onStateChange?: React.Dispatch<React.SetStateAction<string>>;
}

export const Input = ({
  className,
  onStateChange,
  onChange,
  type = 'text',
  ...props
}: InputProps & ExtraInputProps) => (
  <div className={className}>
    <input
      className={css.input}
      onChange={onStateChange ? e => onStateChange(e.target.value) : onChange}
      {...props}
      type={type}
    />
  </div>
);

interface ButtonWidths {
  width?: 'full';
}

export const Button = ({ className, width = 'full', ...props }: ButtonProps & ButtonWidths) => (
  <div className={className}>
    <button className={cx(css.button, css[width])} {...props} />
  </div>
);
