

import { getAllDrivers, paginateDrivers } from '../../components/redux/actions/actions';
import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import Cards from '../../components/Cards/Cards';
import style from './HomePage.module.css'


const HomePage = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  const paginate = (event) => {
    dispatch(paginateDrivers(event.target.name));
}
  return (
    <div className={style.backgroundHome}>
      
        <div className={style.cardsContainer}>
         <Cards />
        </div>
        <div className={style.bottonPag}>
                <button
                    name="prev"
                    onClick={paginate}>Prev
                </button>
                <button
                    name="next"
                    onClick={paginate}>Next
                </button>
            </div>
    </div>
  );
  
};








export default HomePage;