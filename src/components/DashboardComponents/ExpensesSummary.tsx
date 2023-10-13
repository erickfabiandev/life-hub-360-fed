import { IFinance } from '@/types/Finance.types';
import React, { FC, useEffect, useState } from 'react';
import Styles from '@/styles/dashboard.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


interface ExpensesSummaryProps {
  initialExpensesData: IFinance[]
}

const backgroundColor = [

]

const ExpensesSummary: FC<ExpensesSummaryProps> = ({ initialExpensesData }) => {
  const [category, setCategory] = useState<string[]>([])
  const [dataGraph, setDataGraph] = useState<number[]>([])
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const dataFilter = initialExpensesData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        isDateInRange(itemDate, firstDayOfMonth, lastDayOfMonth) &&
        item.transactionType === 'OUTCOME'
      );
    });

    const uniqueCategories = Array.from(
      new Set(dataFilter.map((item) => item.category))
    );

    const totalAmountCategory = amountByCategory(uniqueCategories, dataFilter)

    setCategory(uniqueCategories);
    setDataGraph(totalAmountCategory)


  }, [initialExpensesData])


  const isDateInRange = (dateToCheck: Date, startDate: Date, endDate: Date) => {
    return dateToCheck >= startDate && dateToCheck <= endDate;
  }

  const amountByCategory = (category: string[], data: IFinance[]) => {
    const result: number[] = category.map((name) =>
      data.reduce((accumulator, item) => (item.category === name ? accumulator + item.amount : accumulator), 0)
    );

    return result;
  };



  const data = {
    labels: category,
    datasets: [
      {
        label: 'USD',
        data: dataGraph,
        backgroundColor: [
          '#1B4F79',
          '#F5B041',
        ],
        borderColor: [
          '#F0F3F4 ',
          '#F0F3F4 '
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className={Styles.expensesSummary}>
      <h3 className={Styles.expensesSummary_title}>Monthly expenses</h3>
      <p className={Styles.expensesSummary_date}>
        {new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit'
        })}
      </p>
      <div className={Styles.expensesSummary_content}>
        <Pie
          data={data}
          options={
            {
              plugins: {
                legend: {
                  position: 'bottom',
                  display: true,
                },
                tooltip: {

                },
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }
          }
          updateMode='resize'
        />
      </div>
    </section>
  );
};

export default ExpensesSummary;