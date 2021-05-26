import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from './changeModal.module.scss';

import close from './close.png';

import {
    getRequestById,
    getStatusesSelector,
    getUsersSelector,
    getGuidSelector,
    updateRequest
} from "../../../reducers/requestReducer";
import SortSelect from "../../select/SortSelect";

const ChangeModal = ({id, closeChangeModal}) => {
    const dispatch = useDispatch();

    const req = useSelector(state => getRequestById(state, id));
    const statuses = useSelector(getStatusesSelector);
    const users = useSelector(getUsersSelector);
    const guid = useSelector(getGuidSelector);

    const [isVisible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const [userVisible, setUserVisible] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    const [visibleDescription, setVisibleDescription] = useState(false);
    const [description, setDescription] = useState(req.description);

    const handleToggleVisibility = e => {
        setVisible(isVisible => !isVisible);
    };
    const handleSetActive = (e, item) => {
        setVisible(false);
        setActiveItem(item);
    };

    const handleToggleUser = e => {
        setUserVisible(isVisible => !isVisible);
    };
    const handleSetActiveUser = (e, item) => {
        setUserVisible(false);
        setActiveUser(item);
    };

    const handleVisibleComment = e => {
        setVisibleDescription(true);
    };

    const handleHiddenComment = e => {
        setVisibleDescription(false)
    };

    const handleChangeComment = e => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        if (statuses.length > 0) {
            setActiveItem(activeItem => statuses.find(s => s.name === req.statusName));
        }
    }, [statuses]);

    useEffect(() => {
        if (users.length > 0) {
            setActiveUser(activeItem => users.find(s => s.name === req.executorName));
        }
    }, [users]);

    const handleUpdateRequest = (e) => {
        e.preventDefault();
        const data = {
            guid,
            request: {
                id,
                statusId: activeItem.id,
                statusName: activeItem.name,
                statusRgb: activeItem.rgb,
                executorId: activeUser.id,
                executorName: activeUser.name,
            }
        };
        dispatch(updateRequest(data));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span className={styles['header__text-id']}>№ {req.id}</span>
                <span className={styles['header__text']}>{req.name}</span>
                <img src={close} className={styles['header__icon']} onClick={closeChangeModal}/>
            </div>
            <div className={styles.main}>
                <form className={styles['main__create']} method='POST' action='#' onSubmit={handleUpdateRequest}>
                    <label className={styles.description}>
                        <p className={styles.title}>Описание</p>
                        {visibleDescription ?
                            <textarea onBlur={handleHiddenComment} cols={80} rows={10} onChange={handleChangeComment} value={description}/>
                            : <div onClick={handleVisibleComment}>{description}</div>}
                    </label>
                    <p className={styles.title}>Добавление комментариев</p>
                    <input type='submit' name='createBtn' className={styles.btn} value='Сохранить'/>
                </form>
                <div className={styles['main__info']}>
                    <div className={styles['status__wrapper']}>
                        <div className={styles['status']}>{activeItem !== null ? activeItem.name : 'Загрузка'}</div>
                        {statuses.length > 0 && activeItem !== null ?
                            <SortSelect
                                items={statuses}
                                activeItem={activeItem}
                                isVisible={isVisible}
                                handleSetActive={handleSetActive}
                                handleToggleVisibility={handleToggleVisibility}
                            />
                            : <div>Загрузка статусов</div>}
                    </div>
                    <div className={styles['applicant']}>
                        <p className={styles.title}>Заявитель</p>
                        <span>Александр Вознесенский</span>
                    </div>
                    <div className={styles.createAt}>
                        <p className={styles.title}>Создана</p>
                        <span>{req.initiatorName}</span>
                    </div>
                    <div className={styles['executor']}>
                        <p className={styles.title}>Исполнитель</p>
                        {users.length > 0 && activeUser !== null ?
                            <SortSelect
                                items={users}
                                activeItem={activeUser}
                                isVisible={userVisible}
                                handleSetActive={handleSetActiveUser}
                                handleToggleVisibility={handleToggleUser}
                            />
                            : <div>Загрузка приоритетов</div>}
                    </div>
                    <div className={styles.prioritet}>
                        <p className={styles.title}>Приоритет</p>
                        <span>{req.priorityName}</span>
                    </div>
                    <div className={styles.date}>
                        <p className={styles.title}>Срок</p>
                        <span>{new Date(req.resolutionDatePlan).toLocaleString()}</span>
                    </div>
                    <div className={styles.tags}>
                        <p className={styles.title}>Теги</p>
                        <div className={styles['']}>Какие-то теги</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeModal;