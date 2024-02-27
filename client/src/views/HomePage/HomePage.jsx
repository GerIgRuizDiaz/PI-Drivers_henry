

import { getAllDrivers } from '../../components/redux/actions/actions';
import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import Cards from '../../components/Cards/Cards';
import style from './HomePage.module.css'


const HomePage = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  return (
    <div className={style.backgroundHome}>
      
        <div className={style.cardsContainer}>
         <Cards />
        </div>
      
    </div>
  );
  
};








export default HomePage;