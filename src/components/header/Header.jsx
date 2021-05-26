import React from 'react';

import styles from './header.module.scss';

import logo from './logo.png';
import search from './search.png';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href='/'><img src={logo}/></a>
                </div>
                <div className={styles.search}>
                    <input type='text' className={styles['search-input']}/>
                    <img src={search} className={styles['search-icon']}/>
                </div>
            </div>
        </div>
    );
};

export default Header;