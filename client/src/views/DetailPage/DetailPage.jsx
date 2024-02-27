import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../components/redux/actions/actions';
import styles from './DetailPage.module.css';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Driver Details</h1>
      {detail ? (
        <div className={styles.detailContainer}>
          <div className={styles.detailItem}>
            
            <img src={detail.image} alt="imagenDriver" className={styles.imagenDetail}/>
          </div>
          <div className={styles.detailItem}>
            <h2 className={styles.detailTitle}>Nombre:</h2>
            <p className={styles.detailContent}>{detail.name}</p>
          </div>
          <div className={styles.detailItem}>
            <h2 className={styles.detailTitle}>Description:</h2>
            <p className={styles.detailContent}>{detail.description}</p>
          </div>
          <div className={styles.detailItem}>
            <h2 className={styles.detailTitle}>Nationality:</h2>
            <p className={styles.detailContent}>{detail.nationality}</p>
          </div>
          <div className={styles.detailItem}>
            <h2 className={styles.detailTitle}>Teams:</h2>
            <p className={styles.detailContent}>{detail.teams}</p>
          </div>
          <div className={styles.detailItem}>
            <h2 className={styles.detailTitle}>Birth Date:</h2>
            <p className={styles.detailContent}>{detail.birthDate}</p>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
}

export default DetailPage;
