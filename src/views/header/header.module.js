import React, { Component } from 'react';
import styles from './header.module.scss';
import { NavLink } from "react-router-dom";

class HeaderModule extends Component {
  
  constructor(props) {
    super(props);
    
    this.links = [
      {
        name: 'Schedule Builder',
        pathname: '/builder'
      },
      {
        name: 'Course Lookup',
        pathname: '/lookup'
      },
    ]
  }
  
  render() {
    return (
      <div className={styles.header}>
        <span>Some Logo</span>
        {this.links.map(link => {
          return <NavLink key={link.pathname} className={styles.link} activeClassName={styles.activeLink} to={link.pathname}>{link.name}</NavLink>
        })}
      </div>
    );
  }
}

export default HeaderModule;
