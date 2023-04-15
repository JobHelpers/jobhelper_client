import { memo } from 'react';
import close from '../../assets/close.svg';
import './modal.scss';

export const CloseButton = memo(({ onClose }) => {

  return (
    <button className="close" onClick={onClose}>
      <img src={close} alt="close" loading="lazy" />
    </button>
  );
});
