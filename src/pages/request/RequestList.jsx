import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from './request.module.scss';

import {
    getRequestsSelector,
    openCreateModal,
    closeCreateModal,
    openChangeModal,
    closeChangeModal,
    getCreateModalsSelector,
    getChangeModalsSelector
} from "../../reducers/requestReducer";

import Request from "./Request";
import ChangeModal from "../../components/modal/changeModal/ChangeModal";
import CreateModal from "../../components/modal/createModal/CreateModal";

const RequestList = () => {
    const dispatch = useDispatch();

    const requests = useSelector(getRequestsSelector);
    const createModal = useSelector(getCreateModalsSelector);
    const changeModal = useSelector(getChangeModalsSelector);

    const handleShowCreateModal = () => {
        dispatch(openCreateModal());
    };
    const handleCloseCreateModal = () => {
        dispatch(closeCreateModal());
    };

    const handleShowChangeModal = (id) => {
        dispatch(openChangeModal(id));
    };
    const handleCloseChangeModal = () => {
        dispatch(closeChangeModal());
    };

    return (
        <div className={styles.request}>
            <button className={styles['create-btn']} onClick={handleShowCreateModal}>Создать заявку</button>
            <table className={styles['request__list']}>
                <thead>
                <th className={styles.id}>ID</th>
                <th className={styles.name}>Название</th>
                <th className={styles.status}>Статус</th>
                <th className={styles.executor}>Исполнитель</th>
                </thead>
                <tbody>
                {
                    requests.length > 0 ?
                        requests.map(req => <Request key={req.id} req={req} openChangeModal={handleShowChangeModal}/>)
                        : <div>Данные загружаются</div>
                }
                </tbody>
            </table>
            {changeModal !== null ? <ChangeModal id={changeModal} closeChangeModal={handleCloseChangeModal}/> : null}
            {createModal ? <CreateModal closeCreateModal={handleCloseCreateModal}/> : null}
        </div>
    );
};

export default RequestList;