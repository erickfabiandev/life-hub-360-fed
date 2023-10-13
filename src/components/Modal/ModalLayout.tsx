import React, { FC, ReactNode } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import Style from '@/components/Modal/modalLayout.module.scss'

interface ModalProps {
  children: ReactNode
}

const ModalLayout: FC<ModalProps> = ({ children }) => {

  return (
    <div className={Style.modalLayout}>
      <div className={Style.modalLayout_content}>
        {
          children
        }
      </div>
    </div>
  );
};

export default ModalLayout;