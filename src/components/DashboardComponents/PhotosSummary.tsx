import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss'
import { IPhoto } from '@/types/Photo.types';
import Image from 'next/image';
interface PhotosSummaryProps {
  initialPhotoData: IPhoto[]
}

const PhotosSummary: FC<PhotosSummaryProps> = ({ initialPhotoData }) => {
  return (
    <section className={Styles.photosSummary}>
      <h3 className={Styles.photosSummary_title}>Recent photo activity</h3>
      <div className={Styles.photosSummary_content}>
        <div className={Styles.photosSummary_content_container}>
          {
            initialPhotoData.map((photo, index) =>
              <Image
                key={index}
                src={photo.url}
                width={150}
                height={100}
                alt={photo.photoName}
                className={Styles.photosSummary_content_container_card}
              />
            )
          }
        </div>
        <div className={Styles.photosSummary_content_albums}>
          <p>Latest albums created</p>
          {
            initialPhotoData.map((photo, index) =>
              <div key={index} className={Styles.photosSummary_content_albums_card}>
                {
                  photo.album
                }
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default PhotosSummary;