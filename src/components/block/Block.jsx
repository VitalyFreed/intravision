import React from 'react';

import styles from './block.module.scss';

const Block = ({children}) => {
    return (
        <div className={styles.block}>
            {children}
        </div>
    );
};

export default Block;