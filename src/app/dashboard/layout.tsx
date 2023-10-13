import React, { ReactNode } from 'react';
import Styles from '@/styles/sidebar.module.scss'
import SideBar from '@/components/SideBar';

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={Styles.layout}>
      <SideBar />
      <main className={Styles.layout_main_content}>
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;