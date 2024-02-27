import React from 'react';
import styles from './Card.module.css';

import { Link } from 'react-router-dom';

const Card = (driver) => {
  // Verificamos si driver es null o undefined

  if (!driver) {
    console.log('Aca esta el problema');; // Si driver no está definido, retornamos null para no renderizar nada
  }


  
  return (
    <div className={styles.card}>

      <img src={driver.image} className={styles.image} />

      <div className={styles.info}>

        <p className={styles.details}>Number: {driver.number}</p>

        <h3 className={styles.name}><p>{driver.name.forename} {driver.name.surname}</p></h3>

        <p className={styles.details}>Birth Date: {driver.birthDate}</p>

        {<Link className={styles.handlDetail} to={`/detail/${driver.id}`}>Ver Detail</Link>}

      </div>

    </div>

  );

}

export default Card;
