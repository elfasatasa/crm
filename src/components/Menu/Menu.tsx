"use client";

import styles from "./Menu.module.scss";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineHistory, AiOutlineUser, AiOutlineLineChart } from "react-icons/ai";

export default function Menu() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Main", href: "/", icon: <AiOutlineHome /> },
    { name: "Buy", href: "/buy", icon: <AiOutlineShoppingCart /> },
   
    { name: "History", href: "/history", icon: <AiOutlineHistory /> },
     { name: "Analytics", href: "/analytics", icon: <AiOutlineLineChart /> },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">CRM</a>
        </div>
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
          <a href="profile"
              className={pathname === "/profile" ? `${styles.link} ${styles.active}` : styles.link}
            >
            Profile
          </a>
        </div>
      </div>

      <div className={styles.mobileTop}>
        <div className={styles.mobileLogo}>
          <a href="/">
          CRM</a>
        </div>
        <div className={styles.mobileProfile}>
          <a href="profile"
              className={pathname === "/profile" ? `${styles.link} ${styles.active}` : styles.link}
            >
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
