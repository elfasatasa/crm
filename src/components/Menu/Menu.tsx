"use client";

import styles from "./Menu.module.scss";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineHistory, AiOutlineUser, AiOutlineLineChart } from "react-icons/ai";

export default function Menu() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Main", href: "/", icon: <AiOutlineHome /> },
    { name: "Orders", href: "/orders", icon: <AiOutlineShoppingCart /> },
   
    { name: "History", href: "/history", icon: <AiOutlineHistory /> },
     { name: "Analytics", href: "/analytics", icon: <AiOutlineLineChart /> },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>CRM</div>
        <div className={styles.links}>
          {menuItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={pathname === item.href ? `${styles.link} ${styles.active}` : styles.link}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className={styles.profile}>
          <AiOutlineUser size={24} />
        </div>
      </div>

      <div className={styles.mobileTop}>
        <div className={styles.mobileLogo}>CRM</div>
        <div className={styles.mobileProfile}>
          <a href="profile">
            <AiOutlineUser size={24} />
          </a>
        </div>
      </div>

      <div className={styles.bottomMenu}>
        {menuItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={pathname === item.href ? `${styles.link} ${styles.active}` : styles.link}
          >
            {item.icon}
         
          </a>
        ))}
      </div>
    </>
  );
}
