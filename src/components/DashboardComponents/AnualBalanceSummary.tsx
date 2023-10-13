import { IFinance } from '@/types/Finance.types';
import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface AnualBalanceSummaryProps {
  initialFianceData: IFinance[]
}

const AnualBalanceSummary: FC<AnualBalanceSummaryProps> = ({ initialFianceData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map((month) =>
          initialFianceData.reduce((acumulator, item) =>
            new Date(item.date).toLocaleString('en-US', {
              month: 'long',
            }).toLowerCase() === month.toLowerCase() && item.transactionType === 'INCOME'
              ? acumulator + item.amount : acumulator
            , 0)
        ),
        backgroundColor: 'rgba(75, 149, 190, 0.3)',
      },
      {
        label: 'Outcome',
        data: labels.map((month) =>
          initialFianceData.reduce((acumulator, item) =>
            new Date(item.date).toLocaleString('en-US', {
              month: 'long',
            }).toLowerCase() === month.toLowerCase() && item.transactionType === 'OUTCOME'
              ? acumulator + item.amount : acumulator
            , 0)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.3)'
      },
    ],
  };

  return (
    <section className={Styles.AnualBalanceSummary}>
      <h3 className={Styles.AnualBalanceSummary_title}>
        Anual Balance
      </h3>
      <p className={Styles.AnualBalanceSummary_date}>{new Date().toLocaleDateString('en-US', {
        year: 'numeric'
      })}</p>

      <div className={Styles.AnualBalanceSummary_content}>
        <Bar options={options} data={data} />
      </div>
    </section>
  );
};

export default AnualBalanceSummary;