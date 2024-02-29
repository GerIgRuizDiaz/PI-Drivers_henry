import React from 'react';
import styles from './Card.module.css';

import { Link } from 'react-router-dom';

const Card = (driver) => {
  // Verificamos si driver es null o undefined

  if (!driver) {
    console.log('Aca esta el problema');; // Si driver no está definido, retornamos null para no renderizar nada
  }

  const texto = `\\N`
  
  return (
    <div className={styles.card}>

      <img src={driver.image} className={styles.image} />

      <div className={styles.info}>
        
        <p className={styles.details}>Number: {driver.number || texto}</p>

        <h3 className={styles.name}><p>{driver.name.forename || driver.name} {driver.name.surname || driver.lastName}</p></h3>

        <p className={styles.details}>Birth Date: {driver.birthDate}</p>

        {<Link className={styles.handlDetail} to={`/detail/${driver.id}`}>Ver Detail</Link>}

      </div>

    </div>

  );

}

export default Card;
