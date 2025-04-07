import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  content?: string | React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  classNames?: string;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  content,
  type = 'button',
  isLoading = false,
  disabled = false,
  classNames = '',
}) => (
  <button
    type={type}
    className={clsx(styles.button, classNames)}
    onClick={type === 'button' ? onClick : undefined}
    disabled={disabled || isLoading}
  >
    {isLoading ? <span className={styles.loading}>⌀</span> : content}
  </button>
);