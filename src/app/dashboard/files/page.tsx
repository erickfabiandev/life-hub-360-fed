import React from 'react';
import Style from '@/styles/comingSonn.module.scss'

const Files = () => {
  return (
    <div className={Style.file}>
      <p>
        Coming soon
        <span>We are working on an exciting feature that will allow you to store your files - stay tuned for updates!</span>
      </p>
    </div>
  );
};

export default Files;