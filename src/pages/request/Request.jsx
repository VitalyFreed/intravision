import React from 'react';
import styles from "./request.module.scss";

const Request = ({req, openChangeModal}) => {
    return (
        <tr onClick={e => openChangeModal(req.id)} key={req.id}>
            <td className={styles.id}>{req.id}</td>
            <td className={styles.name}>{req.name.length > 90 ? req.name.slice(0, 90) + '...' : req.name}</td>
            <td className={styles.status}>
                <div style={{background: req.statusRgb}}>{req.statusName}</div>
            </td>
            <td className={styles.executor}>{req.executorName}</td>
        </tr>
    );
};

export default Request;