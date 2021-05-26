import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './navbar.module.scss';

import base from './assets/base.png';
import request from './assets/request.png';
import workers from './assets/workers.png';
import clients from './assets/clients.png';
import active from './assets/active.png';
import settings from './assets/settings.png';

const Navbar = () => {
    const navbar = [
        {
            img: base,
            text: 'База знаний',
            route: '/knowledges'
        },
        {
            img: request,
            text: 'Заявки',
            route: '/requests'
        },
        {
            img: workers,
            text: 'Сотрудники',
            route: '/workers'
        },
        {
            img: clients,
            text: 'Клиенты',
            route: '/clients'
        },
        {
            img: active,
            text: 'Активы',
            route: '/active'
        },
        {
            img: settings,
            text: 'Настройки',
            route: '/settings'
        }
    ];

    return (
        <div className={styles.navbar}>
            <ul className={styles['navbar__list']}>
                {navbar.map((item, i) => <li key={i}>
                    <NavLink to={item.route} activeStyle={{
                        background: 'rgb(0, 44, 73)',
                        ['box-shadow']: '0px 0px 2px 0px rgba(0, 0, 0, 0.15)'
                    }} className={styles['navbar__list-item']}>
                        <img src={item.img}/>
                        <span>{item.text}</span>
                    </NavLink>
                </li>)}
            </ul>
        </div>
    );
};

export default Navbar;