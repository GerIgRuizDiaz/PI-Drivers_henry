import { useSelector} from 'react-redux'

import Card from '../Card/DriverCard';
import styles from "./Cards.module.css";

//* componente que crea las cartas
const Cards = () => {
    const drivers = useSelector((state) => state.filtredDrivers);

    return (
        <div className={styles.boxCards}>
            {
                drivers.map((drivers) => {
                    
                    return <Card
                        key={drivers.id}
                        image={drivers.image.url || drivers.image}
                        id={drivers.id}
                        name={drivers.name}
                        lastName={drivers.lastName}
                        description={drivers.description}
                        nationality={drivers.nationality}
                        teams={drivers.teams}
                        birthDate={drivers.dob || drivers.birthDate}
                        number={drivers.number}
                    />
                        
                
                })
            }
        </div >

    );
}

export default Cards;

