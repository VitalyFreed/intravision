import React, {useState} from 'react';

import styles from './createModal.module.scss';

import close from './close.png';
import {useDispatch, useSelector} from "react-redux";

import {getGuidSelector, createRequest} from "../../../reducers/requestReducer";

const CreateModal = ({closeCreateModal}) => {
    const dispatch = useDispatch();
    const guid = useSelector(getGuidSelector);

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            guid,
            request: {
                name: title,
                description: comment,
                id: 134655,
                createdAt: "2021-05-22T21:47:28.4070673+03:00",
                updatedAt: "2021-05-22T21:47:28.4070673+03:00",
                price: 100,
                taskTypeId: 39518,
                taskTypeName: "Стандартный",
                statusId: 79036,
                statusName: "Открыта",
                statusRgb: "#fd5e53",
                priorityId: 65863,
                priorityName: "Средний",
                serviceId: 39517,
                serviceName: "Еда > Заказ обедов",
                resolutionDatePlan: "2021-05-22T21:47:28.4070673+03:00",
                initiatorId: 39519,
                initiatorName: "Иванов Андрей",
                executorId: 39518,
                executorName: "Петров Борис",
                executorGroupId: 39517,
                executorGroupName: "Офис менеджеры"
            }
        };
        dispatch(createRequest(data));
    };

    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };

    const handleChangeComment = e => {
        setComment(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span className={styles['header__text']}>Новая заявка</span>
                <img src={close} className={styles['header__icon']} onClick={closeCreateModal}/>
            </div>
            <div className={styles.main}>
                <form className={styles['main__create']} method='POST' action='#' onSubmit={handleSubmit}>
                    <label>
                        <p>Название</p>
                        <textarea cols={100} rows={5} value={title} onChange={handleChangeTitle}/>
                    </label>
                    <label>
                        <p>Описание</p>
                        <textarea cols={100} rows={10} value={comment} onChange={handleChangeComment}/>
                    </label>
                    <input type='submit' name='createBtn' className={styles.btn} value='Сохранить'/>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;