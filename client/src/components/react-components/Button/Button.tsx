import CN from 'classnames';
import React, { memo } from 'react';
import './Button.css';

export interface ButtonProps {
  onButtonClick: () => void;
  text: string;
}

const Button = memo(({ onButtonClick, text }: ButtonProps) => {
  const buttonClass = CN('cstm-button', {});
  return (
    <button className={buttonClass} onClick={onButtonClick}>
      {text}
    </button>
  );
});

export default Button;
