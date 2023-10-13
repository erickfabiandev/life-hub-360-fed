import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss'
import { IFinance } from '@/types/Finance.types';

interface BalanceSummaryProps {
  initialFianceData: IFinance[]
}

const BalanceSummary: FC<BalanceSummaryProps> = ({ initialFianceData }) => {

  const income = initialFianceData
    .reduce((acumulator, item) => item.transactionType === 'INCOME' ? acumulator + item.amount : acumulator, 0)
  const outcome = initialFianceData
    .reduce((acumulator, item) => item.transactionType === 'OUTCOME' ? acumulator + item.amount : acumulator, 0)

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <section className={Styles.balanceSummary}>
      <h3 className={Styles.balanceSummary_title}>Financial Overview</h3>
      <div className={Styles.balanceSummary_balances}>
        <div className={Styles.balanceSummary_balances_current}>
          <h2>{USDollar.format(income - outcome)}
          </h2>
          <p>Current Balance</p>
        </div>
        <div className={Styles.balanceSummary_balances_movement}>
          <h2 style={{ color: '#439A86' }}>{USDollar.format(income)}</h2>
          <p>Income</p>
          <h2 style={{ color: '#BB4430' }}>{USDollar.format(outcome)}</h2>
          <p>Outcome</p>
        </div>
      </div>

    </section>
  );
};

export default BalanceSummary;