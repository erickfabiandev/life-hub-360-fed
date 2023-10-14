"use client";
import { SideBarContext } from '@/context/SideBarContext';
import React, { useContext } from 'react';
import { useSession } from "next-auth/react";
import {
  MdOutlineCalendarMonth,
  MdFilePresent,
  MdMonetizationOn,
  MdOutlineAddTask,
  MdPhoto,
  MdOutlineDataset,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdLogout
} from "react-icons/md";
import Styles from '@/styles/sidebar.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SideBarContext);

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: MdOutlineDataset,
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: MdOutlineCalendarMonth,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: MdOutlineAddTask,
    },
    {
      name: "Finance",
      href: "/dashboard/finance",
      icon: MdMonetizationOn,
    },
    {
      name: "Files",
      href: "/dashboard/files",
      icon: MdFilePresent,
    },
    {
      name: "Photos",
      href: "/dashboard/photos",
      icon: MdPhoto,
    },
  ];
  return (
    <div className={Styles.sidebar__wrapper}>
      <button className={Styles.btn} onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className={Styles.sidebar} data-collapse={isCollapsed}>
        <div className={Styles.sidebar_top}>
          <Image
            width={50}
            height={50}
            alt='logo'
            src={'/icon-life-hub.ico'}
            priority={true}
            className={Styles.sidebar_logo}
          />
          <p className={Styles.sidebar_logo_name}>LifeHub360</p>
        </div>
        <div className={Styles.sidebar_card}>
          {
            session &&
            <Image
              src={session && session?.user?.avatar}
              width={80}
              height={80}
              alt='avatar-lifehub360'
              priority={true}
              className={Styles.sidebar_card_avatar}
            />
          }
          <p className={Styles.sidebar_card_text}>{session?.user?.email}</p>
        </div>
        <ul className={Styles.sidebar_list}>
          {
            sidebarItems.map(({ name, href, icon: Icon }) => {
              return (
                <li key={name} className={Styles.sidebar_item}>
                  <Link
                    href={href}
                    className={`${Styles.sidebar_link} ${pathname === href ? Styles.sidebar_link_activate : null}`}
                  >
                    <span className={Styles.sidebar_icon}>
                      <Icon />
                    </span>
                    <span className={Styles.sidebar_name}>{name}</span>

                  </Link>
                </li>
              )
            })
          }

        </ul>
        <p className={`${Styles.sidebar_link} ${Styles.sidebar_singout}`} onClick={async () => await signOut()} >
          <span className={Styles.sidebar_icon}>{<MdLogout />}</span>
          <span className={Styles.sidebar_name}>{'Sign out'}</span>
        </p>
      </aside>
    </div>
  );
};

export default SideBar;