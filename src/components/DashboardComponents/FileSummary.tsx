import { IFile } from '@/types/File.types';
import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss';
import { BsFiletypeDoc, BsFiletypeCsv, BsFiletypeXls, BsFiletypePpt, BsFiletypePdf, BsFiletypeTxt } from "react-icons/bs";

interface FileSummaryProps {
  initialFileSummaryData: IFile[]
}

const FileSummary: FC<FileSummaryProps> = ({ initialFileSummaryData }) => {

  const totalSize = initialFileSummaryData.reduce((acumulator, file) => acumulator + file.size, 0)

  const calculateSizeByType = (type: string): number => {
    const totalSizeKB = initialFileSummaryData
      .reduce((acumulator, file) => file.type === type ? acumulator + file.size : acumulator, 0)
    return parseFloat((totalSizeKB / 1024).toFixed(2))
  }

  const quantityByType = (type: string): number => {
    return initialFileSummaryData
      .reduce((acumulator, file) => file.type === type ? acumulator + 1 : acumulator, 0)
  }


  return (
    <section className={Styles.fileSummary}>
      <h3 className={Styles.fileSummary_title}>File Upload Summary</h3>
      <h2 className={Styles.fileSummary_total}>{`${(totalSize / 1024).toFixed(2)} MB`}</h2>
      <div className={Styles.fileSummary_content}>
        <div className={Styles.fileSummary_content_container}>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypeXls size={33} style={{ color: '#219653' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('XLS') + calculateSizeByType('XLSX')} MB
              <span>{`${quantityByType('XLS') + quantityByType('XLSX')} file`}</span>
            </p>
          </a>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypePdf size={33} style={{ color: '#EB5757' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('PDF')} MB
              <span>{`${quantityByType('PDF')} file`}</span>
            </p>
          </a>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypeDoc size={33} style={{ color: '#2F80ED' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('DOC') + calculateSizeByType('DOCX')} MB
              <span>{`${quantityByType('DOC') + quantityByType('DOCX')} file`}</span>
            </p>
          </a>
        </div>
        <div className={Styles.fileSummary_content_container}>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypeCsv size={33} style={{ color: '#F2994A' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('CSV')} MB
              <span>{`${quantityByType('CSV')} file`}</span>
            </p>
          </a>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypePpt size={33} style={{ color: '#CA6F1E' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('PPT')} MB
              <span>{`${quantityByType('PPT')} file`}</span>
            </p>
          </a>
          <a className={Styles.fileSummary_content_type}>
            <BsFiletypeTxt size={33} style={{ color: '#A6ACAF' }} />
            <p className={Styles.fileSummary_content_type_details}>
              {calculateSizeByType('TXT')} MB
              <span>{`${quantityByType('TXT')} file`}</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FileSummary;