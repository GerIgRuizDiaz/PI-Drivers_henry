import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div className={styles.background}>

            <div className={styles.tituloLanding}>
                <h1 className={styles.tituloH1}>D-R-I-V-E-R-S</h1>
            </div>

            <div className={styles.botonLanding}>
                <Link to="/home">
                    <button className={styles.button}>HOME</button>
                </Link>
            </div>

        </div>
    );
}

export default LandingPage;
