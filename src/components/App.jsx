import React, {useEffect} from 'react';
import styles from './app.module.scss';
import {Route, Switch, Redirect} from 'react-router-dom';

import Header from './header/Header';
import Navbar from "./navbar/Navbar";
import RequestList from "../pages/request/RequestList";
import Block from "./block/Block";
import {useDispatch, useSelector} from "react-redux";

import {getGuid, getRequests, getGuidSelector, getStatuses, getUsers} from "../reducers/requestReducer";

const App = () => {
    const dispatch = useDispatch();

    const guid = useSelector(getGuidSelector);

    useEffect(() => {
        dispatch(getGuid());
    }, [])

    useEffect(() => {
        if (guid !== null) {
            dispatch(getRequests(guid));
            dispatch(getStatuses(guid));
            dispatch(getUsers(guid));
        }
    }, [guid])

    return (
        <div className={styles.wrapper}>
            <Header/>
            <Block>
                <Navbar/>
                <Switch>
                    <Route path='/knowledges'><h1>База знаний</h1></Route>
                    <Route path='/requests'><RequestList/></Route>
                    <Route path='/workers'><h1>Сотрудники</h1></Route>
                    <Route path='/clients'><h1>Клиенты</h1></Route>
                    <Route path='/active'><h1>Активы</h1></Route>
                    <Route path='/settings'><h1>Настройки</h1></Route>
                </Switch>
                <Redirect to='/requests'/>
            </Block>
        </div>
    );
};

export default App;