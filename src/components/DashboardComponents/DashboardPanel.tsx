"use client"
import { IDashboard } from '@/types/Dashboard.types';
import React, { FC, useMemo } from "react";
import Styles from '@/styles/dashboard.module.scss'
import { useSession } from 'next-auth/react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from "react-grid-layout";
import TaskSummary from './TaskSummary';
import EventSummary from './EventSummary';
import TaskCompletedSummary from './TaskCompletedSummary';
import BalanceSummary from './BalanceSummary';
import initialFinanceData from './finance-data.json';
import initialFileData from './file-data.json';
import initialPhotoData from './photos-data.json';
import ExpensesSummary from './ExpensesSummary';
import AnualBalanceSummary from './AnualBalanceSummary';
import FileSummary from './FileSummary';
import PhotosSummary from './PhotosSummary';
import MemoBoard from './MemoBoard';


const DashboardPanel: FC<{ initialdashboardData: IDashboard }> = ({ initialdashboardData }) => {

  const { data: session, status } = useSession()
  const { LatestTaskLists, LatestEvents, AllTaskLists } = initialdashboardData
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const layouts = {
    lg: [
      { i: "a", x: 0, y: 0, w: 3, h: 4 },
      { i: "b", x: 3, y: 0, w: 3, h: 10 },
      { i: "c", x: 6, y: 0, w: 6, h: 10 },
      { i: "d", x: 0, y: 4, w: 3, h: 6 },
      { i: "e", x: 0, y: 4, w: 4, h: 7 },
      { i: "f", x: 4, y: 4, w: 4, h: 7 },
      { i: "g", x: 8, y: 4, w: 4, h: 7 },
      { i: "h", x: 0, y: 5, w: 8, h: 9 },
      { i: "i", x: 8, y: 5, w: 4, h: 9 },
    ],
    md: [
      { i: "a", x: 0, y: 0, w: 2.5, h: 4 },
      { i: "b", x: 2.5, y: 0, w: 3, h: 11 },
      { i: "c", x: 0, y: 11, w: 5.5, h: 10 },
      { i: "d", x: 0, y: 4, w: 2.5, h: 7 },
      { i: "e", x: 5.5, y: 10, w: 3.5, h: 7 },
      { i: "f", x: 5.5, y: 0, w: 3.5, h: 7 },
      { i: "g", x: 5.5, y: 14, w: 3.5, h: 7 },
      { i: "h", x: 0, y: 21, w: 5.5, h: 9 },
      { i: "i", x: 5.5, y: 21, w: 3.5, h: 9 },
    ],
    sm: [
      { i: "a", x: 0, y: 0, w: 2, h: 4 },
      { i: "b", x: 2, y: 0, w: 2, h: 10 },
      { i: "c", x: 0, y: 10, w: 5, h: 10 },
      { i: "d", x: 0, y: 4, w: 2, h: 6 },
      { i: "e", x: 0, y: 20, w: 2, h: 7 },
      { i: "f", x: 2, y: 20, w: 2, h: 7 },
      { i: "g", x: 0, y: 27, w: 2, h: 7 },
      { i: "h", x: 0, y: 34, w: 4, h: 9 },
      { i: "i", x: 2, y: 27, w: 2, h: 7 },
    ],
    xs: [
      { i: "a", x: 0, y: 0, w: 4, h: 4 },
      { i: "b", x: 0, y: 4, w: 4, h: 9 },
      { i: "c", x: 0, y: 15, w: 4, h: 7 },
      { i: "d", x: 0, y: 22, w: 4, h: 7 },
      { i: "e", x: 0, y: 29, w: 4, h: 7.5 },
      { i: "f", x: 0, y: 36.5, w: 4, h: 7.5 },
      { i: "g", x: 0, y: 44, w: 4, h: 7 },
      { i: "h", x: 0, y: 51, w: 4, h: 9 },
      { i: "i", x: 0, y: 60, w: 4, h: 7 },
    ],
  }
  return (
    <section className={Styles.dashboard}>
      <div className={Styles.dashboard_head} >
        <h2 className={Styles.dashboard_head_title}>{`Hi, ${session?.user?.fullName}`}</h2>
        <p className={Styles.dashboard_head_subtitle}>Welcome back to the LifeHub360 control panel.</p>
        <p className={Styles.dashboard_head_time}>
          {
            new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        </p>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={1200}
        isDraggable={true}
        isResizable={false}
        containerPadding={[5, 20]}
      >
        <div key="a" className={Styles.dashboard_card}>
          <BalanceSummary initialFianceData={initialFinanceData} />
        </div>
        <div key="b" className={Styles.dashboard_card}>
          <ExpensesSummary initialExpensesData={initialFinanceData} />
        </div>
        <div key="c" className={Styles.dashboard_card}>
          <AnualBalanceSummary initialFianceData={initialFinanceData} />
        </div>
        <div key="d" className={Styles.dashboard_card}>
          <TaskCompletedSummary initialAllTaskListsData={AllTaskLists} />
        </div>
        <div key="e" className={Styles.dashboard_card}>
          <TaskSummary initialLatestTaskListsData={LatestTaskLists} />
        </div>
        <div key="f" className={Styles.dashboard_card}>
          <EventSummary initialLatestEventsData={LatestEvents} />
        </div>
        <div key="g" className={Styles.dashboard_card}>
          <FileSummary initialFileSummaryData={initialFileData} />
        </div>
        <div key="h" className={Styles.dashboard_card}>
          <PhotosSummary initialPhotoData={initialPhotoData} />
        </div>
        <div key="i" className={Styles.dashboard_card}>
          <MemoBoard />
        </div>
      </ResponsiveGridLayout>
    </section >
  );
}

export default DashboardPanel;