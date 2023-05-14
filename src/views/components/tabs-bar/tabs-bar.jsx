import React from 'react';
import Link from '../link.jsx';
import styles from './tabs-bar.module.styl';

const TabsBar = () => (
  <div className={`${styles.top_bar} bg-a1`}>
    <TabsBar.Navigation />
  </div>
);

TabsBar.Navigation = () => (
  <nav className={styles.navigation}>
    <Link to="/" activeClass={styles.is_active}>Code</Link>
    <Link to="/code" activeClass={styles.is_active}>Visual</Link>
  </nav>
);

export default TabsBar;
