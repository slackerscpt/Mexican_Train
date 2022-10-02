import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Mexican Train</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/main' activeClassName={classes.active}>
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink to='/setup' activeClassName={classes.active}>
              Setup Game
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
