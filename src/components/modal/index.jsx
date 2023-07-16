import React, { useRef } from "react";

import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseSVG } from "../../assets/svgs";
import { useCloseModal } from "../../hooks/useCloseModal";


export const Modal = ({ children, isOpen, handleClose }) => {
  const ref = useCloseModal(handleClose)

  if (!isOpen) return null;
  return createPortal(
    <div className={styles["modal"]}>
      <div ref={ref} className={styles["modalContent"]}>
        <button onClick={handleClose} className={styles["closeBtn"]}>
          <CloseSVG />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
};
