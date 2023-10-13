import React from 'react';
import styles from "@/styles/loading.module.scss"
import Image from 'next/image';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <Image
        src={'/progress.gif'}
        alt={"LIFEHUB360"}
        priority={true}
        height={0}
        width={0}
        className={styles.loader_image}
      />
    </div>
  );
};

export default Loading;