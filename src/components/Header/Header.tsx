import React from 'react';

import styles from './Header.module.css';

const Header = () => {
    const handleClick = () => {
        console.log('just click')
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Logotype</div>
            <div className={styles.connect} onClick={handleClick}>Connect wallet</div>
        </div>
    );
}

export default Header;
